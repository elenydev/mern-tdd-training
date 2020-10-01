import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(2, 1fr) 0.5fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: ${({ theme }) => theme.colors.onion};
  font-size: ${({ theme }) => theme.font.size.xxs};
  font-weight: ${({ theme }) => theme.font.weight.light};

  ${({ theme }) => theme.mq.md} {
    padding: 15px;
  }
`;

export const TaskName = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: ${({ sorting }) => (sorting ? "#ff3399" : "#fff")};

  .MuiSvgIcon-fontSizeLarge {
    opacity: 0;
    transition: 0.2s all linear;
    transform: ${({ sorting }) =>
      sorting ? "rotate(180deg)" : "rotate(0deg)"};
  }

  &:hover,
  &:active {
    .MuiSvgIcon-fontSizeLarge {
      opacity: 1;
    }
  }
`;

export const TaskPriority = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: ${({ sorting }) => (sorting ? "#ff3399" : "#fff")};

  .MuiSvgIcon-fontSizeLarge {
    opacity: 0;
    transition: 0.2s all linear;
    transform: ${({ sorting }) =>
      sorting ? "rotate(180deg)" : "rotate(0deg)"};
  }

  &:hover,
  &:active {
    .MuiSvgIcon-fontSizeLarge {
      opacity: 1;
    }
  }
`;

export const TaskStatus = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: ${({ sorting }) => (sorting ? "#ff3399" : "#fff")};

  .MuiSvgIcon-fontSizeLarge {
    opacity: 0;
    transition: 0.2s all linear;
    transform: ${({ sorting }) =>
      sorting ? "rotate(180deg)" : "rotate(0deg)"};
  }

  &:hover,
  &:active {
    .MuiSvgIcon-fontSizeLarge {
      opacity: 1;
    }
  }
`;
