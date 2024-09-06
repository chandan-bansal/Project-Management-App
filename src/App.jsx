import { useRef, useState } from 'react';
import SideBar from './components/SideBar';
import ViewScreen from './components/ViewScreen';
import ProjectContext from './store/ProjectContext';
import './styles/App.css'
function App() {
  const [projectObjectList, setProjectObjectList] = useState([])
  const [visibilityObject, setVisibilityObject] = useState({"EmptyScreen": true, "NewProjectForm":false, "ProjectScreen": false});
  const [clickedItemId, setClickedItemId] = useState(null);
  
  const getData = (obj) =>{
    setProjectObjectList((prevObjList) => {
      const updatedObj = [obj, ...prevObjList];
      console.log("Updated Object", updatedObj)
      return updatedObj;
    })

  }
  const addTasktoProject = (id, task) =>{
    const newList = [];
    for(let i=0; i<projectObjectList.length; i++){
      if(projectObjectList[i].id === id){
        const newTaskList = projectObjectList[i].tasks;
        newTaskList.push(task);
        const newProjectObject = {...projectObjectList[i], tasks: newTaskList};
        newList.push(newProjectObject);
      }
      else{
        newList.push(projectObjectList[i]);
      }
    }

    setProjectObjectList(newList);
  }

  const clearTaskFromProject = (projectId, task) =>{
    const newList = [];
    for(let i=0; i<projectObjectList.length; i++){
      if(projectObjectList[i].id === projectId){
        const newProjectTaskList = [];
        for(let j=0; j<projectObjectList[i].tasks.length; j++){
          
          if(projectObjectList[i].tasks[j].id === task.id){
            continue;
          }
          else{
            newProjectTaskList.push(projectObjectList[i].tasks[j])
          }
        }
        const newProjectObject = {...projectObjectList[i], tasks: newProjectTaskList};
        newList.push(newProjectObject);
      }
      else{
        newList.push(projectObjectList[i]);
      }
    }

    setProjectObjectList(newList);
  }

  const deleteProject = (id) =>{
    let objList = [];
    for(let i=0; i<projectObjectList.length; i++){
      if(id !== projectObjectList[i].id){
        objList.push(projectObjectList[i]);
      }
    }
    setProjectObjectList(objList);
  }
  const showNewProjectForm = ()=>{
    setVisibilityObject((prevObj)=>{
      return {...prevObj, "ProjectScreen": false, "EmptyScreen": false, "NewProjectForm": true};
    })
  }

  const showEmptyScreen=()=>{
    setVisibilityObject((prevObj)=>{
      return {...prevObj, "ProjectScreen": false, "EmptyScreen": true, "NewProjectForm": false};
    })
  }

  const showProjectScreen = () =>{
    setVisibilityObject((prevObj)=>{
      return {...prevObj, "ProjectScreen": true, "EmptyScreen": false, "NewProjectForm": false};
    })
  }

  const getId = (id) =>{
    console.log("Second mile", id)
    setClickedItemId(id);
    showProjectScreen();
  }
   
  const ctxValue = {
    projectList: projectObjectList,
    addToProjectList: getData,
    addTasktoProject: addTasktoProject,
    clearTaskFromProject: clearTaskFromProject
  }
  return (
    <ProjectContext.Provider value={ctxValue}>
      <div className="mainContainer">
        <div className="childContainer">

          <div className="firstChild">
            <SideBar
              showNewProjectForm={showNewProjectForm} 
              showEmptyScreen={showEmptyScreen}
              showProjectScreen={showProjectScreen}
              getId={getId}
            />
          </div>

          <div className="secondChild">
            <ViewScreen   
              visibility={visibilityObject} 
              dataList={projectObjectList}
              selectedId={clickedItemId}
              showEmptyScreen={showEmptyScreen}
              showProjectScreen={showProjectScreen}
              showNewProjectForm={showNewProjectForm}
              deleteAction = {deleteProject}
              />
          </div>
        </div>
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
