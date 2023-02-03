import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./component/login";
import Reg from "./component/register";


function Home() {
    return <h5>Home</h5>
}

function About() {
    return <h5>About</h5>
}

function Default() {
    return <h5>Default</h5>
}

function Always() {
    return <h5>Always</h5>
}



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
                    <Route component={Default}></Route>
                </Switch>
                <Route component={Always}></Route>
            </div>
        </Router>
    }
};

ReactDOM.render(<App />, document.getElementById('root'))