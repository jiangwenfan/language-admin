import React, { Component } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Avatar } from "antd";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const items = [
  {
    label: "查看个人信息",
    key: "1",
    icon: <UserOutlined />,
    disabled: true,
  },
  {
    label: "退出登陆",
    key: "logout",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "修改密码",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

class UserCenter extends Component {
  render() {
    const handleMenuClick = (e) => {
      message.info(`Click on menu item.${e.key}`);
      switch (e.key) {
        case "logout":
          console.log("退出登陆");
          // 删除本地存储的token
          localStorage.removeItem("token");

          // 跳转到登陆页面
          this.props.history.replace("/login");
          break;
        default:
          break;
      }
    };
    const menuProps = {
      items,
      onClick: handleMenuClick,
    };
    return (
      <Space wrap>
        <Dropdown menu={menuProps}>
          <Avatar
            style={{ backgroundColor: "green" }}
            size={40}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    );
  }
}

export default withRouter(UserCenter);
