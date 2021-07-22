import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, Select, Input, message } from 'antd';
import { NameContext } from '../Tables/Tables';
import { mockService } from '../../script/list';
import './editor.css';
const { Option } = Select;
const Editor = () => {
  const { isModalVisible, setIsModalVisible, editData, getaa } =
    useContext(NameContext); //拿取上下文
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue, getFieldDecorator } = form;

  //设置修改表单数据
  useEffect(() => {
    if (editData) {
      setFieldsValue({
        name: editData.name,
        age: editData.age,
        sex: editData.sex,
        email: editData.email,
      });
    }
  }, [editData]);
  //取消修改
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //确认修改
  const submit = async () => {
    let datas = getFieldValue();
    datas.key = editData.key;
    //调用修改的函数  在调用之前，要根据情况判断格式或者必填项
    let age = exAge(getFieldValue('age'));
    let email = exEmail(getFieldValue('email'));
    if (age && email) {
      let res = await mockService.editUser(datas);
      if (res.code === 200) {
        message.success('修改成功');
        getaa();
      } else {
        message.error('修改失败');
      }
      setIsModalVisible(false);
    }
  };
  //判断年龄格式
  const exAge = (age) => {
    if (/^[1-9]\d*$/.test(age)) {
      return true;
    } else {
      message.error('年龄只能是数字');
      return false;
    }
  };
  //判断邮箱
  const exEmail = (email) => {
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
      return true;
    } else {
      message.error('请输入正确的邮箱');
      return false;
    }
  };
  return (
    <Modal
      getContainer={false}
      forceRender={true}
      title="编辑用户"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>取消</Button>,
        <Button type="primary" onClick={submit}>
          确认
        </Button>,
      ]}
    >
      <Form form={form} name="userForm">
        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="年龄"
          name="age"
          className="ageINput"
          rules={[
            {
              pattern: /^[1-9]\d*$/,
              message: '年龄只能是数字',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Select className="select">
            <Option value="男" key="男">
              男
            </Option>
            <Option value="女" key="女">
              女
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '请输入正确邮箱',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Editor;
