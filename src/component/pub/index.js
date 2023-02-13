import React from "react";
import { Link, Redirect } from "react-router-dom";
import '../../css/login_reg.css'
import { postService as service } from "../../service/pub";
import { observer } from "mobx-react";  //给组件用
import { inject } from "../../utils";
import { Form, Input, Button, Modal } from 'antd';  //Modal 为对话框组件
import 'antd/lib/Form/style'
import 'antd/lib/Input/style'
import 'antd/lib/Modal/style'


@inject({ service })
@observer   //将react 组件转换为响应式组件
export default class Pub extends React.Component {

    // 处理发布点击
    handleSubmit(e) {
        e.preventDefault();
        let form = e.target
        const [title, content] = form;
        console.log('handleSubmit', title.value, content.value)
        this.props.service.put(title.value, content.value)
    }

    //对话框 Modal：发布成功时
    handlOk(e) {
        // console.log('handlOk', e)
        this.props.service.success = false
    }

    //对话框 Modal：发布失败时
    handleCancel = e => {
        // console.log('handlOk', e)
        this.props.service.success = false
    };

    //渲染页面
    render() {
        console.log('pub render-------------------------------------')

        const layout = {    //用于页面布局
            labelCol: { span: 5 },
            wrapperCol: { span: 14 }
        };

        const tailLayout = {    //用于页面布局
            wrapperCol: { offset: 8, span: 16 }
        }

        return (
            <div>
                <Modal title='成功提交'     //对话款组件
                    visible={this.props.service.success}
                    onOk={this.handlOk.bind(this)}
                    onCancel={this.handlOk.bind(this)}
                >
                    <p>是否跳转到该博客的详细页面</p>
                </Modal>

                <Form {...layout} onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item label='标题'>
                        <Input placeholder="请输入标题" defaultValue='标题' />
                    </Form.Item>
                    <Form.Item label='内容'>
                        <Input.TextArea rows={4} placeholder="请输入内容" defaultValue='内容' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        <Button type="primary" htmlType='submit'>
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

