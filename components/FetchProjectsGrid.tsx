import { useState, useEffect } from "react"
import ProjectsGrid from "./ProjectsGrid"

const API_URL = "http://localhost:4000/projects"

export default function FetchProjectsGrid({ styles }: { styles: any }) {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(async data => {
        const projectsRaw = data.projects || [];
        // Para cada proyecto, obtener la imagen principal desde la API
        const projectsWithImage = await Promise.all(projectsRaw.map(async (project: any) => {
          try {
            const resImg = await fetch(`http://localhost:4000/projects/${project.id}/images`);
            const imgs = await resImg.json();
            return { ...project, imagenPrincipal: imgs.imagenPrincipal };
          } catch {
            return { ...project, imagenPrincipal: '/placeholder.jpg' };
          }
        }));
        setProjects(projectsWithImage);
      })
  }, [])

  return <ProjectsGrid allProjects={projects} styles={styles} />
}
