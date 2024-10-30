import React, { useContext, createContext, useState } from "react";


// Define the shape of the context value
interface CVContextType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with the defined type
const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <CVContext.Provider value={{ isOpened, setIsOpened}}>
      {children}
    </CVContext.Provider>
  )
}

// Create a custom hook to use the context
export const useCVContext = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCVContext must be used within a CVProvider");
  }
  return context;
};