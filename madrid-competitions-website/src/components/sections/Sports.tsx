import { useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface SportsProps {
  sports:string[]|undefined
  onSportChanged: (sport:string)=>void
  isLoading:boolean
  sportSelected:string
}

const sportsShown = 8;


export const Sports:React.FC<SportsProps> = ({sports, onSportChanged,isLoading,sportSelected}) => {
  const [selectedSport, setSelectedSport] = useState(sportSelected ?? '');
  const shownSports = sports?.slice(0,sportsShown)
  const hiddenSports = sports?.slice(sportsShown)
  return (
    <section className="flex gap-4 p-5 bg-border">
      {
        sports && !isLoading &&
        <section className="flex gap-5 text-center w-full justify-center items-center flex-wrap">
          {
            shownSports?.map((sport:string)=>(
              <div className={`cursor-pointer hover:bg-primary/20 flex items-center justify-center p-3 ${selectedSport===sport ? 'bg-primary/40':''}`} onClick={()=>{onSportChanged(sport);setSelectedSport(sport)}} key={sport}>{sport}</div>
            ))
          }
          <Popover>
            <PopoverTrigger>Ver más</PopoverTrigger>
            <PopoverContent className="flex flex-wrap justify-center items-center gap-2">
                {
                  hiddenSports?.map((sport:string)=>(
                    <div key={sport} className="cursor-pointer hover:bg-primary/20 flex items-center justify-center p-2">
                      {sport}
                    </div>
                  ))
                }
            </PopoverContent>
          </Popover>
          
        </section>
        
      }
      {
        !sports &&
        <div className="flex h-full w-full">
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
          <Skeleton className="w-10 h-full rounded-sm"></Skeleton>
        </div>
      }
    </section>
  )
}
