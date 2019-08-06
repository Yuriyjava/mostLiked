import Http from './../core/http.service';
import {ENV} from './../config/env';

export default class AuthService {
    get userId(){
        return localStorage.getItem('most_liked_user_id');
    }
    get token(){
        return localStorage.getItem('most_liked_user_token');
    }
    async login(email, password){
        try{
            const http = new Http();
            let resp = await http.post(`${ENV.apiUrl}/public/auth/login`, {email, password});

            if (!resp.auth) return new Error(resp);
            localStorage.setItem('most_liked_user_id', resp.id);
            localStorage.setItem('most_liked_user_token', resp.token);
            return resp;
        } catch(error){
            console.error(error);
        }
       /*  const http = new Http();
        return new Promise((resolve, reject)=>{
            http.post(`${ENV.apiUrl}/public/auth/login`, {email, password})
            .then((resp)=>{
                if (!resp.auth) return reject(resp);
                localStorage.setItem('most_liked_user_id', resp.id);
                localStorage.setItem('most_liked_user_token', resp.token);
                resolve(resp);
            }) */
           /*  .catch((error)=>{
                console.error(error);
                reject(error);
            }) 
        })*/
    }
    logout(){
        return new Promise((res, rej)=>{
            localStorage.removeItem('most_liked_user_id');
            localStorage.removeItem('most_liked_user_token');
            res();
        })
    }
}