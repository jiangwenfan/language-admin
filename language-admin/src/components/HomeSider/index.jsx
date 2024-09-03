import React,{Component} from "react";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PubSub from 'pubsub-js';

class HomeSider extends Component {
    state = {
        // 侧边栏是否折叠. true 为折叠，false 为不折叠【默认】
        collapsed: false,
    };
    
    // 当组件挂载完成后，订阅消息
    componentDidMount(){
        // 订阅消息
        this.token = PubSub.subscribe('collapsed',(_,stateObj)=>{
            console.log('home sider组件:',stateObj);
            this.setState(stateObj);
        })
    }

    // 当组件卸载时，取消订阅
    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }
    render(){
        const {Sider} = Layout;
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'nav 1',
                    },
                    {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: '句子',
                    onClick: () => {
                        console.log('sentence');
                        // 更新地址栏为/sentence
                        this.props.history.push('/sentence');
                    },
                },
                    {
                        key: '3',
                        icon: <UserOutlined />,
                        label: 'user',
                        onClick: () => {
                            console.log('user');
                            // 更新地址栏为/user
                            this.props.history.push('/user');
                        },
                    },
                ]}
                />
         </Sider>
        )
    }
}

export default withRouter(HomeSider);