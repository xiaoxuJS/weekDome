import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Table, Space, Button, PageHeader, message } from 'antd';
import {useHistory} from 'react-router-dom';
import { getProject, postVote } from '../../server/indexAPI';
import VoteListDetail from './componets/VoteListDetail';
import {
  ListPage
} from './style.js';

function List() {
  const history = new useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [oneData, setOneData ] = useState( null );
  const columns = [
    {
      title: '编号',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
    },
    {
      title: '单位',
      dataIndex: 'department',
    },
    {
      title: '主审专家',
      dataIndex: 'expert',
    },
    {
      title: '投票结果',
      dataIndex: 'voteType', //当前专家投票结果，0待定，1通过，-1不通过
      render: text => {
        if(text === 0) {
          return <span style = {{'color':'#FAAD14'}}>待定</span>
        }else if(text === 1 ) {
          return <span style = {{'color':'#52C41A'}}>通过</span>
        }else if(text === -1 ) {
          return <span style = {{'color':'#FF4D4F'}}>不通过</span>
        }
      }
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          <Button 
            size='large' 
            type="primary" 
            onClick = {() => handleSpecialistVote(record.id, 1)}
          >
            通过
          </Button>
          <Button 
            size='large' 
            onClick = {() => handleSpecialistVote(record.id, 0)}
          >
            待定
          </Button>
          <Button 
            size='large' 
            type="primary" 
            danger 
            onClick = {() => handleSpecialistVote(record.id, -1)}
          >
            未通过
          </Button>
          <Button
            size='large'
            type="link"
            onClick={() => handleShowProgectPDF(true, record)}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];
  const dataList = useCallback(() => {
    ;(async () => {
      const {success, data} = await getProject();
      if( success ){
        setData(data)
      } 
    })()
  },[],)

  useEffect(() => {
    const userData =  JSON.parse(sessionStorage.getItem('userData'))
    setName(userData.expertName);
    dataList()
  },[dataList])
  //项目pdf显示隐藏
  const handleShowProgectPDF = (show, record) => {
    setIsModalVisible(show)
    setOneData(record)
  }
  //保存推出
  const handleSaveOut = () => {
    history.push('/saveOut')
    sessionStorage.clear()
  };
  //投票
  const handleSpecialistVote = (id, voteType) => {
    const data = {
      projectId:id,	//材料id
      result:	voteType		//投票结果  0 待定 1 通过 -1 不通过
    }
    ;(async () => {
      const {success, msg} = await postVote(data);
      if(success) {
        message.success('投票成功')
        dataList()
      }else{
        message.error(msg)
      }
    })()
  }
  return (
    <ListPage>
      <Row>
        <Col span={24}>
          <PageHeader
            ghost={false}
            title= '黄委基础创新团队评审系统'
            extra={[
              <Button key="2" type="link">{name}</Button>,
              <Button key="1" type="primary" onClick = {handleSaveOut}>
                提交并退出
              </Button>,
            ]}
          >
          </PageHeader>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey='id'
          />
        </Col>
      </Row>
      <VoteListDetail 
        isModalVisible={isModalVisible} 
        handleShowProgectPDF={handleShowProgectPDF}
        oneData = {oneData}

      />
    </ListPage>
  )
}

export default List;