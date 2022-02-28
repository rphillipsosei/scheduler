import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false) {
    if (replace) {
        const oldHistory = [...history];
        oldHistory[oldHistory.length - 1] = mode
        setMode(mode)
        setHistory(oldHistory)
        } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const oldHistory = [...history];
      oldHistory.pop();
      const newMode = oldHistory[oldHistory.length - 1];
      setMode(newMode);
      setHistory(oldHistory);
    }
  }

  return { mode, transition, back };
}
