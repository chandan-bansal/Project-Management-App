import { useState, useContext } from 'react';
import img from '../assets/no-projects.png'
import '../styles/ViewScreen.css'
import ProjectDescription from './ProjectDescription';
import ProjectContext from '../store/ProjectContext';

export default function ViewScreen({visibility, selectedId, showNewProjectForm, showEmptyScreen, showProjectScreen, deleteAction}){
    const [projectObject, setProjectObject] = useState({id:"",title:"", description:"", date:"", tasks:[]});
    const {projectList, addToProjectList, addTasktoProject} = useContext(ProjectContext)
    let index = 0;
    const createNewProject = ()=>{
        showNewProjectForm();
    }

    const handleCancel = () =>{
        showEmptyScreen();
        setProjectObject({id:"", title:"", description:"", date:"", tasks:[]});
    }

    const handleSubmit = ()=>{
        if(projectObject.title.length !=0 && projectObject.description.length && projectObject.date.length)
        {
            let ItemId = 0;
            if(projectList.length > 0){
                ItemId = parseInt(projectList[0].id) + 1;
            }

            const proObj = {...projectObject, id:ItemId.toString(), tasks:[]};
            console.log("Object", proObj)
            //To make task array empty for each new project
            console.log("ProObj", proObj);
            addToProjectList(proObj);
            setProjectObject({id:"", title:"", description:"", date:"", tasks:[]});
            showProjectScreen();
        }
    }

    const addTask = (task, taskListsize, id) =>{
            let taskId = 0;
            if(taskListsize > 0){
                taskId = taskListsize + 1;
            }
            addTasktoProject(id, {"id": taskId.toString(),"task": task});
    }
    const setValues = (key, value) =>{
        setProjectObject((prevObj)=>{
            return {...prevObj, [key]:value}
        })
    }
    
    if(selectedId === null){
        index = 0;
    }
    else{
        for(let i=0; i<projectList.length; i++){
            if(projectList[i].id === selectedId){
                index = i;
                break;
            }
        }
    }
    return(
        <>
        {visibility.EmptyScreen && <div className="newProjectContainer">
            <img src={img} className='noImg'/>
            <p>Select a project or get started with new one</p>
            <button onClick={createNewProject}>Create New Project</button>
        </div>}

        {visibility.NewProjectForm &&<div className="newProjectInputContainer">
                <div className="buttonDiv">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="formDiv">
                    <label htmlFor='titleInput'>TITLE</label>
                    <input type="text" id='titleInput' className="inputText" onChange={(e) => {setValues("title", e.target.value)}}/>
                    <label htmlFor='descriptionInput'>DESCRIPTION</label>
                    <textarea type="text" id='descriptionInput' className="inputText" onChange={(e) => {setValues("description", e.target.value)}}/>
                    <label htmlFor='dateInput'>DUE DATE</label>
                    <input type="text" id='dateInput' className="inputText" onChange={(e) => {setValues("date", e.target.value)}}/>

                </div>
        </div>}
        {visibility.ProjectScreen && <div className="selectedProjectDiv">
            {projectList.length>0 && <ProjectDescription id = {projectList[index].id} title={projectList[index].title} description={projectList[index].description} date={projectList[index].date} tasks={projectList[index].tasks} handleDelete={deleteAction} addTask={addTask}/>}
        </div>}
        </>
    )
}