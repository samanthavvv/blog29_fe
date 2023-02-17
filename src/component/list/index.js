import React from "react";
import { postService as service } from "../../service/post";
import { observer } from "mobx-react";  //给组件用
import { inject } from "../../utils";
import { List, Empty } from 'antd';  //Modal 为对话框组件
import 'antd/lib/list/style'
import { Link } from "react-router-dom";


@inject({ service })
@observer   //将react 组件转换为响应式组件
export default class L extends React.Component {
    constructor(props) {
        super(props)
        let params = new URLSearchParams(props.location.search)         //查询字符串
        props.service.list(params)
    }

    //渲染页面
    render() {
        console.log('list render-------------------------------------')

        const { posts: data = [], pagination={} } = this.props.service.posts;
        const { page:current=1, size:pageSize=10, total=0 } = pagination;

        // console.log(this.props.location)    //react 的props 属性会收集此次请求的一些信息，例如查询参数

        return (
            <List
                header={<div>博客列表</div>}
                footer={<div>Footer</div>}
                bordered    //边缘线
                dataSource={data}   //给定数据源
                renderItem={item => (   //渲染每一行，给定一个一参函数迭代每一行
                    <List.Item>     {/* 每一行的组件*/}
                        <Link to={'/posts/' + item.id + '/'}>{item.title}</Link>
                    </List.Item>
                )}
                pagination={{
                    onChange: page => {     //页码切换时调用，回调函数是 (pageNo, pageSize)=>{} 即切换时获取当前页码和页内行数
                        console.log('page',page)
                        let params = new URLSearchParams(this.props.location.search);
                        params.set('page',page)
                        this.props.service.list(params);
                    },
                    defaultCurrent:1, 
                    current,    //当前页
                    pageSize,   //页面行数
                    total   //记录总数
                }}
            />
        )
    }
}

