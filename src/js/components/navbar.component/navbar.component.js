import './navbar.component.scss'


import AuthService from '../../services/auth.service'
import Routing from "./../../core/routing.service";
import UserService from '../../services/user.service';
import routes from '../../router/routes.config'

export default class LoginComponent {
  constructor() {
    this._authService = new AuthService();
    this._routing = new Routing();
    this.userService = new UserService();
    this.routes = routes;
  }
  async beforeRender() {
    this._userId = this._authService.userId;
  }
  render() {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/#/">App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    </div>
                    <button class="btn btn-primary logout-btn">Logout</button>
                  </nav>
        `
  }
  afterRender() {
    let navMenu = document.querySelector('.collapse.navbar-collapse');

    let ul = document.createElement('ul');
    ul.classList.add("navbar-nav");
    for (let route in this.routes) {
      ul.insertAdjacentHTML("beforeend", this.generateRouteLink(route, this.routes[route]))
    }
    navMenu.appendChild(ul);
    document.querySelector('.logout-btn').addEventListener('click', (e) => {
      this._authService.logout().then(() => this._routing.navigate('/login'));
    })
  }
  generateRouteLink(key, route) {
    if (route.name && route.name !== 'Login') {
      return `<li class="nav-item">
      <a class="nav-link" href="/#${route.name === "My profile" ? '/user/'+this._userId : key }">${route.name}</a>
    </li>`
    } else {
      return ''
    }
  }
}