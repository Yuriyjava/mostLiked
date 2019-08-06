export default class Http{
    post(url, data){
        return new Promise((resolve, reject )=>{
            fetch(url, {
                method: 'POST',
                body:JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response)=>response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        })
    }
    get(url){
        return new Promise((resolve, reject )=>{
            fetch(url)
            .then((response)=>response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        })
    }
     /**
   * 
   * @param {string} url 
   * @param {object} data
   * @description fetch "GET" with headers
   */
  async getH(url, data) {
    try {
      let response = await fetch(url, data).then( response => response.json());
      return response;
    } catch (error) {
      throw new Error(error);
    }    
  }
}