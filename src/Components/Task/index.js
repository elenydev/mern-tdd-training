import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { deleteLocalTask } from "../../helpers";
import { deleteTask } from "../../features/tasks";
import { useDispatch } from "react-redux";
import {
  Wrapper,
  TaskName,
  TaskPriority,
  TaskStatus,
  TaskDelete,
} from "./task.styles";

const checkBoxStyles = (theme) => ({
  root: {
    "&$checked": {
      color: "#f8982d",
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const Task = ({ task, id }) => {
  const { name, taskPriority } = task;

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(id));
    deleteLocalTask(id);
  };

  return (
    <Wrapper checked={checked}>
      <TaskName>{name}</TaskName>
      <TaskPriority>{taskPriority}</TaskPriority>
      <TaskStatus>
        <CustomCheckbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </TaskStatus>
      <TaskDelete className='delete'>
        <DeleteIcon onClick={() => handleDelete()} />
      </TaskDelete>
    </Wrapper>
  );
};

export default Task;
