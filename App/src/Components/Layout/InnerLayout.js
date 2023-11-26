import { Box } from "@mui/material"
import SidebarMenu from "./SidebarMenu"
import { Outlet } from "react-router-dom"


export default function InnerLayout({type=null}){
    return(
        <Box display={'flex'} flex={1}>

            {type && <SidebarMenu type={type}/>}

            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                flex:1,
                bgcolor: "background.standOut",
                borderRadius: '20px',
                m: 1,
                ml: 0,
                py: 1,
                px: 2,
                }}
            >
                <Outlet />
            </Box>
      </Box>
    )
}