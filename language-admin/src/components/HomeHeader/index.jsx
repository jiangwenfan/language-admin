import React, { Component } from "react";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import UserCenter from "../UserCenter";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import PubSub from "pubsub-js";

export default class HomeHeader extends Component {
  state = {
    collapsed: false,
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Header
        style={{
          padding: 0,
          // background: colorBgContainer,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          // onClick={() => setCollapsed(!collapsed)}
          onClick={() => {
            // 当点击按钮时，对当前状态取反，
            // 更新自己的状态
            this.setState({ collapsed: !collapsed });
            //然后发布消息
            PubSub.publish("collapsed", { collapsed: !collapsed });
          }}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            backgroundColor: "#90EE90",
          }}
        />
        <UserCenter />
      </Header>
    );
  }
}
