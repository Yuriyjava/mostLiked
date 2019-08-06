import HomeComponent from '../components/home.component/home.component';
import LoginComponent from '../components/login.component/login.component';
import NotFoundComponent from '../components/notfound.component/notfound.component';
import UserComponent from '../components/user.component/user.component';
import AuthGuard from '../guard/auth.guard';
import NewsComponent from '../components/news.component/news.component';
const authGuard = new AuthGuard();

const routes = {
    '/': {
        component: new HomeComponent(),
        name: "Home"
    },
    '/login': {
        component: new LoginComponent(),
        name: "Login"
    },
    '/user/:id': {
        component: new UserComponent(),
        guard: authGuard,
        name: "My profile"
    },
    '/news': {
        component: new NewsComponent(),
        guard: authGuard,
        name: "News"
    },
    '**': {
        component: new NotFoundComponent()
    }
}

export default routes;