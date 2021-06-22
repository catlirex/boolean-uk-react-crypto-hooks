import { useEffect, useState } from "react";

export default function useRefreshData( refreshCondition, APIlink, resetFunction, resetFunctionPara ){
    let [updateData, setUpdateData] = useState("")
    
    useEffect(() => {
        if (refreshCondition) {
          fetch(APIlink)
            .then((resp) => resp.json())
            .then((data) => {
              setUpdateData(data)
            });
            resetFunction(resetFunctionPara);
        }
      }, [refreshCondition, APIlink,resetFunction, resetFunctionPara]);
  
      return [updateData, setUpdateData]
  }