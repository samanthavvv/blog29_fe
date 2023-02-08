import React from "react";
import { Link, Redirect } from "react-router-dom";
import '../../css/login_reg.css'
import { userService as service } from "../../service/user";
import { observer } from "mobx-react";  //给组件用
import { inject } from "../../utils";

// const service =new UserService();

// export default class Login extends React.Component {
//     render() {
//         // 嵌套一层 Login的原因：service 是全局变量，在组件中使用是，通过props 属性使用
//         return <_Login service={service} />     
//     }
// }

@inject({service})
@observer   //将react 组件转换为响应式组件
export default class Login extends React.Component {

    /* 
        连接到服务器端进行用户名和密码的验证，并等待回复
        视图层组件中，只要收集用户名和密码就可以了，验证交给其它的服务层即 service 层 
    */
    handleClick(event) {
        // service.login()  // 通过 props 属性传入

        event.preventDefault();     //阻止表单的默认提交，后续通过 Ajax 进行提交

        console.log('clicked')

        const form = event.target.form
        // console.log(form[0], form[1])
        // console.log(form[0].value, form[1].value)

        const [username, password] = event.target.form;
        this.props.service.login(username.value, password.value)
    }

    render() {
        console.log('render-------------------------------------')

        
        // 判断被观察者对象是否有变化：标记是否注册
        if (this.props.service.isReg){
            return <Redirect to='/profile' />
        }

        // 判断被观察者对象是否有变化：标记是否登录
        if (this.props.service.isLogin){
            return <Redirect to='/profile' />
        }

        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="姓名" defaultValue='user10' />
                        <input type="password" placeholder="密码" defaultValue='ps' />
                        <button onClick={this.handleClick.bind(this)}>登录</button>
                        <p className="message">还未注册 <Link to='/reg'>去注册</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}

