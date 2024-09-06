import "../styles/ProjectCard.css"
export default function ProjectCard({title, onClick}){
    return(
        <div>
            <button className="projectCard" onClick={onClick}>{title}</button>
        </div>
    )
}