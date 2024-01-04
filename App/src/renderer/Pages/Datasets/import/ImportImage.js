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
          }}
        >
          <FormControl sx={{ width: '20%', margin: 2 }}>
            <InputLabel>type</InputLabel>
            <Select label={"type"}>
              <MenuItem value={'classification'}>Image classification</MenuItem>
              <MenuItem value={'detection'}>Object detection</MenuItem>
              <MenuItem value={'captioning'}>Captioning</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            placeholder="1920px"
            sx={{
              input: {
                padding: '8px',
              },
            }}
          />
          <TextField
            variant="outlined"
            placeholder="1080px"
            sx={{
              margin: 1,
              input: {
                padding: '8px',
              },
            }}
          />
          <Box>
            <Typography
              sx={{
                color: 'black',
              }}
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
