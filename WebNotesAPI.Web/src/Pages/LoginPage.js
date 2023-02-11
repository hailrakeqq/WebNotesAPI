import '../css/LoginPage.css'
function LoginPage() {
    const Login = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        console.log('try to login');
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
            }).then(response => console.log(response))
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