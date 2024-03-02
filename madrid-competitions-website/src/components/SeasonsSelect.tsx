import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

const componentWidth = 'w-[140px]'

interface SeasonsSelectProps {
    onSeasonChange: (season: string) => void;
    apiEndPoint: string
}

export const SeasonsSelect: React.FC<SeasonsSelectProps> = ({ onSeasonChange,apiEndPoint }) => {
    const [seasons, setSeasons] = useState<string[]>([]);
    const [error,setError] = useState<string | undefined>();
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true)
        fetch(apiEndPoint).then((res)=>res.json()).then((data)=>{setSeasons(data)}).catch(err=>setError(err)).finally(()=>setLoading(false))
    },[])

    useEffect(()=>{
        if(seasons) onSeasonChange(seasons[0])
    }, [seasons])
  return (
    <>
        {
            loading && 
            <Skeleton className={`${componentWidth} h-10 rounded-sm`}/>
        }
        {
            !loading && seasons &&
            <Select onValueChange={onSeasonChange} defaultValue={seasons[0]}>
                <SelectTrigger className={`${componentWidth}`}>
                    <SelectValue placeholder='Temporada'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {seasons.map((season:any)=>(
                            <SelectItem value={season} key={season}>
                                {season}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        }
        {
            !loading && error && <div>Error...</div>
        }
    </>
  )
}
