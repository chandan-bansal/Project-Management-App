import { useContext } from 'react'
import '../styles/SideBar.css'
import ProjectCard from './ProjectCard'
import ProjectContext from '../store/ProjectContext';
export default function SideBar({showNewProjectForm, getId}){

    const {projectList} = useContext(ProjectContext);
    function addNewProject(){
        showNewProjectForm();
        console.log("First Function");
    }

    const handleItemClick =(itemId)=>{
        console.log("First Id", itemId);
        getId(itemId);
    }
    return(
        <div className="sideBarContainer">
            <h3>YOUR PROJECTS</h3>
            <button onClick={addNewProject}>+ Add Project</button>
            {projectList && projectList.map((dataItem) =>{
                return(
            <ProjectCard title={dataItem.title} onClick={() => handleItemClick(dataItem.id)}/>
                )
            })}
        </div>
    )
}