import { useJournalEntriesContext } from "@/contexts/JournalEntriesContext";
import { Box, Skeleton } from "@mui/material";
import React from "react";

import JournalItem from "./JournalItem";

const JournalList = () => {
  const { rows, isLoading } = useJournalEntriesContext();

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={300}
          sx={{ borderRadius: 2 }}
        />
      ) : (
        <Box>
          {rows?.map((row) => (
            <Box key={row._id} sx={{ display: "flex", gap: 2 }}>
              <JournalItem row={row} />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default JournalList;
