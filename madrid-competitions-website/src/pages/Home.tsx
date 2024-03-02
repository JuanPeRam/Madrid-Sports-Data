import { Rankings } from "@/components/Rankings"
import { MainContent } from "@/components/sections/MainContent"
import { NavBar } from "@/components/sections/NavBar"
import { Sports } from "@/components/sections/Sports"
import { useState } from "react"

export const Home = () => {

    const [season, setSeason] = useState<string>('');
    const [filters, setFilters] = useState({
        Nombre_deporte: '',
        Nombre_distrito: '',
        Nombre_categoria: '',
        Nombre_grupo: ''
    });

    const handleFilterChange = (filterName:string, value:string) => {
        setFilters({
          ...filters,
          [filterName]: value
        });
      };

    const handleSportChanged = (sport:string)=>{
        console.log(sport)
    }

  return (
    <div className='max-w-[1350px] w-full'>
        <NavBar />
        <Sports sports={['Futbol', 'Futbol 7']} onSportChanged={handleSportChanged}/>
        <div className="flex h-[70vh]">
            <aside>
                <Rankings/>
            </aside>
            <div className="flex-1">
                <MainContent/>
            </div>
        </div>
    </div>
  )
}
