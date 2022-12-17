import { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlined";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const {isAddingEntry , setIsAddingEntry} = useContext(UIContext)

  const onTextFieldChanges = (e) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (!inputValue.length) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setIsTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={inputValue.length <= 0 && isTouched && "Insert a value"}
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={onTextFieldChanges}
            onBlur={() => setIsTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
