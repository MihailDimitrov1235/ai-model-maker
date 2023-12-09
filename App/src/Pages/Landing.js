import { Button, Grid, Box, Pagination  } from "@mui/material"
import { useTranslation } from 'react-i18next';
import {ShowDiagrams} from '../Components/Charts/BarChart_GoogleLib'
import CardElement from "../Components/CardElement";


// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };



const Landing = function(){

    const { t, i18n } = useTranslation();

    const click = () => {
    //   window.electronAPI.runPython('test')
      window.electronAPI.checkVnev()
        // let test = new python('Test.py', options);
        // test.on('message', function(message){
        //     console.log(message)
        // })
    }
    return(
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CardElement/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardElement/>
                    </Grid>                    
                    <Grid item xs={4}>
                        <h1>RABOTI</h1>
                    </Grid>
                </Grid>
                <Box sx={{ 
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center"
                }} >
                    <Pagination count={10} color="primary" />
                </Box>
                
            </Box>
            
            
            {/* <ShowDiagrams/>
            <Button variant="main" onClick={click} style={{maxWidth:'100px'}}>{t('Test')}</Button> */}
        </>
    )
}

export default Landing