import React from 'react';
import {useRecoilValue} from 'recoil';
import {toDoState} from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }

// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//     setError,
//   } = useForm<IForm>();
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       setError(
//         'password1',
//         {message: 'Password is not matched'},
//         {shouldFocus: true},
//       );
//     }
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register('email', {
//             required: 'Email is required',
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
//               message: 'Only gmail.com emails allowed',
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register('firstName', {
//             required: 'First name is required',
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>

//         <input
//           {...register('lastName', {
//             required: 'Last name is required',
//           })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>

//         <input
//           {...register('username', {
//             required: 'User name is required',
//             minLength: {
//               value: 5,
//               message: 'User name should be longer than 5 chars',
//             },
//             validate: value =>
//               value.includes('jong') ? "jong can't be used" : true,
//           })}
//           placeholder="Username"
//         />
//         <span>{errors?.username?.message}</span>

//         <input
//           {...register('password', {
//             required: 'Password is required',
//             minLength: {
//               value: 5,
//               message: 'Your password is too short.',
//             },
//           })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>

//         <input
//           {...register('password1', {
//             required: 'Password is required',
//             minLength: {
//               value: 5,
//               message: 'Your password is too short.',
//             },
//           })}
//           placeholder="Password1"
//         />
//         <span>{errors?.password1?.message}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }
