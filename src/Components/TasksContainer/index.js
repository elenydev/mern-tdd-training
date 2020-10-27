import React, { useState, useEffect } from "react";
import OpenSocket from "socket.io-client";
import Task from "../Task";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import {
  Wrapper,
  TasksEmpty,
  Footer,
  FooterContent,
  FooterRows,
  Paragraph,
  Span,
} from "./tasksContainer.styles";

const TasksContainer = ({ sorted }) => {
  const [localTasks, setLocalTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState(5);
  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(visibleTasks);
  const ifSorted = sorted(false);
  const arrayLength = localTasks ? localTasks.length : 0;
  const [socketChange, setSocketChange] = useState(false);

  const socket = OpenSocket("https://lv-tdd.herokuapp.com/");

  const handleArrayRange = (array, sorted) => {
    if (!sorted) return array.slice(startRange - 1, endRange).sort();
    return array.slice(startRange - 1, endRange).reverse();
  };

  const incrementRange = () => {
    if (endRange >= arrayLength) return;
    setStartRange(startRange + visibleTasks);
    setEndRange(endRange + visibleTasks);
  };

  const decrementRange = () => {
    if (startRange <= 1 || startRange - visibleTasks <= 0) return;
    setStartRange(startRange - visibleTasks);
    setEndRange(endRange - visibleTasks);
  };

  const fetchData = async () => {
    const fetchUser = JSON.parse(localStorage.getItem("User"));
    const userId = fetchUser ? fetchUser.id : 0;
    try {
      const url = "https://lv-tdd.herokuapp.com/fetchtasks";
      const response = await fetch(url);
      const results = await response.json();
      const array = results;
      const userTasks = array.filter((el) => el.creatorId === userId);
      if (visibleTasks >= arrayLength ? setStartRange(1) : null);
      if (visibleTasks >= arrayLength ? setEndRange(visibleTasks) : null);
      setLocalTasks(userTasks)
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    socket.on("tasks", () => fetchData());
    
    socket.off('tasks');
  }, []);


  return (
    <>
      <Wrapper>
        {arrayLength !== 0 ? (
          handleArrayRange(localTasks, ifSorted).map((task, index) => (
            <Task task={task} key={index} />
          ))
        ) : (
          <TasksEmpty>There are no tasks</TasksEmpty>
        )}
      </Wrapper>
      <Footer>
        <FooterContent>
          <FooterRows>
            <Paragraph>Rows per page:</Paragraph>
            <Paragraph>
              <select
                onChange={(e) =>
                  setVisibleTasks(
                    parseInt(e.target.value),
                    setEndRange(parseInt(e.target.value))
                  )
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </Paragraph>
            <Paragraph>
              <Span>{startRange}</Span>
              <Span>-</Span>
              <Span>{endRange}</Span>
              <Span>of</Span>
              <Span> {arrayLength} </Span>
            </Paragraph>
            <Paragraph>
              <Span>
                <KeyboardArrowLeftIcon onClick={() => decrementRange()} />
              </Span>
              <Span>
                <KeyboardArrowRightIcon onClick={() => incrementRange()} />
              </Span>
            </Paragraph>
          </FooterRows>
        </FooterContent>
      </Footer>
    </>
  );
};

export default TasksContainer;
