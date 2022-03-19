import React from 'react';
import {useSetRecoilState} from 'recoil';
import {IToDo, toDoState} from '../atoms';

function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name},
    } = event;
    console.log('name', name);
  };

  return (
    <li>
      <span>{text}</span>
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'In_Progress' && (
        <button name="In_Progress" onClick={onClick}>
          In Progress
        </button>
      )}
      {category !== 'Completed' && (
        <button name="Completed" onClick={onClick}>
          Completed
        </button>
      )}
    </li>
  );
}

export default ToDo;
