import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

function SaveOut() {
  const history = new useHistory();
  return (
    <Result
      status="success"
      title="保存成功已退出！"
      extra={[
        <Button type="primary" key="console" size='large' onClick = {() => history.push('./')}>
          返回登陆页面
        </Button>
      ]}
    />
  )
}

export default SaveOut;