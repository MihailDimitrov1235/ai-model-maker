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
    name: "View",
    href: "/data",
    items: [
      { type: "item", name: "Tabular", href: "/data/tabular" },
      { type: "item", name: "Image", href: "/data/image" },
      { type: "item", name: "Text", href: "/data/text" },
    ],
  },
];

const trainItems = [
  {
    type: "section",
    name: "Create",
    href: "/train/create",
    items: [
      { type: "item", name: "Tabular", href: "/train/create/tabular" },
      { type: "item", name: "Image", href: "/train/create/image" },
      { type: "item", name: "Text", href: "/train/create/text" },
    ],
  }
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
    <Box display={"flex"} sx={{ width:'calc(100% - 78px)'}}>
      
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
          overflow:'hidden',
          flex: 1,
          borderRadius: "20px", 
          bgcolor: "background.standOut",
          m: 1,
          ml: 0,
        }}
      >
        <Box sx={{
          overflowY:'scroll',
          display: "flex",
          flexDirection: "column",
          py: 1,
          px: 2,
          height:'100%'
        }}>
        <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
