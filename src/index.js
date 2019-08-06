import Router from "./js/router/router";

const router = new Router()
window.addEventListener('load', router.route);
window.addEventListener('hashchange', router.route);