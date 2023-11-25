import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

export default function LanguageChanger() {

    const bgPath = "icons/bulgaria.svg"
    const enPath = "icons/united-kingdom.svg"

    const { i18n } = useTranslation()

    const changeLanguageHandler = (lang) =>{
        i18n.changeLanguage(i18n.language=="bg"?"en":"bg")
    }

    return (
        <Button
        onClick={changeLanguageHandler}
        sx={{
          m:1,
          textTransform: "none",
          width: "100%",
          aspectRatio:'1/1',
          minWidth:'0',
          display: "flex",
          justifyContent: "center",
          flexDirection:'column',
          alignItems:'center',
        }}
      >
        <img src={i18n.language=="bg"?enPath:bgPath}/>
      </Button>
    )
}