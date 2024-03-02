import { useEffect, useState } from 'react'
import { SeasonsSelect } from './SeasonsSelect'
import { GenericSelect } from './GenericSelect'
import { API_ENDPOINT } from '@/constants/global'
import { RankingItem } from '@/types/Rankings'


export const Rankings = () => {
    const [season, setSeason] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [data, setData] = useState<RankingItem[]|undefined>()
    const [filteredData, setFilteredData] = useState<RankingItem[]|undefined>([]);
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

      useEffect(() => {
        // Aplica los filtros a los datos cuando cambien los filtros o los datos
        // solo si los filtros están definidos (distintos de '')
        if (Object.values(filters).some(filter => filter !== '')) {
            const filteredData = data?.filter((item:RankingItem) => {
              return Object.entries(filters).every(([key, value]) => {
                if (value !== '') {
                    // Verifica si la clave es una propiedad válida en RankingItem
                    if (key in item) {
                        // Utiliza la sintaxis de índice para acceder a la propiedad
                        return item[key as keyof RankingItem] === value;
                    } else {
                        // Si la clave no es una propiedad válida, devuelve false
                        return false;
                    }
                }
                return true;
              });
            });
            setFilteredData(filteredData);
        } else {
          // Si alguno de los filtros está vacío, muestra todos los datos sin filtrar
          setFilteredData(data);
        }
      }, [data, filters]);

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
        setFilteredData(data)
    }, [data])
  return (
    <>
        <SeasonsSelect apiEndPoint='http://localhost:3000/seasons' onSeasonChange={(season)=>setSeason(season)}/>

        {
            filteredData &&
            <>
                <GenericSelect values={Array.from(new Set(data?.map((item) => item.Nombre_deporte)))} placeHolder='Deporte' onValueChange={(value)=>handleFilterChange('Nombre_deporte',value)} isLoading={isLoading}></GenericSelect>
                <GenericSelect values={Array.from(new Set(filteredData.map((item) => item.Nombre_distrito)))} placeHolder='Distrito' onValueChange={(value)=>handleFilterChange('Nombre_distrito',value)} isLoading={isLoading}></GenericSelect>
                <GenericSelect values={Array.from(new Set(filteredData.map((item) => item.Nombre_categoria)))} placeHolder='Categoría' onValueChange={(value)=>handleFilterChange('Nombre_categoria',value)} isLoading={isLoading}></GenericSelect>
                <GenericSelect values={Array.from(new Set(filteredData.map((item) => item.Nombre_grupo)))} placeHolder='Grupo' onValueChange={(value)=>handleFilterChange('Nombre_grupo',value)} isLoading={isLoading}></GenericSelect>

                {Object.values(filters).every(filter => filter !== '') && 
                    (
                        <>
                        <table>
                            <thead>
                                <tr>
                                    <td>Pos</td>
                                    <td>Equipo</td>
                                    <td>Puntos</td>
                                    <td>Tantos a favor</td>
                                    <td>Tantos en contra</td>
                                    <td>Jugados</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.sort((a,b)=>parseInt(a.Posicion) - parseInt(b.Posicion)).map((item)=>(
                                 <tr key={item.Codigo_equipo}>
                                    <td className='p-2'>{item.Posicion}</td>
                                    <td className='p-2'>{item.Nombre_equipo}</td>
                                    <td className='p-2'>{Number(item.Puntos)}</td>
                                    <td className='p-2'>{item.Goles_favor}</td>
                                    <td>{item.Goles_contra}</td>
                                    <td>{item.Partidos_jugados}</td>
                                 </tr>   
                                ))}
                            </tbody>
                        </table>
                        </>
                    )
                }
            </>
        }
    </>
  )
}
