import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr) 0.5fr 0.5fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  width: 100%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.size.xxs};
  font-weight: ${({ theme }) => theme.font.weight.light};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-right: 2px solid ${({ theme }) => theme.colors.darkGray};
  border-left: 2px solid ${({ theme }) => theme.colors.darkGray};
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};

  ${({ theme }) => theme.mq.md} {
    padding: 15px;
  }

  &:hover,
  &:active {
    .action {
      display: flex;
    }
  }
`;

export const TaskName = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  word-break: break-word;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const TaskPriority = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

export const TaskStatus = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

export const TaskAction = styled.p`
  display: none;
  align-items: center;
  justify-content: center;
  transition: 0.2s linear;

  .MuiSvgIcon-root {
    font-size: 2em;
    cursor: pointer;
  }
`;

export const DeleteBtn = styled.button`
outline: none;
border: none;
`
