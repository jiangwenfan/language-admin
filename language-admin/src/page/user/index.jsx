import React, { Component } from "react";
import { Button, Flex, Table, Modal } from "antd";
import apiClient from "../../apiClient";
import AddUser from "../../components/AddUser";
import PubSub from "pubsub-js";

// user列配置
const columns = [
  {
    title: "手机区域",
    dataIndex: "countryEnglishName",
  },
  {
    title: "手机号",
    dataIndex: "phoneNumber",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "管理员",
    dataIndex: "isSuperuser",
  },
  {
    title: "创建时间",
    dataIndex: "dataJoined",
  },
];

export default class User extends Component {
  state = {
    // 是否正在加载
    loading: false,
    // 已经选择的key
    selectedRowKeys: [],
    // 数据源
    dataSource: [],
    // 增加用户模态框
    isModalOpen: false,
  };

  getAllUsers = () => {
    // 获取所有用户
    apiClient
      .get("/users/")
      .then((response) => {
        const result = response.data["results"];
        result.forEach((item, index) => {
          item.key = item.id;
          item.countryEnglishName = item["dialing_prefix"]
            ? item["dialing_prefix"]["country_english_name"]
            : "空";
          item.phoneNumber = item["phone_number"] ? item["phone_number"] : "否";
          item.isSuperuser = item["is_superuser"] ? "是" : "否";
          // console.log(item["date_joined"], typeof item["date_joined"]);
          item.dataJoined = item["date_joined"];
        });
        this.setState({ dataSource: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("componentDidMount");
    PubSub.subscribe("isModalOpen", (msg, data) => {
      console.log("订阅到消息: ", data);
      this.setState({ isModalOpen: data });
    });
    this.getAllUsers();
  }

  // 刷新数据
  reload = async () => {
    console.log("开始刷新");
    this.setState({ loading: true });
    await this.getAllUsers();
    this.setState({
      loading: false,
    });
  };

  // 删除数据
  delete = () => {
    this.setState({ loading: true });
    const { selectedRowKeys, dataSource } = this.state;
    console.log("开始删除,selectedRowKeys: ", selectedRowKeys);

    // TODO 批量删除，当前只能删除一个
    apiClient
      .delete(`/users/${selectedRowKeys[0]}/`)
      .then((response) => {
        console.log("api删除成功");
        // 本地数据删除，留下没有被删除的数据
        const newDataSource = dataSource.filter(
          (item) => item.key !== selectedRowKeys[0]
        );
        this.setState({ dataSource: newDataSource, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOpenModel = () => {
    this.setState({ isModalOpen: true });
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };
  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { loading, dataSource, selectedRowKeys, isModalOpen } = this.state;

    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = {
      // selectedRowKeys,
      onChange: (newSelectedRowKeys) => {
        // 已经选择的key 数组 [1,2]
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        // 更新状态
        this.setState({ selectedRowKeys: newSelectedRowKeys });
      },
    };

    return (
      <Flex gap="middle" vertical>
        <button type="primary" onClick={this.handleOpenModel}>
          增加用户(弹出模态框，邮箱-验证码登陆)
        </button>
        <Modal
          title="创建账号-通过邮箱和验证码"
          // 对话框是否可见
          open={isModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleClose}
          // 不使用模态框的底部按钮
          footer={null}
        >
          <AddUser />
        </Modal>
        <Flex align="center" gap="middle">
          <Button
            type="primary"
            onClick={this.reload}
            disabled={hasSelected}
            loading={loading}
          >
            刷新
          </Button>
          <Button
            type="primary"
            onClick={this.delete}
            disabled={!hasSelected}
            loading={loading}
          >
            删除
          </Button>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </Flex>
    );
  }
}
