import './home.scss'

import Routing from "./../../core/routing.service";

export default class HomeComponent{
    constructor(){
        this._routing = new Routing()
    }
    render(){
        return `<div class="home">
        <div>Home</div>
        <button type="button" class="btn btn-success" id="login-btn">Login</button>
        </div>`
    }
    afterRender(){
        let button = document.getElementById("login-btn");
        button.addEventListener("click", ()=>{
            this._routing.navigate('/login');
        })
    }
}