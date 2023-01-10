import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
import { CategoriesState } from "../recoil/categories";
import { TodosState } from "../recoil/todos";
import ToDo from "./ToDo";

const Wrapper = styled.div`
    width: calc(100%-32px);
    height: 100vh;
    padding-top: 40px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: #F4EAD5;
`;
const Form = styled.form` 
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 32px;
    select{
        background-color: #FFFBE9;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        text-align: center;
        height: 40px;
        font-size: 16px;
        border: 0px;
        outline: 1px solid #FFFBE9;
        &:focus{
            border: 0px; 
            outline: 1px solid #FFFBE9;
        }
        cursor: pointer;
    }
    input{
        background-color: #FFFBE9;
        padding: 8px;
        width: 50%;
        max-width: 400px;
        height: 40px;
        font-size: 16px;
        border: 0px; 
        outline: 1px solid #FFFBE9;
        &:focus{
            border: 0px; 
            outline: 1px solid #FFFBE9;
        }
    }
    button{
        background-color: #CCD6A6;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        text-align: center;
        width: 48px;
        height: 40px;
        font-size: 16px;
        border: 0px; 
        outline: 1px solid #CCD6A6;
        cursor: pointer;
    }
`;
const ToDoUList = styled.ul`
    margin: 16px;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    li{
        width: 90%;
        max-width: 600px;
        background-color: #FFFBE9;
        border-radius: 32px;
        margin-bottom: 16px;
        padding: 16px;
    }
    h4{
        font-size: 18px;
        margin-bottom: 16px;
    }
`;

interface IForm {
    toDo: string;
}
function ToDoList() {
    const [toDos, setToDos] = useRecoilState(TodosState);
    const [categories, setCategories] = useRecoilState(CategoriesState);
    const [category, setCategory] = useState(categories[0].text);
    useEffect(()=>{
        setCategory(categories[0].text);
    },[categories]);
    const { register, handleSubmit } = useForm<IForm>();
    const onTodo = ({ toDo }: IForm) => {
        setToDos(oldToDos => [{ "id": Date.now(), "category": category, "text": toDo }, ...oldToDos]);
    }
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }
    console.log(category);
    console.log(categories);
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onTodo)}>
                <select onChange={onChange}>
                    {categories?.map((c, index) => <option key={index} value={c.text}>{c.text}</option>)}
                </select>
                <input {...register("toDo")} />
                <button>등록</button>
            </Form>
            <ToDoUList>
                {categories?.map((category, index) => <li>
                    <h4>{category.text}</h4>
                    <div className="todos">
                        {toDos?.filter((value) => value?.category === category.text).map((toDo, index) =>
                            <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category}/>)}
                    </div>
                </li>)}
            </ToDoUList>
        </Wrapper>);
}

export default ToDoList;
