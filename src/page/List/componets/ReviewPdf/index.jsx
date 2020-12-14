import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Row, Col } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { baseUrl } from '../../../../server/http.js'
import {
    ReviewPdfPageImg
} from './style';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ReviewPdf({ reviewPdfShow, handleReviewPdfShow }) {
  const [urlPdf, setUrlPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const handleCancel = () => {
    handleReviewPdfShow(false);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {
      axios({
        url: baseUrl + '/review/project/method',
        method: "get",
        responseType: "blob",
      }).then((res) => {
        let blob = new Blob([res.data], {
          type: res.data.type
        })
        setUrlPdf(blob);
      })
  }, []);

  return (
    <Fragment>
      <Modal
          title='评审办法'
          visible={reviewPdfShow}
          onCancel={handleCancel}
          footer={null}
          width={800}
          destroyOnClose = {true}
        >
          <ReviewPdfPageImg>
            <Document
              file={urlPdf}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {
                new Array(numPages).fill('').map((item, index) => {
                  return (
                    <Fragment>
                      <Page key={index} pageNumber={index + 1} />
                      <span style = {{float: 'right', paddingRight: '20px'}}> 第{index + 1}页</span>
                    </Fragment>
                    
                  ) 
                })
              }
            </Document>
          </ReviewPdfPageImg>
        </Modal>
    </Fragment>
  )
}

export default ReviewPdf;