import { useState, useEffect } from "react"
import ProjectsGrid from "./ProjectsGrid"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"

export default function FetchProjectsGrid({ styles }: { styles: any }) {
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(async data => {
        const projectsRaw = data.projects || [];
        const categoriesRaw = data.categories || [];
        setCategories(categoriesRaw);
        // Para cada proyecto, obtener la imagen principal desde la API
        const projectsWithImage = await Promise.all(projectsRaw.map(async (project: any) => {
          try {
            const resImg = await fetch(`${API_URL}/projects/${project.id}/images`);
            const imgs = await resImg.json();
            return { ...project, imagenPrincipal: imgs.imagenPrincipal };
          } catch {
            return { ...project, imagenPrincipal: '/placeholder.jpg' };
          }
        }));
        setProjects(projectsWithImage);
      })
  }, [])

  return <ProjectsGrid allProjects={projects} styles={styles} categories={categories} />
}
