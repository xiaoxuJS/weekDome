import styled from "styled-components";
import bg from "../../utils/image/bg.jpg";

export const LoginBg = styled.div`
  background: #63bad8 url(${bg}) 50% 0px repeat-x;
  text-align: center;
  font: 12px "Lucida Grande", lucida, helvetica, arial, sans-serif;
  color: #333333;
  padding: 0px;
  height: 100vh;
`;

export const LoginWidth = styled.div`
  margin: 0 auto;
  width: 410px;
`;

export const LoginALLBox = styled.div`
  width: 370px;
  padding: 0 20px 0 20px;
  position: relative;
  top: 200px;
`;
export const LoginContent = styled.div`
  width: 370px;
  background-color: #fff;
  text-align: left;
  #header {
    width: 100%;
    background: #c5e6ea;
    padding: 25px 0 5px 20px;
    border-bottom: #b2ccd0 solid 1px;
    height: 80px;
    display: block;
    margin-bottom: 27px;
    h2{
      font-size: 24px;
      font-weight: bold;
    }
    img {
      width: 85%;
    }
  }
  .ant-form {
    max-width: 330px;
    padding-bottom: 20px;
    .ant-btn-primary {
      margin-left: 20px;
    }
  }
`;
