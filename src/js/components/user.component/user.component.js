import './user.component.scss'


import UserService from './../../services/user.service';
import AuthService from './../../services/auth.service';
import ActiveRoute from './../../core/active.route.service';
import DeleteModalComponent from './../deleteModal.component/deleteModalComponent'

export default class UserComponent{
    constructor(){
        this.authService = new AuthService();
        this.userService =  new UserService();
        this.activeRoute = new ActiveRoute();
        this._deleteModal = new DeleteModalComponent();
        this.authUserId = this.authService.userId;
        this.activeUserId = "5caf7b174c74ee0040239115";
    }
    async beforeRender(){
        this._user = await this.userService.getUser(this.activeUserId)
        this._userImages = await this.userService.getUserImages(this.activeUserId)
     
        this._imagesTemplate = this._userImages.images.map((image)=> this._singleImageTemplate(image));
        
    }
    render(){
        return `
        <user-component>
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                <div class="col-4" style="background:url(${this._user.cover}) no-repeat center / cover">
                    <span class="user-avatar-container d-flex    justify-content-center">
                        <div class="user-avatar">
                            <img src="${this._user.avatar}" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card-body">
                    <h5 class="card-title">${this._user.full_name}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                </div>
            </div>
            <div class ="images-container container">
                <div class="row">
                 ${this._imagesTemplate.join('')}
                </div>
            </div>
            <div class = "modal-container"></div>
        </user-component>
        `
    }
  
    _singleImageTemplate(image){
        return `<div class="col col-4">
            <div class="img-item" data-imageId="${image._id}">
                <img src="${image.url}" alt="">
                <div class="img-item-bottom">
                    <span>
                        <i class="fas fa-eye"></i>
                        ${image.views.length}
                    </span>
                    <span>
                        <i class="fas fa-thumbs-up"></i>
                        ${image.likes.length}
                    </span>
                    <span>
                        <i class="fas fa-trash-alt delete-image"></i>
                    </span>
                </div>
            </div>
        </div>`;
    }
    afterRender(){
       document.querySelector('.images-container').addEventListener("click", e =>{
           if (e.target.classList.contains('delete-image')){
                const imageId = e.target.closest('[data-imageId]').dataset.imageid;
                const [image] = this._userImages.images.filter(img => img._id === imageId);
                this._deleteModal.imageForDelete = image;
                this._deleteModal.closeCallback = this.modalClose.bind(this);
                this._deleteModal.deleteImageCallback = this.deleteImage.bind(this);
                document.querySelector('.modal-container').innerHTML = this._deleteModal.render();
                this._deleteModal.afterRender();
           }
       })
    }
    modalClose(){
        document.querySelector('.modal-container').innerHTML = '';
    }
    deleteImage(image_id, image_url){
        //APi req for deleting img; /api/public/users/remove-photo/{user-id}
        /* Request Method: DELETE
        Request body
        image_id: "5c7834269f486c002b7522c9"
        image_url: "users-photos/userPhotos-1551381541487.png" */
        
        let imgContainer = document.querySelector('.images-container .row');
        imgContainer.innerHTML = '';
        
        this._userImages.images = this._userImages.images.filter(img => img._id !== image_id);

        this._imagesTemplate = this._userImages.images.map((image)=> this._singleImageTemplate(image));

        imgContainer.innerHTML =this._imagesTemplate.join("");
        this.modalClose();
    }
}