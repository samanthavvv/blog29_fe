import React from "react";
import { Link,Redirect } from "react-router-dom";
import { observer } from "mobx-react"; 
import {userService as service} from "../../service/user";
import { inject } from "../../utils";


// const service =new UserService();

// export default class Reg extends React.Component{
//     render(){
//         return <_Reg service={service} />
//     }
// }

@inject({service})
@observer       // observer 必须紧紧靠着组件
export default class Reg extends React.Component {
    // 校验用户注册信息。前端需校验，后端也需再次校验.这里只是简单演示校验两次输入密码是否一致
    validae(pwd, confirmpwd){
        if (pwd.value === confirmpwd.value){
            return true;
        }else{
            return false;
        }
    };

    handleClick(event){
        event.preventDefault(); 

        const form = event.target.form;
        const [name, email, password, confirmpwd] = form;
        console.log(name.value, email.value, password.value, confirmpwd.value)
        if(this.validae(password, confirmpwd)){
            this.props.service.reg(name.value, email.value, password.value);
        }
    };

    render() {

        // 判断被观察者对象是否有变化：标记是否注册
        if (this.props.service.isReg){
            return <Redirect to='/login' />
        };  

        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="姓名" />
                        <input type="text" placeholder="邮箱" />
                        <input type="password" placeholder="密码" />
                        <input type="password" placeholder="请确认密码" />
                        <button onClick={this.handleClick.bind(this)}>注册</button>
                        <p className="message">已注册, <Link to='/login'>去登录</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}