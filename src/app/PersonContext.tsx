// PersonContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface PersonContextType {
  personName: string;
  setPersonName: (name: string) => void;
}

const PersonContext = createContext<PersonContextType | undefined>(undefined);

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [personName, setPersonName] = useState("");
  return (
    <PersonContext.Provider value={{ personName, setPersonName }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePerson must be used within a PersonProvider");
  }
  return context;
};
