import React, { Component } from "react";
import apiClient from "../../apiClient";
import { Button, Flex, Table } from "antd";

// 表列配置
const columns = [
  {
    title: "句子",
    dataIndex: "sentence",
  },
  {
    title: "语言类型",
    dataIndex: "language_type",
  },
  {
    title: "翻译",
    dataIndex: "translation",
  },
  {},
];
export default class Sentence extends Component {
  getAllSentences = () => {
    apiClient
      .get("/sentences/")
      .then((response) => {
        const result = response.data["results"];
        console.log(result);
        // result.forEach((item, index) => {
        //   item.key = item.id;
        //   item.sentence = item["sentence"];
        //   item.translation = item["translation"];
        //   item.language = item["language"];
        //   item.source = item["source"];
        //   item.createTime = item["create_time"];
        // });
        // this.setState({ dataSource: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllSentences();
  }

  render() {
    return (
      <div>
        <h2>句子管理</h2>
      </div>
    );
  }
}
