// import axios from "axios";
import Axios from "../axios";
import { observable } from "mobx";
import { message, Button } from 'antd'; //引入ant design 的提示
import 'antd/es/message/style/css'
import Cookies from "js-cookie";


class PostService{
    @observable success = false     //设置被观察者对象的属性
    @observable post = {}
    @observable posts = {}  //posts, pagination

    // 发布方法
    put(title, content) {
        console.log('服务层，去处理发布', title, content);  //应该使用Ajax 异步的方式：axios组件中的xmlhttprequest 方法
        
        let params = {
            url: '/posts/',
            data: {title, content},
            config: {
                headers: {'X-CSRFToken': Cookies.get('csrftoken')}
            }
        }

        Axios.post(params).then(
            value => {                
                this.success = true;
                message.info('发布成功，该跳转了');
            },
            reason => {
                if(reason.status == '401'){
                    message.warning('未登录');
                    console.log('未登录', reason)
                } 
                else if (reason.status == '403'){
                    message.warning('非法请求被拒绝')
                } 
                else{
                    message.error('其它错误，请联系管理员')
                }
            }
        );
    };

    //请求csrftoken 接口的方法
    getToken(){
        console.log('开始请求csrftoken')

        Axios.get({url: '/posts/gettoken/'}).then(
            value => {
                // 成功就会拿到set-cookie 设置 csrftoken
                console.log('成功拿到csrftoken', Cookies.get('csrftoken'))
            }
        )
    };

    //请求博客详情页方法
    getPost(id){
        console.log('向后端请求详情页',id)

        Axios.get({
            url: '/posts/' + id + '/'
        }).then(
            value => {
                this.post = value.post || {}
                console.log('成功获取到详情页',id)
            }
        ),
        reason => {
            message.warning(reason.msg || '获取详情页错误')
        }
    };

    // 获取全部博客
    list(params){       //无格式对象，或者 URLSearchParams 对象
        Axios.get({
            'url':'/posts/',
            config:{
                'params':params
            }
        }).then(
            value => {
                this.posts = value || {}
                console.log('成功获取到全部博文', this.posts)
            }
        ),
        reason => {
            message.warning(reason.msg || '获取全部博文错误')
        }
    };

};

const postService = new PostService();  // 暴露服务。多个组件共享一个服务实例，共享服务属性信息
export {postService};   