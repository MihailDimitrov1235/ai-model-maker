import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import bgIcon from '../../../../assets/images/bulgaria.svg';
import enIcon from '../../../../assets/images/united-kingdom.svg';

export default function LanguageChanger() {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(i18n.language == 'bg' ? 'en' : 'bg');
  };

  return (
    <Button
      onClick={changeLanguageHandler}
      sx={{
        m: 1,
        mb: 0,
        textTransform: 'none',
        width: '100%',
        aspectRatio: '1/1',
        minWidth: '0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={i18n.language == 'en' ? bgIcon : enIcon} />
    </Button>
  );
}
