import styled from "styled-components";

export const Style = styled.div`
  .filter {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    transition: 0.3s;
    &.show {
      right: 0px;
    }
  }
  .borderBottomActive {
    border-bottom: 2px solid #00bbf1;
  }

  .cardImg {
    max-height: 150px;
  }
`;
