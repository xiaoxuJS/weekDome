import styled from 'styled-components';

export const ResultListPage = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  .ant-typography{
    background-color: #E2F6FF;
    padding: 20px 0;
  }
  .ant-table-content{
    font-size: 18px;
  }
`
export const ResultListPageHeader = styled.div`
  width: 100%;
  position: relative;
  span{
    position: absolute;
    right: 20px;
    top: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    color: red;
  }
`