import { Table, Space, Modal, message } from 'antd';
import { useState, useEffect, createContext } from 'react';
import { mockService } from '../../script/list';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Editor from '../Editor/Editor';
import './table.css';
const { confirm } = Modal;
export const NameContext = createContext();
export const Tables = () => {
  const [listData, setListData] = useState(); //列表数据
  const [total, setTotal] = useState(0); //总数
  const [isModalVisible, setIsModalVisible] = useState(false); //模态框状态
  const [editData, setEditData] = useState(); //当前修改数据
  const [NowPage, setNowPage] = useState(1); //当前页
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => edit(text, record)}>编辑</a>
          <a onClick={() => del(text, record)}>删除</a>
        </Space>
      ),
    },
  ]; //表头
  //数据请求
  const getaa = async () => {
    let obj = await mockService.queryPagedUserList(NowPage, 5);
    setListData(obj.rows);
    setTotal(obj.total);
  };
  //请求调用
  useEffect(async () => {
    getaa();
  }, []);
  const edit = (text, record) => {
    setIsModalVisible(true);
    setEditData(record);
  };
  //删除数据
  const detelData = async (id) => {
    let res = await mockService.deleteUser(id);
    if (res.code === 200) {
      message.success('删除成功');
      getaa();
    } else {
      message.error('删除失败');
    }
  };
  //点击删除
  const del = (text, record) => {
    confirm({
      title: '确定要删除这条记录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        detelData(record.key);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };
  //改变当前页
  const onChange = async (val) => {
    setNowPage(val);
    let obj = await mockService.queryPagedUserList(val, 5);
    setListData(obj.rows);
    setTotal(obj.total);
  };
  return (
    <div className="table">
      <h1>用户管理</h1>
      <Table
        columns={columns}
        dataSource={listData}
        pagination={{
          total: total,
          pageSize: 5,
          onChange: onChange,
        }}
      />
      <NameContext.Provider
        value={{
          isModalVisible,
          setIsModalVisible,
          editData,
          setEditData,
          getaa,
        }}
      >
        <Editor isVisible={isModalVisible} />
      </NameContext.Provider>
    </div>
  );
};
