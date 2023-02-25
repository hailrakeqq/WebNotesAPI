import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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

    return(
        <>
        <h1>Test TodoPage</h1>
            <div>
                <input type="text" id="todo-input" placeholder="Enter todo..."/>
                <button id="save-button" onClick={addTodo}>Add!</button>
            </div>
            <br/>
            <div id="todo-container">
                {todo && todo.length > 0 && todo.map((todoObj, index) => (
                    <div class="note" data-id={todoObj.id} key={index}>
                        <h3>{todoObj.title} | <button onClick={() => deleteTodo(todoObj.id)}>delete</button></h3> 
                        <br/>
                    </div>
                ))}
            </div>
        </>
    )
}

export  {TodoPage}