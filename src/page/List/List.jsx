import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Table, Space, Button, PageHeader, message } from 'antd';
import {useHistory} from 'react-router-dom';
import { getProject, postVote } from '../../server/indexAPI';
//组件
import VoteListDetail from './componets/VoteListDetail';
import ReviewPdf from './componets/ReviewPdf';
import {
  SnippetsOutlined
} from '@ant-design/icons';
import {
  ListPage,
  ListPageBottomButton
} from './style.js';

function List() {
  const history = new useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewPdfShow, setReviewPdfShow] = useState(false);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [oneData, setOneData ] = useState( null );
  const columns = [
    {
      title: '材料编号',
      dataIndex: 'projectKey'
    },
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    // {
    //   title: '负责人',
    //   dataIndex: 'leader',
    // },
    // {
    //   title: '单位',
    //   dataIndex: 'department',
    // },
    // {
    //   title: '主审专家',
    //   dataIndex: 'expert',
    // },
    // {
    //   title: '投票结果',
    //   dataIndex: 'voteType', //当前专家投票结果，0待定，1通过，-1不通过
    //   render: text => {
    //     if(text === 0) {
    //       return <span style = {{'color':'#FAAD14'}}>待定</span>
    //     }else if(text === 1 ) {
    //       return <span style = {{'color':'#52C41A'}}>通过</span>
    //     }else if(text === -1 ) {
    //       return <span style = {{'color':'#FF4D4F'}}>不通过</span>
    //     }
    //   }
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          <Button 
            size='large' 
            type= { record.voteType === 1 ? 'primary' : 'default'} 
            onClick = {() => handleSpecialistVote(record.id, 1)}
          >
            同意
          </Button>
          <Button 
            size='large'
            type= { record.voteType === -1 ? 'primary' : 'default'}
            onClick = {() => handleSpecialistVote(record.id, -1)}
          >
            不同意
          </Button>
          <Button 
            size='large'
            type= { record.voteType === 0 ? 'primary' : 'default'} 
            onClick = {() => handleSpecialistVote(record.id, 0)}
          >
            待定
          </Button>
          <Button 
            size='large'
            type="default"
            icon={<SnippetsOutlined  />}
            onClick={() => handleShowProgectPDF(true, record)}
          >
            查看详情
          </Button>
          {/* 
          <SnippetsOutlined 

            onClick={() => handleShowProgectPDF(true, record)}
            style = {{fontSize: '16px', color: '#3E91F7'}}
          /> */}
          {/* <Button
            size='large'
            type="link"
            
          >
            查看
          </Button> */}
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
  //
  const handleReviewPdfShow = (show) => {
    setReviewPdfShow(show)
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
              <Button 
                key="2" 
                type="primary"
                onClick = {() => handleReviewPdfShow(true)}
              >评审办法</Button>,
              <Button 
                key="1" 
                type="primary" 
                onClick = {handleSaveOut}
              >
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
          <ListPageBottomButton>
            <Button key="1" type="primary" onClick = {handleSaveOut}>
              提交并退出
            </Button>
          </ListPageBottomButton>
        </Col>
      </Row>
      <VoteListDetail 
        isModalVisible={isModalVisible} 
        handleShowProgectPDF={handleShowProgectPDF}
        oneData = {oneData}

      />
      <ReviewPdf 
        reviewPdfShow={reviewPdfShow} 
        handleReviewPdfShow={handleReviewPdfShow}
      />
    </ListPage>
  )
}

export default List;