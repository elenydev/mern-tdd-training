import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { defaultValues } from "../../helpers";
import Alert from "../../Components/Alert/index";

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
  const [logErr, setLogErr] = useState(false);
  const [createErr, setCreateErr] = useState(false);
  const [created, setCreated] = useState(false);

  const getUser = async (data, setErr) => {
    try {
      const response = await fetch("https://lv-tdd.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();

      if (!res.user) {
        setLogErr(true);
      } else {
        const user = {
          id: res.user[0]._id,
          email: res.user[0].email,
        };
        localStorage.setItem("User", JSON.stringify(user));
        setLogErr(false);
      }
    } catch (err) {
      console.log(err);
      setLogErr(true);
    }
  };

  const createUser = async (data) => {
    try {
      const response = await fetch("https://lv-tdd.herokuapp.com/createuser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log(res);
      if (res !== null) {
        setCreateErr(false);
        setCreated(true);
      } else {
        setCreateErr(true);
      }
    } catch (err) {
      console.log(err);
      setCreateErr(true);
    }
  };

  const login = (data, event) => {
    event.preventDefault();
    if (action !== "Login") {
      createUser(data);
    } else if (action === "Login") {
      getUser(data);
    }
    reset();
    setLogErr(false);
    setCreateErr(false);
    setCreated(false);
  };

  return (
    <>
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
      {logErr === true && (
        <Alert
          shouldOpen={true}
          message="User doesn't exist or you provided wrong email or password"
          variant="error"
        />
      )}
      {createErr === true && (
        <Alert shouldOpen={true} message='User already exist' variant="error" />
      )}
      {created === true && (
        <Alert shouldOpen={true} message='User successfully craeated!' variant="success" />
      )}
    </>
  );
};

export default Form;
