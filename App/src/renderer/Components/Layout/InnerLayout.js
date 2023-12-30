import { Box, List } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";

const dataItems = [
  {
    type: "section",
    name: "Import",
    href: "/data/import",
    items: [
      { type: "item", name: "Tabular", href: "/data/import/tabular" },
      { type: "item", name: "Image", href: "/data/import/image" },
      { type: "item", name: "Text", href: "/data/import/text" },
    ],
  },
  {
    type: "section",
    name: "Tabular",
    href: "/data/import",
    items: [
      { type: "item", name: "1", href: "/data/tabular/1" },
      { type: "item", name: "2", href: "/data/tabular/2" },
      { type: "item", name: "3", href: "/data/tabular/3" },
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
          overflow:'scroll',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
