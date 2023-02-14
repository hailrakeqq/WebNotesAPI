import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear()
    }, [])
    const Login = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email !== '' && email !== null &&
            password !== '' && password !== null) {
            let user = {
                email: email,
                password: password
            }
            console.log(user);
            fetch('http://localhost:5013/api/User/Login', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem("id", data.id)
                    localStorage.setItem("username", data.username)
                    localStorage.setItem("role", data.role)
                    localStorage.setItem("jwttoken", data.jwtToken)
                    navigate('/ViewNotePage');
                })
        }

    }
    return (
        <div class="login-page">
            <div class="form" id="form">
                <input type="text" id="email" required="required" placeholder="E-mail" />
                <input type="password" id="password" required="required" placeholder="Password" />
                <button onClick={Login}>login</button>
                <p class="message">Not registered? <a href="/SigninPage">Create an account</a></p>
            </div>
        </div>
    );
}

export { LoginPage } 