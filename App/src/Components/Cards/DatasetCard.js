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

export default function DatasetCard({ title }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, fontWeight: "bold", mb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
