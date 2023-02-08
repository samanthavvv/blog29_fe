// import axios from "axios";
import Axios from "../axios";
import { observable } from "mobx";
import { message, Button } from 'antd'; //引入ant design 的提示
import 'antd/es/message/style/css'

class UserService{
    @observable isLogin = false     //设置被观察者对象的属性
    @observable isReg = false

    // 登录方法
    login(name, password) {
        console.log('服务层，去处理登录', name, password);  //应该使用Ajax 异步的方式：axios组件中的xmlhttprequest 方法
        
        let params = {
            url: '/users/login/',
            data: {name, password}
        }

        Axios.post(params).then(
            value => {
                this.isLogin = true;    // 先不区分用户名密码是否正确
                if (!value.code){
                    message.success('用户名密码正确，该跳转了');
                    console.log('************** 用户名密码正确，该跳转了',value)
                } else {
                    message.warning('用户名密码不正确，应该拦截跳转');
                    console.log('!!!!!!!!!! 用户名密码不正确，应该拦截跳转',value)
                }
                
            },
            reason => {
                message.error('请求后端出错');
                console.log('xxxxxxxxxxxx 请求后端出错', reason)
            }
        );
    };

    // 注册方法
    reg(name, email, password) {
        console.log('服务层，去处理注册', name,email, password);  //应该使用Ajax 异步的方式：axios组件中的xmlhttprequest 方法
        
        let params = {
            url: '/users/',
            data: {name, email, password}
        }

        Axios.post(params).then(
            value => {
                this.isReg = true;    // 先不区分用户名密码是否正确
                if (!value.code){
                    message.success('注册信息正确，该跳转了');
                    console.log('************** 注册信息正确，该跳转了',value)
                } else {
                    message.warning('注册信息不正确，应该拦截跳转');
                    console.log('!!!!!!!!!! 注册信息不正确，应该拦截跳转',value)
                }
                
            },
            reason => {
                message.error('请求后端出错');
                console.log('xxxxxxxxxxxx 请求后端出错', reason)
            }
        );
    }
};

const userService = new UserService();  // 暴露服务。多个组件共享一个服务实例，共享服务属性信息
export {userService};   