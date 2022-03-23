import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {ITodo} from '../atoms';

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 150px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  min-height: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  background-color: ${props =>
    props.isDraggingOver
      ? '#8b6262'
      : props.isDraggingFromThis
      ? '#bdc3c7'
      : '#c8d6e5'};
  transition: background-color 0.2s ease-in-out;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  flex-grow: 1;
  padding: 20px;
`;

interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
}

function RemoveBoard({boardId}: IBoardProps) {
  return (
    <Wrapper>
      <Title>Bin</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            🗑
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default RemoveBoard;
