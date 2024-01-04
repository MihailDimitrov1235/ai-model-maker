import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
function ImportImage() {
  return (
    <Box
      sx={{
        display: 'inline',
      }}
    >
      <h1>Create image dataset</h1>
      <Box
        sx={{
          marginTop: '5%',
          borderRadius: '16px',

          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between'
          }}
        >
            
          <FormControl sx={{display:'flex', gap:3, flexDirection:'row'}}>
            <InputLabel>type</InputLabel>
            <Select label={"type"} sx={{ minWidth:'200px'}}>
              <MenuItem value={'classification'}>Image classification</MenuItem>
              <MenuItem value={'detection'}>Object detection</MenuItem>
              <MenuItem value={'captioning'}>Captioning</MenuItem>
            </Select>

          <TextField
            variant="outlined"
            placeholder="1920px"
          />
          <TextField
            variant="outlined"
            placeholder="1080px"
          />
          
          </FormControl>
          <Box>
            <Typography
            color={'text.main'}
            >
              Don't have labels?
            </Typography>
            <Button variant="contrast">Create labels</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ImportImage;
