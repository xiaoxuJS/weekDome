import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom'
import { Table, Button, Space, Typography } from 'antd';
import { getResult } from '../../server/indexAPI';
import {
  SnippetsOutlined
} from '@ant-design/icons';
import {
  ResultListPage,
  ResultListPageHeader
} from './style';

import VoteListDetail from '../List/componets/VoteListDetail'

const { Title } = Typography;

function ResultList() {
  const { pathname } = new useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oneData, setOneData] = useState(null);
  const [passData, setPassData] = useState(null);
  const [outData, setOutData] = useState(null);
  const [agreeCount, setAgreeCount] = useState(0);

  const columns = [
    {
      title: '材料编号',
      dataIndex: 'projectKey',
      width: 60
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: '通过票数',
      dataIndex: 'voteCount',
      width: 60
    },
    {
      title: '得票率',
      width: 81,
      render: (text, record) => <span>{record.ratio}%</span>
    },
    {
      title: '操作',
      width: 136,
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
        setPassData(data.agree);
        setOutData(data.refuse);
        setAgreeCount(data.agreeCount);
      }
    })();
  }, [pathname])
  useEffect(() => {
    dataList();
  }, [dataList])
  //项目pdf显示隐藏
  const handleShowProgectPDF = (show, record) => {
    setIsModalVisible(show)
    setOneData(record)
  }
  return (
    <ResultListPage>
      <ResultListPageHeader>
        <Title level={2}>通过投票结果</Title>
        <span>
          通过{agreeCount ? agreeCount : '0'}项
        </span>
      </ResultListPageHeader>
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