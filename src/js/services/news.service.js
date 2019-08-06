import Http from '../core/http.service';
import {ENV} from '../config/env';

export default class NewsService {
  constructor() {

  }
  /**
   * 
   * @param {string} userToken 
   * @description gets the news by user toker
   */
  async getNews(userToken) {
    const http = new Http();
    try {
      let response = await http.getH(`${ENV.apiUrl}/public/news`, { 
        method: "GET", 
        headers: { 
          "x-access-token" : `${userToken}` 
        } 
      });
      return response;
    } catch (error) {
      throw new Error("error");
    }
  }
}