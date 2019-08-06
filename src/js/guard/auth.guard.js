//import Routing from "../core/routing.service";
import AuthService from "../services/auth.service";

export default class AuthGuard{
    constructor(){
        this._authService = new AuthService();
        //this._routing = new Routing();
    }
    canActivate(){
        return !!this._authService.token;
    }
}