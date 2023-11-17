import { Box, Menu, MenuItem, Typography } from "@mui/material"
import { Outlet } from 'react-router-dom';
import SidebarMenu from "./SidebarMenu";

export default function Layout(){

    const items = [
        {type:'item', name:'Home', icon:null, href:''},
        {type:'item', name:'Data', icon:null, href:''}
    ]

    return(
        <Box sx={{
            height:'100vh',
            width:'100vw',
            display:'flex'
        }}>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                width:'300px',
                height:'100%'
            }}>
                <Box sx={{
                    border:'red solid 1px',
                    display:'flex',
                    alignItems:'center',
                    p:1,
                }} >
                    <img src="logo-placeholder-image.png" style={{aspectRatio:'1/1', height:'64px'}}/>
                    <Typography variant="p">AI-MODEL-MAKER</Typography>
                </Box>

                <Box sx={{
                    border:'green solid 1px'
                }}>
                    <SidebarMenu items={items}/>
                </Box>

                <Box sx={{
                    border:'blue solid 1px'
                }}>
                    
                </Box>
            </Box>

            <Outlet/>

        </Box>
        
    )
}