import {createContext} from 'react'

const ProjectContext = createContext({
    projectList:[],
    addToProjectList:()=>{},
    addTasktoProject: ()=>{},
    clearTaskFromProject: ()=>{}
})

export default ProjectContext;