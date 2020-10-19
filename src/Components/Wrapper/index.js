import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  justify-content: center;

  ${({ theme }) => theme.mq.md} {
    width: 80%;
    height: 70%;
  }
`;

const Wrapper = ({ children }) => {
  return (
    <Wrap>
      <Container>{children}</Container>
    </Wrap>
  );
};

export default Wrapper;
