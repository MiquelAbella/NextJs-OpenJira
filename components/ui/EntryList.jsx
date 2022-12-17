import { List, Paper } from "@mui/material";
import { useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

export const EntryList = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (e) => {
    const id = e.dataTransfer.getData("text");

    const entry = entries.find((entry) => entry._id === id);
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          minHeight: "calc(100vh - 180px)",
          padding: "5px 5px",
          backgroundColor: "transparent",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
