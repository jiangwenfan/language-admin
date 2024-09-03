import React,{Component} from "react";
// import PubSub from 'pubsub-js';
import { Layout,} from 'antd';
import {Route,Redirect} from 'react-router-dom';
import User from '../../page/user';
import Sentence from "../../page/sentence";

export default class HomeContent extends Component {
    render(){
        const {Content} = Layout;
        // const {
        //     token: { colorBgContainer, borderRadiusLG },
        //   } = theme.useToken();
        return (
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    // background: colorBgContainer,
                    // borderRadius: borderRadiusLG,
                }}
             >
                <Route path="/user" component={User}/>
                <Route path="/sentence" component={Sentence}/>
                <Redirect to="/about"/>
            </Content>
        )
    }
}