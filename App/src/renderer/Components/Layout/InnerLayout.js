import { Box, List } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";

const dataItems = [
  {
    type: "section",
    name: "Tables",
    href: "/data/tables",
    items: [
      { type: "item", name: "Import", href: "/data/tables/import" },
      { type: "item", name: "Excel", href: "/data/tables/excel" },
    ],
  },
];

const trainItems = [
  {
    type: "section",
    name: "Linear Regression",
    href: "/train/linear",
    items: [
      { type: "item", name: "Model1", href: "/train/linear" },
      { type: "item", name: "Model2", href: "/train/linear" },
    ],
  },
  {
    type: "section",
    name: "Neural networks",
    href: "/train/nn",
    items: [
      { type: "item", name: "Model1", href: "/train/nn" },
      { type: "item", name: "Model2", href: "/train/nn" },
    ],
  },
];

const testItems = [
    { type: "item", name: "Model1", href: "/test" },
    { type: "item", name: "Model2", href: "/test" },
];

const learnItems = [
  {
    type: "section",
    name: "Tables",
    href: "/learn",
    items: [
      { type: "item", name: "model1", href: "/learn" },
      { type: "item", name: "model2", href: "/learn" },
    ],
  },
];

export default function InnerLayout({ type = null }) {
  const itemMap = {
    "data": dataItems,
    "train": trainItems,
    "test": testItems,
    "learn": learnItems
  };
  const items = itemMap[type] || [];

  return (
    <Box display={"flex"} flex={1}>
      
        {type && 
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          bgcolor: "background.standOut",
          borderRadius: "20px",
          m: 1,
          ml: 0,
        }}
      >
          <Box
          sx={{
            my: 2,
            overflowX: "hidden",
            overflowY: "hidden",
            ":hover": {
              overflowY: "auto",
            },
          }}
        >
          <List>
            <SidebarMenu items={items} />
          </List>
        </Box>
      </Box>
        }
        

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          bgcolor: "background.standOut",
          borderRadius: "20px",
          m: 1,
          ml: 0,
          py: 1,
          px: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
