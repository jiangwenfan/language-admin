import React, { Component } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Space,
} from "antd";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";
import config from "../../config";

// const Context = React.createContext({
//   name: "Default",
// });

class LoginPage extends Component {
  state = {
    judgeStatus: false,
    // 登陆响应错误数据。没有错误，表示登陆成功。
    error: null,
  };

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       api: notification,
  //       contextValue: {
  //         name: "Ant Design",
  //       },
  //     };
  //   }

  //   openNotification = (placement) => {
  //     const { api } = this.state;
  //     api.info({
  //       message: `Notification ${placement}`,
  //       description: (
  //         <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
  //       ),
  //       placement,
  //     });
  //   };

  render() {
    const onFinish = (values) => {
      // 输入合法数据时进行登陆
      const loginData = {
        email: values.email,
        password: values.password,
      };
      // 发送请求
      axios
        .post(`${config.apiBaseUrl}/users/login-email-password/`, loginData)
        .then((response) => {
          // 登陆成功, 200
          const data = response.data;
          // 保存token
          localStorage.setItem("token", data.token);
          // 跳转到首页
          this.props.history.replace("/home");
          console.log(`登陆成功:${data}`);
          this.setState({ error: null });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // 客户端错误
            const dataObj = error.response.data;
            const dataString = JSON.stringify(dataObj);
            console.log(
              `登陆失败:${dataString} ${typeof dataObj} ${typeof dataString}`
            );
            this.setState({ error: dataString });
          } else {
            // 其他错误
            console.error("其他错误:", error);
            this.setState({ error: "其他未知错误" });
          }
        })
        .finally(() => {
          this.setState({ judgeStatus: true });
        });
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // const [api, contextHolder] = notification.useNotification();
    // const openNotificationWithIcon = (type) => {
    //   api[type]({
    //     message: "Notification Title",
    //     description:
    //       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    //   });
    // };

    const { judgeStatus, error } = this.state;
    return (
      <div>
        {judgeStatus ? (
          error ? (
            <Alert message={error} type="warning" />
          ) : (
            <Alert message="登陆成功" type="success" />
          )
        ) : null}
        {/* {contextHolder} */}

        {/* <Space>
          {judgeStatus ? (
            error ? (
              <Button onClick={() => this.openNotification("topLeft")}></Button>
            ) : (
              <Button onClick={() => this.openNotification("success")}>
                登陆成功
              </Button>
            )
          ) : null}
        </Space> */}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            email: "zhan2103208467@gmail.com",
            password: "admin123K#",
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your 邮箱!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your 密码!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginPage);
