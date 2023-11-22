import { Button } from "@mui/material"
// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };



const Landing = function(){
    const click = () => {
        // let test = new python('Test.py', options);
        // test.on('message', function(message){
        //     console.log(message)
        // })
    }
    return(
        <>
            <Button onClick={click} style={{maxWidth:'100px'}}>sus</Button>
        </>
    )
}

export default Landing