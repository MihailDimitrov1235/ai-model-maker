import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'

export default function Intro() {

    const bgPath = "icons/bulgaria.svg"
    const enPath = "icons/united-kingdom.svg"

    const { i18n } = useTranslation()

    const changeLanguageHandler = (lang) =>{
        console.log(i18n.language)
        i18n.changeLanguage(i18n.language=="bg"?"en":"bg")
    }

    return (
        <IconButton onClick={changeLanguageHandler} sx={{ width:'50px'}}>
            <img src={i18n.language=="bg"?enPath:bgPath}/>
        </IconButton>
    )
}