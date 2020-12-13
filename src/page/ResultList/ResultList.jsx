import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom'
import { Table, PageHeader, Button, message, Space, Typography } from 'antd';
import { getResult, postProgectEdit } from '../../server/indexAPI';
import {
  SnippetsOutlined
} from '@ant-design/icons';
import {
  ResultListPage
} from './style';

import VoteListDetail from '../List/componets/VoteListDetail'

const { Title } = Typography;

function ResultList() {
  const { pathname } = new useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oneData, setOneData] = useState(null);
  const [passData, setPassData] = useState(null);
  const [outData, setOutData] = useState(null);

  const columns = [
    {
      title: '材料编号',
      dataIndex: 'projectKey'
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
    // {
    //   title: '结果',
    //   dataIndex: 'result',
    //   width: 80,
    //   render: text => {
    //     if (text === 0) {
    //       return <span style={{ 'color': '#FAAD14' }}>待定</span>
    //     } else if (text === 1) {
    //       return <span style={{ 'color': '#52C41A' }}>通过</span>
    //     } else if (text === -1) {
    //       return <span style={{ 'color': '#FF4D4F' }}>不通过</span>
    //     }
    //   }
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          <Button
            size='large'
            type="default"
            icon={<SnippetsOutlined />}
            onClick={() => handleShowProgectPDF(true, record)}
          >
            查看详情
          </Button>
        </Space>
      ),
    },
  ];
  const dataList = useCallback(() => {
    const groupId = pathname.substring(pathname.lastIndexOf("/") + 1);
    ; (async () => {
      const { success, data } = await getResult({ groupId });
      if (success) {
        setPassData(data);
        setOutData(data);
      }
    })();
  }, [pathname])
  useEffect(() => {
    dataList();
  }, [dataList])

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
  //项目pdf显示隐藏
  const handleShowProgectPDF = (show, record) => {
    setIsModalVisible(show)
    console.log(record)
    setOneData(record)
  }
  //通过
  const handleProjectPass = (type) => {
    setButtonLoading(true)
    if (selectedRowKeys.length <= 0) {
      message.warning('请先选择项目！')
      setButtonLoading(false)
    } else {
      const data = {
        result: type,
        projectIdList: selectedRowKeys
      }
        ; (async () => {
          const { success } = await postProgectEdit(data);
          if (success) {
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
      {/* <PageHeader
        ghost={false}
        title="投票结果"
        extra={[
          // <Button 
          //   key="2" 
          //   type="primary" 
          //   loading = {buttonLoading}
          //   onClick = {() => handleProjectPass(1)}
          // >
          //   通过
          // </Button>,
          // <Button 
          //   key="1" 
          //   type="primary" 
          //   danger
          //   onClick = {() => handleProjectPass(-1)}
          // >
          //   未通过
          // </Button>
        ]}
      >
      </PageHeader> */}
      <Title level={2}>通过投票结果</Title>
      <Table
        columns={columns}
        dataSource={passData}
        pagination={false}
        rowKey='projectId'
        size='middle'
      />
      <Title level={2}>未通过投票结果</Title>
      <Table
        columns={columns}
        dataSource={outData}
        pagination={false}
        rowKey='projectId'
        size='middle'
      />
      <VoteListDetail
        isModalVisible={isModalVisible}
        handleShowProgectPDF={handleShowProgectPDF}
        oneData={oneData}
      />
    </ResultListPage>
  )
}

export default ResultList;