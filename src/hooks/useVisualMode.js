import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //transitions between modes
  function transition(mode, replace) {
    if (replace) {
      //if replace, the last item in the history becomes the mode
      const oldHistory = [...history];
      oldHistory[oldHistory.length - 1] = mode;
      setMode(mode);
      setHistory((prev) => [...prev, mode]);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }
  //if a history exists, the final item in the history is removed and the mode is set to the new final item
  function back() {
    if (history.length > 1) {
      const oldHistory = [...history];
      oldHistory.pop();
      const newMode = oldHistory[oldHistory.length - 1];
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  }

  return { mode, transition, back };
}
