
import "./App.css";
import { useEffect, useState } from "react";
import {Task} from "./Task"
function App() {
  
  const [todoList,setTodoList]=useState(()=>{
    const saved=localStorage.getItem('List')
    const savedvalues=JSON.parse(saved)
    return savedvalues
  })
  const [newTask,setNewTask]=useState('')
  const handleChange=(e)=>{
    setNewTask(e.target.value)
    
  }
  
  
  
  // useEffect(()=>{
  //   const data=window.localStorage.getItem('List')
  //   if (data!==null)
  //    setTodoList(JSON.parse(data))
  //  },[])
  useEffect(()=>{
    window.localStorage.setItem('List',JSON.stringify(todoList))
  },[todoList])

  useEffect(()=>{
    const data=window.localStorage.getItem('List')
    if (data!==null)
     setTodoList(JSON.parse(data))
     
   },[])
  const addTask =() => {
    const task = {
      id: todoList.length === 0? 1 : todoList[todoList.length - 1].id +1,
      taskName: newTask,
      completed: false,
    };
    setTodoList ([...todoList,task]);
};
const deleteTask =(id) => {
  setTodoList(todoList.filter((task) => task.id !== id));
};
const completeTask =(id) => {
  setTodoList(
    todoList.map((task)=>  {
      if (task.id === id){
        return { ...task,completed:true};
      } else {
        return task;
      }
    })
  )
}
return (
  <div className ="App">
    <div className ="addTask">
      <input onChange = {handleChange} />
      <button onClick ={addTask}>Add Task</button>
      </div>
    <div className ="list">
      {todoList.map((task) => {
        return (
        <Task
        taskName ={task.taskName}
        id ={task.id}
        completed = {task.completed}
        deleteTask ={deleteTask}
        completeTask ={completeTask}
        />
        );
      })}
    </div>
  </div>
);
    };
export default App;