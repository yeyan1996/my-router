export default class BaseRouter {
    constructor(routeList) {
        this.routeList = routeList
    }
    render(route) {
        let div = document.querySelector("div")
        div.innerHTML = this.routeList.find(itemRoute => itemRoute === route).component
    }
}