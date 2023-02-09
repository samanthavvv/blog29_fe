// import axios from "axios";
import Axios from "../axios";
import { observable } from "mobx";
import { message, Button } from 'antd'; //引入ant design 的提示
import 'antd/es/message/style/css'

class UserService{
    @observable isLogin = false     //设置被观察者对象的属性
    @observable isReg = false
    @observable captcha = {}   //验证码

    // 登录方法
    login(name, password, challenge, key) {
        console.log('服务层，去处理登录', name, password, challenge, key);  //应该使用Ajax 异步的方式：axios组件中的xmlhttprequest 方法
        
        let params = {
            url: '/users/login/',
            data: {name, password, challenge, key}
        }

        Axios.post(params).then(
            value => {                
                if (!value.code){
                    this.isLogin = true;
                    message.success('用户名密码正确，该跳转了');
                    // console.log('************** 用户名密码正确，该跳转了',value)
                } 
                if (value.code == 1){
                    message.warning('用户名密码不正确，应该拦截跳转');
                    this.captchaRefresh()
                    // console.log('!!!!!!!!!! 用户名密码不正确，应该拦截跳转',value)
                }
                if (value.code == 5) {
                    message.warning('验证码不正确，应该拦截跳转');
                    this.captchaRefresh()
                    // console.log('!!!!!!!!!! 验证码不正确，应该拦截跳转',value)
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
                if (!value.code){
                    this.isReg = true;
                    message.success('注册信息正确，该跳转了');
                    // console.log('************** 注册信息正确，该跳转了',value)
                } else {
                    message.warning('注册信息不正确，应该拦截跳转');
                    // console.log('!!!!!!!!!! 注册信息不正确，应该拦截跳转',value)
                }
                
            },
            reason => {
                message.error('请求后端出错');
                console.log('xxxxxxxxxxxx 请求后端出错', reason)
            }
        );
    };

    // 获取captcha 方法
    getCaptcha(){
        // get 请求去取回 image_url 和 key，填充img 标签的src，key input：hidden
        console.log('服务层，去处理验证码');

        Axios.get({
            url: '/users/getcaptcha/'
        }).then(
            value => {  //{"key":key,"image_url":image_url}
                console.log('从后端取到验证码了！！！！！！', value)
                value.image_url = '/api' + value.image_url;
                this.captcha = value;   //{"key":key,"image_url":image_url}
            },
            reason => {
                message.error('请求后端验证码出错');
                console.log('xxxxxxxxxxxx 请求后端验证码出错', reason)
            }
        )
        
    };

    //刷新验证码方法
    captchaRefresh(){
        // get 请求refresh 的url 去调用后台刷新函数 image_url,key,填充标签的src，key input、hidden
        Axios.get({
            url: '/captcha/refresh/',
            config:{
                headers: {'X-Requested-With': 'XMLHttpRequest'} // 增加一个头，让后台理解为is_ajax
            }
        }).then(
            value => {
                console.log('从后端重新取到验证码了！！！！！！', value)
                value.image_url = '/api' + value.image_url;
                this.captcha = value;
            },
            reason => {
                message.error('重新请求后端验证码出错');
                console.log('xxxxxxxxxxxx 重新请求后端验证码出错', reason)
            }
        )
    }
};

const userService = new UserService();  // 暴露服务。多个组件共享一个服务实例，共享服务属性信息
export {userService};   