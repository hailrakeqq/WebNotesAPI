import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../css/TodoPage.css'
import { Modal } from '../components/Modal.js';
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState([])
    const [modalActive, setModalActive] = useState(false)
    let jwtToken = localStorage.getItem('jwttoken');
    const navigate = useNavigate()
    let currentUser = localStorage.getItem('username')
    
    if (currentUser === "" || currentUser === null)
        navigate('/LoginPage');

    const fetchData = () => {
        return fetch('http://localhost:8088/api/Todo',
            {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${jwtToken}`,
                }
            }).then(data => data.status === 401 ? navigate('/LoginPage') : data.json())
            .then(response => {
                console.log(response)
                setTodos(response)
            })
    }
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])
    
    const addTodo = () => {
        console.log("test")
        let todoTitle = document.getElementById('todo-input').value
        if (isInputValidCheck(todoTitle))
        {
            const todo = {
                title: todoTitle
            }
 
            fetch('http://localhost:8088/api/Todo/AddTodo', {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${jwtToken}`,
                 },
                body: JSON.stringify(todo)
            }).then(() => document.location.reload(false))
        }
        else alert("You must enter text")
    }
    const getTodo = (id) => {
         return  fetch(`http://localhost:8088/api/Todo/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwtToken}`,
            }
        }).then(response => response.json())
             .then(data => setTodo(data))
    }
   
    const deleteTodo = (id) => {
        fetch(`http://localhost:8088/api/Todo/${id}`, {
            method: "DELETE",
            headers:{
                'Authorization': `bearer ${jwtToken}`,
            }
        }).then(() => document.location.reload(false))
    }
    
    //TODO: add implement for change todos
    const openChangeTodoModalWindow = (id) => {
        getTodo(id)
        console.log(todo)
        document.getElementById('todo-change-input').value = todo.title
        setModalActive(true)
    }
    
    const doneTodo = (id) => {
        getTodo(id)
        todo.isComplete = true
        sendPUTRequest(id, todo)
    }
    
    const undoneTodo = (id) => {
        getTodo(id)
        todo.isComplete = false
        sendPUTRequest(id, todo)
    }
    
    const updateTodo = (id) =>{
        const changeInputString = document.getElementById('todo-change-input').value
        if(isInputValidCheck(changeInputString)){
            todo.title = changeInputString
            sendPUTRequest(id, todo);
        } else {
            alert('Input is not valid. Try again')
        }
    } 
    
    const sendPUTRequest = (id, todo) => {
        fetch(`http://localhost:8088/api/Todo/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwtToken}`,
            },
            body: JSON.stringify(todo)
        }).then(response => response.status === 200 ? document.location.reload(false) : alert("Error"))
    }
    
    const isInputValidCheck = (string) => {
        return string !== null && string !== "" ? true : false
    }

    return(
        <>
        <h1>Test TodoPage</h1>
            <div>
                <MyInput type="text" id="todo-input" placeholder="Enter todo..."/>
                <MyButton class='btn' id="save-button" onClick={addTodo}>Save todo!</MyButton>
            </div>
            <br/>
            <div id="todo-container">
                {todos && todos.length > 0 && todos.map((todoObj, index) => (
                    <div class="todo" data-id={todoObj.id} key={todoObj.id}>
                        {
                            todoObj.isComplete === true ? <p>&#9989;</p> : <p>&#10060;</p>
                        }
                        <h3>{todoObj.title} </h3>
                        <div >
                            {todoObj.isComplete === false ? 
                                <MyButton class="doneBtn" onClick={() => doneTodo(todoObj.id)}>Done</MyButton> :
                                <MyButton class="undoneBtn" onClick={() => undoneTodo(todoObj.id)}>undone</MyButton>
                            }
                            <MyButton onClick={() => openChangeTodoModalWindow(todoObj.id)}>Change</MyButton>
                            <MyButton onClick={() => deleteTodo(todoObj.id)}>Delete</MyButton>
                            <Modal active={modalActive} setActive={setModalActive}>
                                <MyInput type="text" id="todo-change-input" />
                                <MyButton onClick={() => updateTodo(todoObj.id)}>Save!</MyButton>
                            </Modal>
                        </div>
                        <br/>
                    </div>
                ))}
            </div>
        </>
    )
}

export  {TodoPage}