import {initState} from './state'

export default function initMixin(Vue){
// 扩展Vue的方法
Vue.prototype._init=function(options){
    // 绑定所有选项参数到实例上，后续所有的扩展方法都可以拿到这些选项
    const vm = this
    // $表示Vue自己的属性参数
    vm.$options= options
    // 初始化数据，如prop,data,methods,computed,watch
    initState(vm)
}
}