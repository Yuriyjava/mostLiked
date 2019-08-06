
export default class DeleteModalComponent{
    constructor(){
        
    }
    set imageForDelete(img){
        this._image = img;   
    }
    set closeCallback(callback){
        this.close  = callback;
    }
    set deleteImageCallback(callback){
        this.deleteImage  = callback;
    }
    render(){
        return `<div class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete image</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="close">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Delete image _id:${this._image._id} ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger btn-delete">Yes delete!</button>
            </div>
          </div>
        </div>
      </div>`
    }
    afterRender(){
       document.querySelector(".modal").addEventListener('click', e=>{
           if (e.target.classList.contains('close')){
               
                this.close();
           }
           if (e.target.classList.contains('btn-delete')){
                this.deleteImage(this._image._id, this._image.url)
           }
       })
    }
}