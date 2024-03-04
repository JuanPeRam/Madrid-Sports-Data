import { Rankings } from "@/components/Rankings"
import { SeasonsSelect } from "@/components/SeasonsSelect"
import { MainContent } from "@/components/sections/MainContent"
import { NavBar } from "@/components/sections/NavBar"
import { Sports } from "@/components/sections/Sports"
import { API_ENDPOINT } from "@/constants/global"
import { RankingItem } from "@/types/Rankings"
import { useEffect, useState } from "react"

export const Home = () => {

    const [season, setSeason] = useState<string>('');
    const [data, setData] = useState<RankingItem[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    const [sportsArray, setSportsArray] = useState<string[]|[]>([]);
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
    
    const handleSeasonChange = (season:string)=>{
      setSeason(season)
    }

    useEffect(()=>{
        if(season){
            setIsLoading(true)
            const endpoint = `${API_ENDPOINT}/ranking/${season.split('/')[0]}%2F${season.split('/')[1]}`
            fetch(endpoint)
                .then((res)=>res.json())
                .then((data)=>setData(data))
                .catch((error)=>console.log(error))
                .finally(()=>setIsLoading(false))
        }
    },[season])

    useEffect(()=>{
      setSportsArray(Array.from(new Set(data?.map((item) => item.Nombre_deporte))));
    }, [data])

  return (
    <div className='max-w-[1350px] w-full'>
        <NavBar />
        <SeasonsSelect apiEndPoint={`${API_ENDPOINT}/seasons`} onSeasonChange={(season)=>handleSeasonChange(season)}/>
        <Sports sports={sportsArray} onSportChanged={(sport:string)=>{handleFilterChange('Nombre_deporte',sport)}} isLoading={isLoading} sportSelected=""/>
        <div className="flex h-[70vh]">
            <aside>
            </aside>
            <div className="flex-1">
                <MainContent/>
            </div>
        </div>
    </div>
  )
}
