import React from "react";
import { ReactDOM } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function DatasetCard({ title }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
          color="text.secondary"
          gutterBottom
        >
          {title}
          <MoreVertIcon />
        </Typography>

        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            gap: 1,
          }}
          color="text.secondary"
          gutterBottom
        >
          <InsertDriveFileIcon />
          Name Datasets
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button size="small" variant="contrast">
          Make model
        </Button>
      </CardActions>
    </Card>
  );
}
