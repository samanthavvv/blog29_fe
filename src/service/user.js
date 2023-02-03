// import axios from "axios";
import Axios from "../axios";

export default class UserService{
    login(name, password) {
        console.log('去处理', name, password);  //应该使用Ajax 异步的方式：axios组件中的xmlhttprequest 方法
        
        let params = {
            url: '/users/login/',
            data: {name, password}
        }

        Axios.post(params).then(
            value => {
                if (!value.code){
                    console.log('************** 用户名密码正确，该跳转了',value)
                } else {
                    console.log('!!!!!!!!!! 用户名密码不正确，应该拦截跳转',value)
                }
                
            },
            reason => {
                console.log('xxxxxxxxxxxx 请求后端出错', reason)
            }
        );
    }
}