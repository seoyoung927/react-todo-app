import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CategoriesState } from "../recoil/categories";
import { IToDo, TodosState } from "../recoil/todos";

const Todo = styled.div`
    background-color: #DAE2B6;
    padding: 12px 16px;
    border-radius: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    button{
        margin-left: 4px;
        background-color: rgba(0,0,0,0);
        border: 0px;
        border-radius: 20px;;
        cursor: pointer;
        &:hover{
            background-color: rgba(200,200,200,0.5);
        }
    }
`;


function ToDo({id,text,category}:IToDo) {
    const setToDos = useSetRecoilState(TodosState); 
    const categories = useRecoilValue(CategoriesState);

    const onChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: event.currentTarget.value as any };
            return [
              ...oldToDos.slice(0, targetIndex),
              newToDo,
              ...oldToDos.slice(targetIndex + 1),
            ];
        });   
    }
    const onDelete = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            return [
              ...oldToDos.slice(0, targetIndex),
              ...oldToDos.slice(targetIndex + 1),
            ];
        });  
    }
    return (<Todo key={id} className="todo">
        {text}
        <div>
            <select onChange={onChange}>
                {categories?.map((c, index) => c.text===category ?
                <option selected key={index} value={c.text}>{c.text}</option>:
                <option key={index} value={c.text}>{c.text}</option>)}
            </select>
            <button onClick={onDelete}>삭제</button>
        </div>
    </Todo>);
}

export default ToDo;
