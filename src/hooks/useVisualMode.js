import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  //transitions between modes
  function transition(mode, replace) {
    if (replace) {
      //if replace, the last item in the history becomes the mode
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = mode;
        return newHistory;
      });
    } else {
      setHistory([...history, mode]);
    }
  }
  //if a history exists, the final item in the history is removed and the mode is set to the new final item
  function back() {
    console.log("TESTING")
    if (history.length > 1) {
      console.log("TESTING2")
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      });
    }
  }

  return { mode:history[history.length - 1], transition, back };
}
