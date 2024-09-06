import "../styles/TaskCard.css"
import ProjectContext from "../store/ProjectContext"
import { useContext } from 'react';
const TaskCard= ({projectId, task})=>{
    const {clearTaskFromProject} = useContext(ProjectContext);
    const handleClearClick = (proId, task) =>{
        clearTaskFromProject(proId, task)
    }
    return(
        <div className="taskCard">
            <p>{task.task}</p>
            <button className="clearbtn" onClick = {() =>{handleClearClick(projectId, task)}}>Clear</button>
        </div>
    )
}

export default TaskCard;