export default class BaseRouter {
    constructor(routeList) {
        this.routeList = routeList
    }
    render(route = this.routeList[0]) {
        let div = document.querySelector("div")
        div.innerHTML = this.routeList.find(itemRoute => itemRoute === route).component
    }
}
