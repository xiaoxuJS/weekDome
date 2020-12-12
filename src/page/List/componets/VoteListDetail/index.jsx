import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Row, Col } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { baseUrl } from '../../../../server/http.js'
import {
  VoteListDetailPageImg
} from './style';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function VotoList({ isModalVisible, handleShowProgectPDF, oneData }) {
  const [urlPdf, setUrlPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const handleCancel = () => {
    handleShowProgectPDF(false);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {
    if (oneData) {
      axios({
        url: baseUrl + `/review/project/preview?projectId=${oneData.id}`,
        method: "get",
        responseType: "blob",
      }).then((res) => {
        let blob = new Blob([res.data], {
          type: res.data.type
        })
        setUrlPdf(blob);
      })
    }
  }, [oneData]);

  return (
    <Fragment>
      {
        oneData ? <Modal
          title={oneData.name}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <Row>
            <Col span={12}>项目负责人: {oneData.leader}</Col>
            <Col span={12}>单位: {oneData.department}</Col>
          </Row>
          <VoteListDetailPageImg>
            <Document
              file={urlPdf}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {
                new Array(numPages).fill('').map((item, index) => {
                  return <Page key={index} pageNumber={index + 1} />
                })
              }
            </Document>
          </VoteListDetailPageImg>
        </Modal> : <div></div>
      }
    </Fragment>
  )
}

export default VotoList;