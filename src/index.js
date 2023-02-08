import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./component/login";
import Reg from "./component/register";
// import { observable } from "mobx";
// import { observer } from "mobx-react";  //给React 组件用的

const Home = props => <h5>Home</h5>;
const About = props => <h5>About</h5>;
const Default = props => <h5>缺省显示</h5>;
const Always = props => <h5>页脚</h5>;
const Profile = props => <h5>用户信息</h5>;


class App extends React.Component {
    render() {
        return <Router>
            <div>
                {/* 首页增加导航栏链接，方便页面切换 */}
                <ul>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/login">登陆</Link></li>
                    <li><Link to="/reg">注册</Link></li>
                    <li><Link to="/about">关于</Link></li>
                </ul>
                <Switch>
                    {/* 如果路径是 / 或者 index/ ，就路由到Home 组件 */}
                    <Route exact path={['/', '/index']} component={Home}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/reg' component={Reg}></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route component={Default}></Route>
                </Switch>
                <Route component={Always}></Route>
            </div>
        </Router>
    }
};

ReactDOM.render(<App />, document.getElementById('root'))

// // 模拟后端服务
// // class Service { //同步
// //     login(n) {
// //         for (let d=new Date().getTime(); new Date() < d +  n*1000;);    //模拟阻塞
// //         return Math.random();
// //     }
// // }


// class Service { //mobx
//     @observable ret = 0     //被观察者对象

//     login(n, objAppthis) {
//         return new Promise(
//             (resolve, reject) => {
//                 //模拟多少秒后执行成功
//                 setTimeout(() => {
//                     resolve(Math.random() + 1000)
//                 }, n * 1000)
//             }
//         ).then(
//             value => {
//                 this.ret = value
//             }
//         )
//     }
// }


// // 前后端交互：mobx测试
// @observer
// class App extends React.Component {
//     handlClick(e) {
//         console.log('调用开始')
//         console.log(e)

//         this.props.service.login(5, this)   //异步
//         console.log('mobx 处理：不受阻塞显示，直接返回')

//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.handlClick.bind(this)}>点击登录</button>
//                 {new Date().getTime()}结果是：{this.props.service.ret}
//             </div>
//         )
//     }
// }

