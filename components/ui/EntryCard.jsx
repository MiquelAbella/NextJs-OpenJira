import { useRouter } from "next/router";
import React, { useContext } from "react";

import { UIContext } from "../../context/ui";
import { dateFunctions } from "../../utils";

import { Card, CardActionArea, CardActions, Typography } from "@mui/material";

export const EntryCard = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (e) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = (e) => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1, padding: "5px" }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {entry.description}
        </Typography>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
