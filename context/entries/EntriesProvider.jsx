import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";

import { entriesApi } from "../../apis";

import { useSnackbar } from "notistack";

const Entries_INITIAL_STATE = {
  entries: [],
};

export const EntriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description) => {
    const { data } = await entriesApi.post("/entries", { description });

    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async (entry) => {
    try {
      const { data } = await entriesApi.put(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });

      dispatch({ type: "[Entry] Entry-Updated", payload: data });

      enqueueSnackbar("Entry updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get("/entries");
    dispatch({ type: "[Entry] Refresh-data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
