import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../css/TodoPage.css'
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

function TodoPage() {
    const [todo, setTodo] = useState([]);
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
                setTodo(response)
            })
    }
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])
    
    const addTodo = () => {
        console.log("test")
        let todoTitle = document.getElementById('todo-input').value
        if (todoTitle !== null && todoTitle !== "")
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

    let deleteTodo = (id) => {
        fetch(`http://localhost:8088/api/Todo/${id}`, {
            method: "DELETE",
            headers:{
                'Authorization': `bearer ${jwtToken}`,
            }
        }).then(() => document.location.reload(false))
    }
    
    //TODO: add implement for change todo
    const updateTodo = (title) => {
        let todoTitle = document.getElementById('todo-input').value
        todoTitle = title
    }
    
    //TODO: add style to done todo(add iscomplete property to database and return this value in responce)
    const doneTodo = () => {
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
                {todo && todo.length > 0 && todo.map((todoObj, index) => (
                    <div class="todo" data-id={todoObj.id} key={todoObj.id}>
                        <h3>{todoObj.title} </h3>
                        <div >
                            <MyButton onClick={() => doneTodo(todoObj.title)}>Done</MyButton>
                            <MyButton onClick={() => updateTodo(todoObj.id)}>Change</MyButton>
                            <MyButton onClick={() => deleteTodo(todoObj.id)}>Delete</MyButton>
                        </div>
                        <br/>
                    </div>
                ))}
            </div>
        </>
    )
}

export  {TodoPage}