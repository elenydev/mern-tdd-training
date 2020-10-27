import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { editTask } from "../../helpers";

const FormContainer = styled.form`
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.lightGray};

  ${({ theme }) => theme.mq.md} {
    width: 40%;
  }
`;

const InputElement = styled(Input)`
  padding: 3px;
  margin: 8px 0;
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const SelectElement = styled(Select)`
  margin: 20px 0px;
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.font.size.xxs};
`;

const Check = styled.div`
  display: none;
`;

const Form = ({ closeModal, data }) => {
  const { _id, content, prio, status } = data;

  const defaultValues = {
    content: content,
    status: `${status}`,
    prio: prio,
  };

  const { register, handleSubmit, errors, setError, control, reset } = useForm({
    defaultValues,
  });

  const handleEdit = (data, event) => {
    event.preventDefault();
    const creatorId = JSON.parse(localStorage.getItem("User")).id;
    editTask(data, creatorId, _id);
    closeModal();
    reset();
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(handleEdit)}>
        <label>
          <InputElement
            type='text'
            name='content'
            placeholder='Your Task'
            inputRef={register({ required: true })}
            onChange={() => {
              setError("content", {
                type: "manual",
                message: "You have to provide task",
              });
            }}
          />
        </label>
        {errors.content && errors.content.type === "required" && (
          <ErrorSpan>Please provide a task</ErrorSpan>
        )}
        <Check>
          <label>
            <input
              type='checkbox'
              id='status'
              name='status'
              value={status}
              ref={register({ required: true })}
            />
          </label>
        </Check>

        <label htmlFor='taskPriority'>Task Priority:</label>
        <Controller
          as={
            <SelectElement id='taskPriority'>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </SelectElement>
          }
          control={control}
          name='prio'
        />
        <Button variant='contained' type='submit' color='primary'>
          Edit Task
        </Button>
      </FormContainer>
    </>
  );
};

export default Form;
