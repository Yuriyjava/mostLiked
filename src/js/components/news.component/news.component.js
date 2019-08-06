import NewsService from './../../services/news.service';
import AuthService from './../../services/auth.service';
import './news.component.scss';


export default class NewsComponent {
    constructor() {
        this.newsService = new NewsService();
        this.authService = new AuthService();
        this.userToken = this.authService.token;     
    }

    /**
     * @description runs before render, gets news by user token
     */
    async beforeRender() {
        this.newsResponse = await this.newsService.getNews(this.userToken);
    }

    /**
     * @description gets all the pictures from news
     * @returns {object} fragment with all the pictures
     */
    getPictures() {
        let fragment = document.createDocumentFragment();
        for(let newItem of this.newsResponse.news){            
            for(let picture of newItem.pictures) {
                fragment.appendChild(this.getPicture(picture));
            }            
        }
        console.log(typeof fragment);
        return fragment;
    }

    /**
     * 
     * @description makes small template from picture
     * @param {object} picture a picture object from news
     * @returns {object} a column with a picture
     */
    getPicture(picture) {        

        let col = document.createElement("div");
        col.classList.add("col-sm-4", "mt-2");

        let img = document.createElement("img");
        img.src = picture.url;
        img.alt = "";

        col.appendChild(img);        
        return col;
    }

    /**
     * @description renders the pics container
     */
    render() {
        return `
        <div class="container">
            <div class="row" id="pics-container">
        </div>`;
    }

    /**
     * @description adds fragment with pictures to pics container
     */
    afterRender() {
        this.picsContainer = document.getElementById("pics-container");
        this.picsContainer.appendChild(this.getPictures());
    }
}