import React,{Component} from "react";
import { Button, Flex, Table } from 'antd';
import axios from 'axios';

export default class User extends Component {
    state = {
        // 是否正在加载
        loading: false,
        // 已经选择的key
        selectedRowKeys: [],
        // 数据源
        dataSource : [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
            },
          ]
    }

    componentDidMount(){
        //TODO 获取所有用户
    }

    // 刷新数据
    reload = () => {    
        console.log('开始刷新');
        this.setState({loading:true});

        setTimeout(() => {
        //   setSelectedRowKeys([]);
          this.setState({
            loading: false,
          });
        }, 1000);
      };
    
    // 列配置
    columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
    
    render(){ 
        const {loading,dataSource,selectedRowKeys} = this.state;

        const hasSelected = selectedRowKeys.length > 0;

        const rowSelection = {
            // selectedRowKeys,
            onChange: (newSelectedRowKeys) => {
                // 已经选择的key 数组 [1,2]
                console.log('selectedRowKeys changed: ', newSelectedRowKeys);
                // 更新状态
                this.setState({selectedRowKeys:newSelectedRowKeys});
              },
          };
 
        return (
                <Flex gap="middle" vertical>
                  <Flex align="center" gap="middle">
                    <Button type="primary" onClick={this.reload} disabled={hasSelected} loading={loading}>
                      刷新
                    </Button>
                    <Button type="primary" onClick={this.reload} disabled={!hasSelected} loading={loading}>
                        删除
                    </Button>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                  </Flex>
                  <Table rowSelection={rowSelection} columns={this.columns} dataSource={dataSource} />
                </Flex>
              );
        
    }
}



