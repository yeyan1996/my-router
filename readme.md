# 前端路由的核心原理

## 哈希路由
利用浏览器修改锚点不会向服务器发送请求的特点，通过锚点来映射路由

涉及到的知识点:`onhashchange`,`location.hash`

## history 路由
利用 HTML5 的新 api，`pushState`，`replaceState` 使得修改整个 url 不会向服务器发送请求

涉及到的知识点:`location.pathname`,`pushState`，`replaceState`

# 路由堆栈的核心原理
基于栈的数据结构，定义一个指针（默认指向栈顶元素），当点击回退时(history.back)，指针指向栈的前一个，点击前进时（history.forward），指向栈的后一个元素，同时支持跳转到指定路由（history.go）
