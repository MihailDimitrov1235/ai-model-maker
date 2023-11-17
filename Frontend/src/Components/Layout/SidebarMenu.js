import { Button } from "@mui/material";

export default function SidebarMenu( {items} ){
    return(
        <>
            {items.map((item, idx) => (
                <Button sx={{ width:'100%'}}>{item.name}</Button>
            ))}
        </>
    )
}