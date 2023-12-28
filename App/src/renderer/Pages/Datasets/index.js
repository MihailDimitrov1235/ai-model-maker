import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { ShowDiagrams } from "../../Components/Charts/BarChart_GoogleLib";
import CardElement from "../../Components/Cards/DatasetCard";
import { Link } from "react-router-dom";
// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };

const Datasets = function () {
  const { t, i18n } = useTranslation();

  const click = () => {
    //   window.electronAPI.runPython('test')
    window.electronAPI.checkVnev();
    // let test = new python('Test.py', options);
    // test.on('message', function(message){
    //     console.log(message)
    // })
  };

  const datasets = [
    { title: "Road Sign", Miho: "waka waka eee", Alvin: "Chiponoskovci" },
    { title: "Road Sign" },
    { title: "Road Sign" },
    { title: "Football Objects" },
    { title: "Basketball Objects" },
    { title: "Titanic Deaths" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          margin: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>DATASETS</h2>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              sx={{
                input: {
                  padding: "8px",
                },
              }}
            />
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contrast"
              onClick={handleClick}
            >
              New Datasets
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to={"table/import"}>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    color: "#000",
                  }}
                >
                  Tabular Data
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    color: "#000",
                  }}
                >
                  Image Data
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    color: "#000",
                  }}
                >
                  Text Data
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Box>

        <Box
          sx={{
            margin: "25px",
          }}
        >
          <Grid container spacing={4}>
            {datasets.map((dataset, index) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={index}>
                <CardElement title={dataset.title} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            <Pagination count={10} color="primary" />
          </Box>
        </Box>
      </Box>

      {/* <ShowDiagrams/>
              <Button variant="main" onClick={click} style={{maxWidth:'100px'}}>{t('Test')}</Button> */}
    </>
  );
};

export default Datasets;
