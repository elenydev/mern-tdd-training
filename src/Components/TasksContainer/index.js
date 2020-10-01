import React, { useState, useEffect } from "react";
import { fetchTasks } from "../../helpers";
import { useSelector } from "react-redux";
import { tasks } from "../../features/tasks";
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
  const [localTasks, setLocalTasks] = useState(fetchTasks);
  const currentTasks = useSelector(tasks);
  const [visibleTasks, setVisibleTasks] = useState(5);
  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(visibleTasks);
  const ifSorted = sorted();
  const arrayLength = localTasks ? localTasks.length : 0;

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

  useEffect(() => {
    setLocalTasks(fetchTasks);
    if (visibleTasks >= arrayLength ? setStartRange(1) : null);
  }, [currentTasks, visibleTasks, arrayLength]);

  return (
    <>
      <Wrapper>
        {arrayLength !== 0 ? (
          handleArrayRange(localTasks, ifSorted).map((task, index) => (
            <Task task={task} id={index} key={index} />
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
