import React from "react";
import { Link, Redirect } from "react-router-dom";
import '../../css/login_reg.css'
import { userService as service } from "../../service/user";
import { observer } from "mobx-react";  //给组件用
import { inject } from "../../utils";

@inject({service})
@observer   //将react 组件转换为响应式组件
export default class Profile extends React.Component {

    // 处理登录点击
    handleClick(event) {
        event.preventDefault();     //阻止表单的默认提交，后续通过 Ajax 进行提交
        this.props.service.logout()
    }

    //渲染页面
    render() {
        console.log('profile render-------------------------------------')

        //判断是否登出
        if(!this.props.service.isLogin){
            return <Redirect to='/login' />
        }

        return (
            <div>
                <h5>用户信息: <a onClick={this.handleClick.bind(this)}>[ 登出 ]</a></h5>
            </div>
        )
    }
}

