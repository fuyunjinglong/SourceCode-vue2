import babel from 'rollup-plugin-babel'

export default{
    input:'./src/index.js',// 打包项目的入口
    output:{
        file:'dist/vue.js',// 打包输出的结果
        format:'umd', // 采用的模块化规范
        name:'Vue', // 指定的打包后全局变量
        sourcemap:true
    },
    plugins:[
        babel({
            exclude:"./node_module/**" // 排除babel解析目录，**是glob写法
        })
    ]
}