import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.lightGray};

  ${({ theme }) => theme.mq.md} {
    border: 10px solid ${({ theme }) => theme.colors.lightGray};
  }
`;
const TableWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default TableWrapper;
