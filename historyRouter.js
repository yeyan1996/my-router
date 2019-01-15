import BaseRouter from './BaseRouter.js'

class HistoryRouter extends BaseRouter {
    constructor(routeList) {
        super(routeList)
        //监听浏览器自身的前进后退事件
        window.onpopstate = e => {
            let route = this.matchRoute(location.pathname)
            this.render(route)
        }
    }

    push(path) {
        /**
         * @description pushState
         * @function pushState
         * @param {Object} state -状态对象
         * @param {String} title -标题
         * @param {String} URL -跳转路由
        **/
        history.pushState(undefined,undefined,path)
        this.render(this.matchRoute(path))
    }

    replace(path) {
        //replace同上
        history.replaceState(undefined,undefined,path)
        this.render(this.matchRoute(path))
    }

    go(step) {
        window.history.go(step);
    }
    matchRoute(path) {
        return this.routeList.find(route => route.path === path )
    }
}


let routeList = [
    {
        path:"/",
        component:"hello world"
    },
    {
        path: "/hello",
        component: "hello"
    },
    {
        path: "/world",
        component: "world"
    }
]
let historyRouter = new HistoryRouter(routeList)

export default historyRouter
