// import { Outlet } from "react-router-dom"
import { Box, Button } from "@mui/material"

const items = [
    {type:"section", name:'section 1', items:[
        {type:"item", name:"item1", href:"/"},
        {type:"item", name:"item2", href:"/"},
    ]}
]

export default function SidebarMenu({type}){
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection:'row', 
                width:'250px',
                flexDirection: "column",
                bgcolor: "background.standOut",
                borderRadius: '20px',
                m: 1,
                ml: 0,
            }}
        >
            <Button
                sx={{
                    bgcolor:"primary.main",
                    color: "text.contrast",
                    m:2,
                }}
                >
                ON/OFF
            </Button>
        </Box>
    )
}