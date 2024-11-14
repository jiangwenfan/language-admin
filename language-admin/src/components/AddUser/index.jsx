import React, { Component } from "react";
import { Button, Form, Input, Alert } from "antd";
import apiClient from "../../apiClient";
import PubSub from "pubsub-js";

export default class AddUser extends Component {
  state = {
    email: "",
    errorMsg: "",
    loading: false,
  };
  onFinish = (values) => {
    console.log("Success:", values);
    apiClient
      .post("/users/login-email-code/", {
        email: values.email,
        email_code: values.code,
      })
      .then((response) => {
        const { data } = response;
        if (response.status === 200 && data.token) {
          console.log(`登陆成功: ${data.token}`);
          PubSub.publish("isModalOpen", false);
        } else {
          this.setState({ errorMsg: `登陆失败: ${JSON.stringify(data)}` });
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          const { data } = error.response;
          this.setState({ errorMsg: JSON.stringify(data) });
        } else {
          console.log(error.response.data);
        }
      });
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  sendEmailCode = async () => {
    this.setState({ loading: true });
    try {
      let res = await apiClient.post("/users/obtain-email-code/", {
        email: this.state.email,
      });

      let { data } = res;
      if (!data.status) {
        // console.log(`邮件发送失败: ${JSON.stringify(data)}`);
        this.setState({ errorMsg: `邮箱错误: ${JSON.stringify(data)}` });
      } else {
        this.setState({ errorMsg: "" });
        console.log(`邮件发送成功: ${JSON.stringify(data)}`);
      }
    } catch (e) {
      console.log(e.status);
      if (e.status === 400) {
        const { data } = e.response;
        this.setState({ errorMsg: JSON.stringify(data) });
      } else {
        console.log(`sendEmailCode error: ${e}`);
      }
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <div>
        {this.state.errorMsg ? (
          <Alert message={this.state.errorMsg} type="warning" />
        ) : null}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{ email: "zhan2103208467@163.com" }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
          onValuesChange={(changedValues, allValues) => {
            // console.log("changedValues:", changedValues);
            console.log("allValues:", allValues);
            this.setState({ email: allValues.email });
          }}
        >
          <Form.Item
            label="email邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
            ]}
          >
            <Input
              onChange={(v) => {
                this.setState({ email: v.target.value });
              }}
            />
          </Form.Item>
          <Button
            onClick={this.sendEmailCode}
            loading={this.state.loading ? "loading" : null}
          >
            发送验证码
          </Button>

          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
