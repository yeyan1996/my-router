import BaseRouter from './BaseRouter.js'

class HashRouter extends BaseRouter {
    constructor(routeList) {
        super(routeList)
    }

    push(path) {
        location.hash = path
    }

    replace(path) {
        let url = this.getReplaceUrl(path)
        location.replace(url)
    }

    hash2path(hash) {
        return hash.slice(1)
    }

    matchRoute(path) {
        return this.routeList.find(route => route.path === path)
    }

    getReplaceUrl(path) {
        let href = location.href
        let index = href.indexOf('#')
        let baseUrl = href.slice(0, index)
        console.log(`${baseUrl}/#${path}`)
        return `${baseUrl}#${path}`
    }
}


let routeList = [
    {
        path: "/hello",
        component: "hello"
    },
    {
        path: "/world",
        component: "world"
    }
]
let hashRouter = new HashRouter(routeList)

window.onhashchange = function (e) {
    console.log(location.hash)
    let path = hashRouter.hash2path(location.hash)
    let route = hashRouter.matchRoute(path)
    hashRouter.render(route)
}

export default hashRouter
