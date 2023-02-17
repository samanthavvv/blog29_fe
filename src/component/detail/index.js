import React from "react";
import { postService as service } from "../../service/post";
import { observer } from "mobx-react";  //给组件用
import { inject } from "../../utils";
import mtz from 'moment-timezone'
import { Card, Row, Col, Empty } from 'antd';  //Modal 为对话框组件
import 'antd/lib/card/style'
import 'antd/lib/row/style'
import 'antd/lib/col/style'



@inject({ service })
@observer   //将react 组件转换为响应式组件
export default class Detail extends React.Component {
    constructor(props) {
        super(props)
        const { id = 1 } = props.match.params;
        this.props.service.getPost(id)  //id?
    }

    //渲染页面
    render() {
        console.log('detail render-------------------------------------')

        const layout = {    //用于页面布局
            labelCol: { span: 5 },
            wrapperCol: { span: 14 }
        };

        const tailLayout = {    //用于页面布局
            wrapperCol: { offset: 8, span: 16 }
        };

        console.log('!!!!!!!!!!', this.props.service.post);
        const {
            id, title, author,author_id, postdate, content
        } = this.props.service.post;

        if(!id){
            return <Empty />
        }

        return (
            <div>
                <Card title={title}>

                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={6}><p>作者 : {author}</p></Col>
                        <Col offset={10} span={7}><p>
                            发布时间 : {mtz(postdate).tz('Asia/Shanghai').format('YYYY年M月D日')}</p>
                        </Col>
                    </Row>

                    {/* 
                        如果使用了富文本编辑器，为了安全，防止XSS 攻击，React不允许直接按照HTML 显示
                        使用 dangerouslySetInnerHTML 属性，这个名字提醒使用者很危险
                    */}
                    <Card type="inner" >
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>   
                    </Card>
                </Card>
            </div>
        )
    }
}

