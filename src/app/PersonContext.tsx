// PersonContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PersonContextType {
  personId: string;
  setPersonId: (id: string) => void;
}

const PersonContext = createContext<PersonContextType | undefined>(undefined);

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [personId, setPersonId] = useState("");
  return (
    <PersonContext.Provider
      value={{ personId: personId, setPersonId: setPersonId }}
    >
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
