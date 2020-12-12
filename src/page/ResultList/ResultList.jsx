import React, { useState, useEffect, useCallback } from 'react';
import { useLocation} from 'react-router-dom'
import { Table, PageHeader, Button, message } from 'antd';
import {getResult, postProgectEdit} from '../../server/indexAPI';

import {
  ResultListPage
} from './style';

function ResultList() {
  const {pathname} = new useLocation();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false)
  const columns = [
    {
      title: '编号',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '项目名称',
      dataIndex: 'projectName'
    },
    {
      title: '通过票数',
      dataIndex: 'voteCount'
    },
    {
      title: '得票率',
      render: (text, record) => <span>{record.ratio}%</span>
    },
    {
      title: '结果',
      dataIndex: 'result',
      render: text => {
        if(text === 0) {
          return <span style = {{'color':'#FAAD14'}}>待定</span>
        }else if(text === 1 ) {
          return <span style = {{'color':'#52C41A'}}>通过</span>
        }else if(text === -1 ) {
          return <span style = {{'color':'#FF4D4F'}}>不通过</span>
        }
      }
    }
  ];
  const dataList = useCallback(() => {
    const  groupId = pathname.substring(pathname.lastIndexOf("/")+1);
    ;(async () => {
      const {success, data} = await getResult({groupId});
      if(success) {
        setData(data);
      }
    })();
  },[pathname])
  useEffect(() => {
    dataList();
  },[dataList])

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
    
  };
  //通过
  const handleProjectPass = (type) => {
    setButtonLoading(true)
    if(selectedRowKeys.length <= 0) {
      message.warning('请先选择项目！')
      setButtonLoading(false)
    }else{
      const data = {
        result: type,
        projectIdList: selectedRowKeys
      }
      ;(async () => {
        const {success} = await postProgectEdit(data);
        if(success) {
          message.success('成功！')
          setButtonLoading(false)
          setSelectedRowKeys([]);
          dataList();
        }
      })();
    }
  }
  return (
    <ResultListPage>
      <PageHeader
        ghost={false}
        title="投票结果"
        extra={[
          <Button 
            key="2" 
            type="primary" 
            loading = {buttonLoading}
            onClick = {() => handleProjectPass(1)}
          >
            通过
          </Button>,
          <Button 
            key="1" 
            type="primary" 
            danger
            onClick = {() => handleProjectPass(-1)}
          >
            未通过
          </Button>
        ]}
      >
      </PageHeader>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey='projectId'
      />
    </ResultListPage>
  )
}

export default ResultList;