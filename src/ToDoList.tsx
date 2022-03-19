import React from 'react';
import {useForm} from 'react-hook-form';
import {isJsxOpeningElement} from 'typescript';

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        {message: 'Password is not matched'},
        {shouldFocus: true},
      );
    }
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
              message: 'Only gmail.com emails allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', {
            required: 'First name is required',
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register('lastName', {
            required: 'Last name is required',
          })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register('username', {
            required: 'User name is required',
            minLength: {
              value: 5,
              message: 'User name should be longer than 5 chars',
            },
            validate: value =>
              value.includes('jong') ? "jong can't be used" : true,
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short.',
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short.',
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
