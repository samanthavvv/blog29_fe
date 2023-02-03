import axios from 'axios';


export default class Axios {
    static config = {
        baseURL: '/api',    // axios 中配置了基础路径后，请求时，会自动在请求url 前面添加此路径
        timeout: 3000
    }

    // 作为其它组件的工具使用，通过 static 语句设置为静态方法（类方法）
    // static post(url, data, config) {     // 形参可以分别传入，也可以通过一个对象传入
    static post(params) {
        console.log('自己封装的axios 对象')

        return new Promise((resolve, reject) => {
            axios.post(
                params.url,
                params.data,
                { ...this.config, ...params.config }
                // Object.assign(this.config, params.config)    // 合并字典对象的另外一种方式
            ).then( // 返回一个全新的 Promise 对象
                response => {   // 必须使用箭头函数，否则this 会有问题
                    const data = response.data

                    if (!data.code) {
                        // success 用户名密码正确
                        console.log('用户名密码正确')
                        resolve(data)
                    } else {
                        // failed  用户名密码错误
                        console.log('用户名密码错误')
                        resolve(data);    // {code:3,msg:xxx}
                    }
                }
            ),
            reason => { //失败给出失败的理由
                    console.log('向后端传输数据时异常', error)
                    reject(reason)
                }
        }) 

    }
}