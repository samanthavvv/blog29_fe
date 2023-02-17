import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./component/login";
import Reg from "./component/register";
import Profile from "./component/profile/index.js";
import Detail from "./component/detail";
import L from "./component/list"

import Pub from "./component/pub";
import { Layout } from 'antd';
import 'antd/lib/layout/style'
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style'


const { Header, Footer, Content } = Layout;

const Home = props => <h5>Home</h5>;
const About = props => <h5>About</h5>;
const Default = props => <h5>缺省显示</h5>;
const Always = props => <h5>页脚</h5>;
// const Profile = props => <h5>用户信息</h5>;


class App extends React.Component {
    state = {
        current: 'home',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return <Router>
             <Layout>
                <Header >
                {/* 首页增加导航栏链接，方便页面切换 */}
                <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} 
                defaultSelectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                    <Menu.Item key="home"><Link to="/"><Icon type="mail" />主页</Link></Menu.Item>
                    <Menu.Item key="login"><Link to="/login"><Icon type="login" />登陆</Link></Menu.Item>
                    <Menu.Item key="reg"><Link to="/reg"><Icon type="plus" />注册</Link></Menu.Item>
                    <Menu.Item key="pub"><Link to="/pub"><Icon type="eidt" />写博</Link></Menu.Item>
                    <Menu.Item key="list"><Link to="/list"><Icon type="bars" />全部博</Link></Menu.Item>
                    <Menu.Item key="about"><Link to="/about"><Icon type="enter" />关于</Link></Menu.Item>
                </Menu>
                </Header>

                <Content style={{padding: '10px 50px'}}>
                <Switch>
                    {/* 如果路径是 / 或者 index/ ，就路由到Home 组件 */}
                    <Route exact path={['/', '/index']} component={Home}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/reg' component={Reg}></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/pub' component={Pub}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/posts/:id' component={Detail}></Route>
                    <Route path='/list' component={L}></Route>
                    <Route component={Default}></Route>
                </Switch>
                </Content>

                <Footer style={{textAlign: 'center'}}>
                <Route component={Always}></Route>
                </Footer>
            </Layout>
        </Router>
    }
};

ReactDOM.render(<App />, document.getElementById('root'))
