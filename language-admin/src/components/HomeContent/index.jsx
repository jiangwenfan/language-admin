import React, { Component } from "react";
// import PubSub from 'pubsub-js';
import { Layout } from "antd";
import { Route, Redirect } from "react-router-dom";
import User from "../../page/user";
import Sentence from "../../page/sentence";
import MetaPage from "../../page/meta";
import Word from "../../page/word";

export default class HomeContent extends Component {
  render() {
    const { Content } = Layout;
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    //   } = theme.useToken();
    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          // background: colorBgContainer,
          // borderRadius: borderRadiusLG,
        }}
      >
        <Route path="/home/user" component={User} />
        <Route path="/home/sentence" component={Sentence} />
        <Route path="/home/meta" component={MetaPage} />
        <Route path="/home/word" component={Word} />
        <Redirect to="/home/about" />
      </Content>
    );
  }
}
