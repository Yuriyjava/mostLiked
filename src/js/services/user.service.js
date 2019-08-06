import Http from '../core/http.service';
import {ENV} from '../config/env';

export default class UserService {
    getUser(id){
        const http = new Http();
        return new Promise((resolve, reject)=>{
            http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
            .then((resp)=>{
               console.log(resp)
                resolve(resp);
            })
            .catch((error)=>{
                console.error(error);
                reject(error);
            })
        })
    }
    getUserImages(id){
        const http = new Http();
        return new Promise((resolve, reject)=>{
            http.get(`${ENV.apiUrl}/public/users/my-images/${id}`)
            .then((resp)=>{
               console.log(resp)
                resolve(resp);
            })
            .catch((error)=>{
                console.error(error);
                reject(error);
            })
        })
    }
}