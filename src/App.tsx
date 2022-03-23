import {useEffect} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {toDoState} from './atoms';
import Board from './Components/Board';
import RemoveBoard from './Components/RemoveBoard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 36px;
`;

const Description = styled.span`
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: cetner;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  useEffect(() => {
    // localStorage load
    const loadedToDos = localStorage.getItem('boards');
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      setToDos(parsedToDos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const {destination, source} = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        // 3) save in localstorate
        localStorage.setItem(
          'boards',
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          }),
        );
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId === 'Remove') {
      // remove item
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        // localStorage save
        localStorage.setItem(
          'boards',
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
          }),
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        localStorage.setItem(
          'boards',
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination?.droppableId]: destinationBoard,
          }),
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>To-Do App</Title>
        <Description>
          Use this template to keep track of everyday, granular to-do items.
        </Description>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
          <RemoveBoard boardId={'Remove'} />
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}

export default App;
