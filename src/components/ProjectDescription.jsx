import { useState } from "react"
import "../styles/ProjectDescription.css"
import TaskCard from "./TaskCard"
export default function ProjectDescription({id, title, date, description, tasks, handleDelete, addTask}){
    const [inputTask, setInputTask] = useState("");
    const handleTaskInput = (e)=>{
        setInputTask(e.target.value);
    }

    const onAddTaskClick = (task, taskListSize, projectId) =>{
        if(inputTask.length != 0){
            addTask(task, taskListSize, projectId);
            setInputTask("");
        }
        
    }
    return(
        <div className="projectDescription">
            <div className="descriptionDiv">
                <div className="heading">
                    <h1>{title}</h1>
                    <button onClick={() => handleDelete(id)} className="deleteBtn">Delete</button>
                </div>
                
                <p>{date}</p>
                <p>{description}</p>
            </div>

            <div className="taskDiv">
                <h1>Tasks</h1>
                <div className="newTask">
                    <input type="text" value={inputTask} onChange={handleTaskInput}/>
                    <button onClick={() =>{return(onAddTaskClick(inputTask, tasks.length, id))}}>Add Task</button>
                </div>
                <div className="newTaskDiv">
                    {tasks && tasks.map((taskItem) =>{
                        return (
                            <TaskCard projectId={id} task={taskItem}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}