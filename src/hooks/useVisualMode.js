import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (updatedMode, replace = false) => {
    setMode(updatedMode);
    
    if (!replace) {
      const newHistory = [...history];
      newHistory.push(updatedMode);
      setHistory(newHistory);
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      
      setMode(history[history.length - 1]);
    }
  }

  return { 
    mode,
    transition,
    back
   };
}
