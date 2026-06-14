import { useMemo, useState } from "react";
import Child from "./child";

const Parent = () => {
  const [temp, setTemp] = useState("this is parent render 0"); 

  const value = useMemo(() => {
    return temp;
  }, []);

  return <>
   <div>{value}</div>
   <div><Child temp={temp} setTemp={setTemp} /></div>
  
  </>
}
export default Parent;