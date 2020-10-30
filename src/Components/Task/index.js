import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "./../EditForm/modal";
import { toggleDone } from "../../helpers";
import {
  Wrapper,
  TaskName,
  TaskPriority,
  TaskStatus,
  TaskAction,
} from "./task.styles";
import Alert from "../Alert/index";

const checkBoxStyles = (theme) => ({
  root: {
    "&$checked": {
      color: "#f8982d",
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const Task = ({ task, setVariant,setMessage }) => {
  const { _id, content, prio, status } = task;
  
  const deleteLocalTask = async (id) => {
    const data = {
      id,
    };
    try {
      const response = await fetch("https://lv-tdd.herokuapp.com/deletetask", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log(res.message);
      setVariant("success");
      setMessage(res.message);
    } catch (err) {
      setVariant("erro");
      setMessage("Something went wrong, try again");
    }
  };

  const [checked, setChecked] = useState(status);
  const handleDelete = () => {
    deleteLocalTask(_id);
    setVariant("");
    setMessage(null);
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
          <Modal task={task} />
        </TaskAction>
        <TaskAction className='action'>
          <DeleteIcon onClick={handleDelete} />
        </TaskAction>
      </Wrapper>
      
    </>
  );
};

export default Task;
