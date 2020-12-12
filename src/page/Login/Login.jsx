import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLogin } from '../../server/indexAPI';


//样式
import {
  LoginBg,
  LoginWidth,
  LoginALLBox,
  LoginContent
} from './style'

//antd
import { Form, Input, Button, message } from "antd";

import { setItem , setToken} from '../../utils/common';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};
function Login() {
  const history = new useHistory();

  function onFinish(values) {
    ;(async () => {
      const {success, data, msg} = await getLogin(values);
      if(success) {
        setItem("userData",data)
        setToken(data.id)
        history.push('./list')
      }else{
        message.error(msg)
      }
    })();
  }
  return (
    <LoginBg>
      <LoginWidth>
        <LoginALLBox>
          <LoginContent>
            <div id="header">
              <h2>黄委基础创新团队评审系统</h2>
            </div>
            <Form {...layout} onFinish={onFinish}>
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  { required: true, message: "请输入密码" },
                  {
                    pattern: /^\d{6}$/,
                    message: '密码为六位数字',
                  }
                ]}
              >
                <Input placeholder="请输入密码" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                >
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </LoginContent>
        </LoginALLBox>
      </LoginWidth>
    </LoginBg>
  )
}

export default Login;