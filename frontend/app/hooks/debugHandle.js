import { useState } from "react";

export function useDebugHandle() {
  const [Checking, setChecking] = useState(false);

  if (Checking) {
    console.log("Checking: True");
  } else {
    console.log("Checking: False");
  }

  return {
    Checking,
    setChecking,
  };
}
