import React, { useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import TasksContainer from "../TasksContainer";
import TableWrapper from "../TableWrapper";
import { Wrapper, TaskName, TaskPriority, TaskStatus } from "./table.styles";

const Table = () => {
  const [nameSorting, setNameSorting] = useState(false);
  const [prioritySorting, setPrioritySorting] = useState(false);
  const [statusSorting, setStatusSorting] = useState(false);

  const checkSorting = () => {
    if (nameSorting || prioritySorting || statusSorting) return true;
    return false;
  };

  const handleNameSorting = () => setNameSorting(!nameSorting);
  const handlePrioritySorting = () => setPrioritySorting(!prioritySorting);
  const handleStatusSorting = () => setStatusSorting(!statusSorting);

  return (
    <TableWrapper>
      <Wrapper>
        <TaskName sorting={nameSorting}>
          Task name
          <ArrowDownwardIcon fontSize='large' onClick={handleNameSorting} />
        </TaskName>
        <TaskPriority sorting={prioritySorting}>
          Priority
          <ArrowDownwardIcon fontSize='large' onClick={handlePrioritySorting} />
        </TaskPriority>
        <TaskStatus sorting={statusSorting}>
          Done
          <ArrowDownwardIcon fontSize='large' onClick={handleStatusSorting} />
        </TaskStatus>
      </Wrapper>
      <TasksContainer sorted={checkSorting} />
    </TableWrapper>
  );
};

export default Table;
