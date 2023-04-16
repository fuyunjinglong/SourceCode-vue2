import { observe } from "./observe/index.js";

export  function initState(vm){
    const options =vm.$options

    if(options.data){
        initData(vm)
    }

}

function initData(vm){
let data = vm.$options.data;
// 判断是否为函数，如果是则执行函数获取返回值。
// 代理后，添加到vm实例上_data
data=vm._data = typeof data ==='function'?data.call(vm):data;
// 观察数据,实现响应式
observe(data)
console.log(data);
}