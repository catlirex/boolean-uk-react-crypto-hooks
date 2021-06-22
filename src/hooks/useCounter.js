import { useEffect, useState } from "react";


export default function useCounter(initialValue, countingRule, intervalTime, initialRun = true){

    const [counterRun, setCounterRun] = useState(initialRun);
    const [counter, setCounter] = useState(initialValue);
  
      useEffect(() => {
        const interval =
        counterRun &&
          setInterval(() => {
            setCounter((count) => count + countingRule);
          }, intervalTime);
  
        return () => clearInterval(interval);
      }, [setCounter, counterRun]);
  
    return [counter, setCounter, counterRun, setCounterRun]
  }