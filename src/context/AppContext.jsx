import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const AppContext = ({ children }) => {
  const obj = JSON.parse(localStorage.getItem("my-gk-notes"));

  const [notes, setNotes] = useState(() =>
    Object.keys(obj).length > 0 ? obj.notes : []
  );

  const [archivedNotes, setArchivedNotes] = useState(() =>
    Object.keys(obj).length > 0 ? obj.archivedNotes : []
  );

  const [trashedNotes, setTrashedNotes] = useState(() =>
    Object.keys(obj).length > 0 ? obj.trashedNotes : []
  );

  const [pinnedNotes, setPinnedNotes] = useState(() =>
    Object.keys(obj).length > 0 ? obj.pinnedNotes : []
  );

  console.log(pinnedNotes);

  useEffect(() => {
    localStorage.setItem(
      "my-gk-notes",
      JSON.stringify({ notes, archivedNotes, trashedNotes, pinnedNotes })
    );
  }, [notes, archivedNotes, trashedNotes, pinnedNotes]);

  return (
    <Context.Provider
      value={{
        notes,
        archivedNotes,
        trashedNotes,
        pinnedNotes,
        setNotes,
        setArchivedNotes,
        setTrashedNotes,
        setPinnedNotes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };
