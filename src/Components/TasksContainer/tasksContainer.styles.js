import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const TasksEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.red};
  padding: 20px 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-right: 2px solid ${({ theme }) => theme.colors.darkGray};
  border-left: 2px solid ${({ theme }) => theme.colors.darkGray};
  font-weight: ${({ theme }) => theme.font.weight.light};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.size.xxs};
  width: 100%;
  padding: 10px;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.mq.md} {
    width: 50%;
  }
`;

export const FooterRows = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Paragraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  & > select {
    outline: none;
    border: none;
    width: 40px;
    margin: 0 15px;

    ${({ theme }) => theme.mq.md} {
      width: 70px;
      margin: 0 20px;
    }
  }
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;

  & > .MuiSvgIcon-root {
    font-size: ${({ theme }) => theme.font.size.sm};

    &:hover {
      cursor: pointer;
    }

    ${({ theme }) => theme.mq.md} {
      font-size: ${({ theme }) => theme.font.size.md};
    }
  }
`;
