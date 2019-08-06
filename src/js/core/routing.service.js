export default class Routing{
    navigate(route, data = null){
        location.appData = data;
        location.hash = route;
    }
}