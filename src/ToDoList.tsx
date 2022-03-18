import React, {useState} from 'react';
import {useForm} from "react-hook-form"

function ToDoList(){
   const {register, watch} = useForm();
   console.log(watch())

    return(
        <div>
            <form>
                <input {...register("email")} type="text" placeholder='email'/>
                <input {...register("name")} type="text" placeholder='name'/>
                <input {...register("password")} type="text" placeholder='password'/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default ToDoList;