/**
 关于路由栈的解释
 @see http://web.jobbole.com/87227/
 **/

let input = document.querySelector("input")
let record = document.querySelectorAll("button")[0]
let redo = document.querySelectorAll("button")[1]
let undo = document.querySelectorAll("button")[2]
let recordContainer = document.querySelector(".record-container")
let value = document.querySelector(".value")


class CommandController {
    constructor() {
        this.stack = []
        this.step = 0
    }

    record(state) {
        while (this.step < this.stack.length) {
            this.stack.pop()
        }
        this.stack.push(JSON.stringify(state))
        this.step = this.stack.length
        return this.stack[this.step - 1]
    }

    redo() {
        // step 为 1 时禁止后退
        if (this.step !== 1) this.step = this.step - 1
        return this.stack[this.step - 1]
    }

    undo() {
        if (this.step !== this.stack.length) this.step = this.step + 1
        return this.stack[this.step - 1]
    }

    travel(index) {
        this.step = index + 1
        this.markCurrentNode(index)
        return this.stack[index]
    }

    markCurrentNode(index = this.step - 1) {
        let arrowNode = CommandController.arrowNode
        let nodeList = [...document.querySelectorAll('p')]
        nodeList.forEach(node => {
            node.contains(arrowNode) && node.removeChild(arrowNode)
        })
        nodeList[index].appendChild(arrowNode)
    }

    static arrowNode = (function () {
        let arrowNode = document.createElement("span")
        arrowNode.innerHTML = '<--'
        arrowNode.style.color = 'red'
        return arrowNode
    })()
}

let controller = new CommandController()

// 添加
record.addEventListener('click', () => {
    value.textContent = controller.record(input.value)
    recordContainer.innerHTML = ""
    input.value = ""
    controller.stack.forEach(item => {
        recordContainer.innerHTML += `<p>${item}</p>`
    })
    controller.markCurrentNode()
})
// 后退
redo.addEventListener('click', () => {
    value.textContent = controller.redo()
    controller.markCurrentNode()
})
// 前进
undo.addEventListener('click', () => {
    value.textContent = controller.undo()
    controller.markCurrentNode()
})

// 栈中任意元素
recordContainer.addEventListener('click', e => {
    let children = [...recordContainer.children]
    let index = children.findIndex(node => node === e.target)
    value.textContent = controller.travel(index)
    controller.markCurrentNode(index)
})
