interface SportsProps {
  sports:string[]
  onSportChanged: (sport:string)=>void
}

export const Sports:React.FC<SportsProps> = ({sports, onSportChanged}) => {
  return (
    <section className="flex gap-4 p-5">
      {
        sports && 
        sports.map((sport)=>(
          <button onClick={()=>onSportChanged(sport)}>{sport}</button>
        ))
      }
    </section>
  )
}
