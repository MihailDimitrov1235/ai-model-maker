import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

function ImportTabular() {

  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'))

  useEffect(()=>{
    window.electronAPI.handleSetTabularFile((event, value) => {
      setFile(value.filePaths || "error");
      return value
    });
  }, [])

  const handleClick = () => {
    window.electronAPI.selectTabularFile();
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} gap={3}>
      <TextField variant="outlined" value={file} disabled fullWidth/>
      <Button onClick={handleClick} sx={{
        overflow:'hidden',
        whiteSpace:'nowrap'
      }}>
        {t("select-file")}
      </Button>
    </Box>
  )
}

export default ImportTabular