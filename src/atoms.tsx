import {atom} from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': [
      {
        id: 1,
        text: 'Add To Do',
      },
    ],
    'In Progress': [
      {
        id: 2,
        text: 'Try to drag me',
      },
    ],
    Completed: [
      {
        id: 3,
        text: 'Drag me to the bin',
      },
    ],
  },
});
