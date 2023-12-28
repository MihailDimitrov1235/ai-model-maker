import { useState, useEffect } from "react"
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material"
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"

function ImportDataset() {
    const { t } = useTranslation();
  const navigate = useNavigate()
  const location = useLocation()
  const [type, setType] = useState('')
  useEffect(() => {
    if(location.pathname.includes("tabular")){
        setType("")
    }else if(location.pathname.includes("image")){

    }else if(location.pathname.includes("text")){

    }else{

    }
  },[])
  const handleChange = (event) => {
    setType(event.target.value)
  }
  return (
    <Box
        sx={{
          margin: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection:'column',
            gap:3
          }}
        >
          <h2>{t("create-dataset")}</h2>
        <FormControl fullWidth>
        <InputLabel >{t("type")}</InputLabel>
        <Select
            value={type}
            onChange={handleChange}
        >
            <MenuItem value={'tab'}>{t("tabular")}</MenuItem>
            <MenuItem value={'img'}>{t("image")}</MenuItem>
            <MenuItem value={'txt'}>{t("text")}</MenuItem>
        </Select>
        </FormControl>
        <Outlet/>
          </Box>
    </Box>
  )
}

export default ImportDataset