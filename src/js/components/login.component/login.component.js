import AuthService from '../../services/auth.service'
import Routing from "./../../core/routing.service";


export default class LoginComponent{
    constructor(){
        this._authService = new AuthService();
        this._routing = new Routing()
    }
    render(){
        return `<div class="auth-wrap d-flex mt-5">
                    <div class="auth-form col col-6 mx-auto my-auto">
                        <h3>Login to Most Liked</h3>
                        <p class="text-secondary">Enter your e-mail address & password to login to your Social account.</p>
                        <form name="loginForm" novalidate>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>`
    }
    afterRender(){
        document.forms['loginForm'].addEventListener('submit', (e)=>{
            e.preventDefault();
            const email = e.target.elements['email'].value;
            const password = e.target.elements['password'].value;

            if (!email || !password){
                return;
            }

            this._authService.login(email,password)
            .then((response)=>{
                this._routing.navigate(`/user/${response.id}`)
                /*  location.hash = `/user/${response.id}`;  */
            })
            .catch((response)=>{
                console.log(response)
            })
        })
    }
}