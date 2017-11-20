// nodejs相关

1. nodejs是一个基于chrome V8引擎的运行环境，是一个平台，不是一个语言，只不过使用js（不包括dom和bom）来操作底层api
2. [事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f#)，其实就是 先宏任务 -> 后微任务（统称任务队列）的无限重复，事件循环可以分为这样的一个过程：分别是 宏任务->执行栈->微任务。
    1. 宏任务：整体代码，定时器 > setImmediate > I/O > ui render（定时器是立刻触发，它的第一个参数才是进入任务队列的主体
    2. 微任务：process.nextTick > promise，Object.observe(已废弃)