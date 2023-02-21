import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
function SigninPage() {
    const navigate = useNavigate();
    const registerAccount = async () => {
        // const error = document.getElementById('error');
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let repassword = document.getElementById('repassword').value;

        if (email !== '' && email !== null &&
            username !== '' && username !== null &&
            password !== '' && password !== null &&
            repassword !== '' && repassword !== null && password === repassword) {

            let user = {
                email: email,
                username: username,
                password: password
            }
            const request = await fetch('http://localhost:5013/api/User/Registration', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const response = request;

            if (response.status === 409)
                alert("account already exist")
            else
                navigate('/LoginPage')

        }

    }
    return (
        <div class="login-page">
            <div class="form" id="form">
                <input type="text" id="email" required="required" placeholder="Email address" />
                <input type="text" id="username" required="required" placeholder="Username" />
                <input type="password" id="password" required="required" placeholder="Password" />
                <input type="password" id="repassword" required="required" placeholder="Enter password again" />
                <button onClick={registerAccount}>create</button>
                <p class="message">Already registered? <a href="/LoginPage" >Sign In</a></p>
            </div>
        </div >
    );
}

export { SigninPage } 