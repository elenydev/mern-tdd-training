import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { defaultValues, createUser, getUser } from "../../helpers";

const FormContainer = styled.form`
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .MuiInputBase-root{
    font-size: ${({theme}) => theme.font.size.xs}
  }

  ${({ theme }) => theme.mq.md} {
    width: 60%;
    height: 60%;
  }
`;

const InputElement = styled(Input)`
  padding: 3px;
  margin: 8px 0;
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.font.size.xxs};
`;


const ButtonsBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;

  & > button{
    margin: 5px;
  }
`;

const Form = ({ closeModal }) => {
  const { register, handleSubmit, errors, setError, reset } = useForm({
    defaultValues,
  });

  const [action, setAction] = useState("Login");

  const login = (data, event) => {
    event.preventDefault();
    if (action !== "Login") {
      createUser(data);
    } else if (action === "Login") {
      getUser(data);
    }
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(login)}>
      <label>
        <InputElement
          type='text'
          name='email'
          placeholder='Enter email'
          inputRef={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          onChange={() => {
            setError("email", {
              type: "manual",
              message: "You have to provide task",
            });
          }}
        />
      </label>
      {errors.email && errors.email.type === "required" && (
        <ErrorSpan>Please provide a email</ErrorSpan>
      )}
      <label>
        <InputElement
          type='password'
          name='password'
          placeholder='Enter Password'
          inputRef={register({ required: true })}
          onChange={() => {
            setError("password", {
              type: "manual",
              message: "You have to provide a password",
            });
          }}
        />
      </label>
      {errors.password && errors.password.type === "required" && (
        <ErrorSpan>Please provide a password</ErrorSpan>
      )}
      <ButtonsBox>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          onClick={() => setAction("Login")}
        >
          Login
        </Button>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          onClick={() => setAction("SignUp")}
        >
          Sign up
        </Button>
      </ButtonsBox>
    </FormContainer>
  );
};

export default Form;
