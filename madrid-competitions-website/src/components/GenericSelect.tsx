import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";

const componentWidth = 'w-[140px]'

interface GenericSelectProps {
    onValueChange: (value: string) => void;
    values: string[];
    placeHolder: string;
    isLoading: boolean
}

export const GenericSelect: React.FC<GenericSelectProps> = ({ onValueChange, values, placeHolder,isLoading }) => {
    //const loading = true
    const handleValueChanged = (value:string)=>{
        onValueChange(value)
    }
  return (
    <>
        {
            isLoading && 
            <Skeleton className={`${componentWidth} h-10 rounded-sm`}/>
        }
        {
            values && !isLoading &&
            <Select onValueChange={handleValueChanged}>
                <SelectTrigger className={`${componentWidth}`}>
                    <SelectValue placeholder={placeHolder}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {values.map((value:string)=>(
                            value && 
                            <SelectItem value={value} key={value}>
                                {value}
                            </SelectItem>
                            
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        }
    </>
  )
}
