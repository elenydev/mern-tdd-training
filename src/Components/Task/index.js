import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "./../EditForm/modal";
import { deleteLocalTask, toggleDone } from "../../helpers";
import {
  Wrapper,
  TaskName,
  TaskPriority,
  TaskStatus,
  TaskAction,
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

const Task = ({ task }) => {
  const { _id, content, prio, status } = task;

  const [checked, setChecked] = useState(status);
  const handleDelete = () => {
    deleteLocalTask(_id);
  };

  return (
    <>
      <Wrapper checked={checked}>
        <TaskName>{content}</TaskName>
        <TaskPriority>{prio}</TaskPriority>
        <TaskStatus>
          <CustomCheckbox
            checked={status}
            onChange={() => setChecked(!checked)}
            onClick={() => toggleDone(_id)}
          />
        </TaskStatus>
        <TaskAction className='action'>
          <Modal task={task}   />
        </TaskAction>
        <TaskAction className='action'>
          <DeleteIcon onClick={handleDelete} />
        </TaskAction>
      </Wrapper>
    </>
  );
};

export default Task;
