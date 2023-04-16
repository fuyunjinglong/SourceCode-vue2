// 高类聚，低耦合
class Observer{
    constructor(data){
        this.walk(data);
    }
    walk(data){
        // 遍历一遍数据，添加响应式
        Object.keys(data).forEach(key=>{
            defineReactive(data,key,data[key])
        })
    }
}

function defineReactive(data,key,value){
    // 属性全部被重写
    // 递归代理属性
    observe(value);
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newV){
            observe(value);
            value = newV===value?value:newV;
        }
    })
}

export function observe(data){
    // 数据响应式
    if(typeof data !== 'object'||data===null){
        return;// 如果不是对象，就不处理
    }
    /**
 * Class方法扩展与构造函数方法扩展比较：
 * 1.Class用于扩展方法耦合的场景，但扩展方法都在class内部
 * 2.构造函数用于外部方法的任意扩展，使用原型属性继承扩展方法，可以无限扩展，不受约束
 */
// 这里采用Class类
    return new Observer(data)
}