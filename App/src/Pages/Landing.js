import { Button } from "@mui/material"
import { useTranslation } from 'react-i18next';
import {ShowDiagrams} from '../Components/Charts/BarChart_GoogleLib'

// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };



const Landing = function(){

    const { t, i18n } = useTranslation();

    const click = () => {
      window.electronAPI.runPython('test')
        // let test = new python('Test.py', options);
        // test.on('message', function(message){
        //     console.log(message)
        // })
    }
    return(
        <>
            <ShowDiagrams/>
            <Button onClick={click} style={{maxWidth:'100px'}}>{t('Test')}</Button>
        </>
    )
}

export default Landing