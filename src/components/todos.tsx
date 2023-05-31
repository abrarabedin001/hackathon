import { type } from "os";
import { any } from "zod";

type Props = {
    list:any
}
const todos = ({list}:Props)=>{



    return (<>
        
         {list?.map((el) => (
        <div key={el.id}> {el.todo} </div>
      ))}
    </>)
}

export default todos;