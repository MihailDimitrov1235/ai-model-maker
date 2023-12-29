import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next"

function ImportTabular() {

  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'))

  return (
    <Box display={'flex'} justifyContent={'space-between'} gap={3}>
      <TextField variant="outlined" value={file} disabled fullWidth/>
      <Button sx={{
        overflow:'hidden',
        whiteSpace:'nowrap'
      }}>
        {/* select-file */}
        {t("select-file")}
      </Button>
    </Box>
  )
}

export default ImportTabular