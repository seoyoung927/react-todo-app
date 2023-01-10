import React, { useState } from "react";
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
    input{
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
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
        display: flex;
        justify-content: space-between;
    }
    h4{
        font-size: 18px;
    }
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

interface IForm {
    text: string;
}
function CategoryList() {
    const [categories, setCategories] = useRecoilState(CategoriesState);

    const { register, handleSubmit } = useForm<IForm>();
    const onCategory = ({ text }: IForm) => {
        setCategories(prev => [{id:Date.now(), "text":text}, ...prev]);
    }
    const onDelete = (id:number) => {
        setCategories((old) => {
            const targetIndex = old.findIndex((category) => category.id === id);
            return [
              ...old.slice(0, targetIndex),
              ...old.slice(targetIndex + 1),
            ];
        });  
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onCategory)}>
                <input {...register("text")} />
                <button>등록</button>
            </Form>
            <ToDoUList>
                {categories?.map((category, index) => <li key={index}>
                    <h4>{category.text}</h4>
                    <button onClick={()=>onDelete(category.id)}>삭제</button>
                </li>)}
            </ToDoUList>
        </Wrapper>);
}

export default CategoryList;
