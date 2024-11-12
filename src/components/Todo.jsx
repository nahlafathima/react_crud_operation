import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect} from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";

export default function Todo() {
    const[input, setInput]=useState('')
    const[todoarray, setTodoarray]=useState([])
    const[editId, setEditId]=useState(0)

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const addTodo=()=>{
        if(input!==''){
        setTodoarray([...todoarray,{list:input , id:Date.now(), status:false}])
        setInput('')
        }
        if(editId){
            const editTodo=todoarray.find((todo)=>todo.id==editId)
            const updateTodo=todoarray.map((to)=>to.id===editTodo.id
            ?(to ={id : to.id , list : input})
            :(to={id : to.id, list  :to.list}))
            setTodoarray(updateTodo)
            setEditId(0)
            setInput('')
        }
    };

    const inputRef=useRef('null')

    useEffect(()=>{
        inputRef.current.focus();
    })

    const onDelete=(id)=>{
        setTodoarray(todoarray.filter((to)=>to.id!==id))
    }

    const onComplete=(id)=>{
        let complete=todoarray.map((list)=>{
            if(list.id===id){
                return({...list, status :!list.status})
            }
            return list
        })
        setTodoarray(complete)
    }

    const onEdit=(id)=>{
        const editTodo = todoarray.find((to)=>to.id === id)
        setInput(editTodo.list)
        setEditId(editTodo.id)
    }

  return (
    <div className='container'>
        <h2>Todo App</h2>
        <form className='form_group' onSubmit={handleSubmit}>
            <input type="text" value={input} ref={inputRef} placeholder='enter your todo activity' className='form_control' onChange={(event)=>setInput(event.target.value)}/>
            <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
        </form>
        <div className='list'>
            <ul>{
                todoarray.map((to) =>(
                    <li className='list_items'>
                    <div className='list_items_list' id={to.status?'list_item':''}>{to.list}</div>
                    <span>
                    <MdDoneOutline className='list_item_icons' id='complete' title='Complete'
                    onClick={()=>onComplete(to.id)}
                    />
                    <AiFillEdit className='list_item_icons' id='edit' title='Edit'
                    onClick={()=>onEdit(to.id)}
                    />
                    <MdDelete className='list_item_icons' id='delete' title='Delete'
                    onClick={()=>onDelete(to.id)}
                    />
                    
                    </span></li>
                ))
            }
            </ul>
        </div>
    </div>
  )
}
