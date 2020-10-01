import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import { defaultValues, addLocalTask } from "../../helpers";
import { addTask } from "../../features/tasks";
import { useDispatch } from "react-redux";

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

const Form = ({ closeModal }) => {
  const { register, handleSubmit, errors, setError, control, reset } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();

  const getFormData = (data) => {
    dispatch(addTask(data));
    addLocalTask(data);
    closeModal();
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(getFormData)}>
      <label>
        <InputElement
          type='text'
          name='name'
          placeholder='Your Task'
          inputRef={register({ required: true })}
          onChange={() => {
            setError("name", {
              type: "manual",
              message: "You have to provide task",
            });
          }}
        />
      </label>
      {errors.name && errors.name.type === "required" && (
        <ErrorSpan>Please provide a task</ErrorSpan>
      )}

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
        name='taskPriority'
      />

      <Check>
        <Controller
          name='taskStatus'
          control={control}
          render={(props) => (
            <Checkbox
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          )}
        />
      </Check>

      <Button variant='contained' type='submit' color='primary'>
        Add Task
      </Button>
    </FormContainer>
  );
};

export default Form;
