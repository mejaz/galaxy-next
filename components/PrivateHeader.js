import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import RightLinks from "./RightLinks";
import {useRouter} from "next/router";


// only for logged in users
const PublicHeader = (props) => {
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goLogout = () => {
    handleCloseNavMenu()
    router.push("/")
  }

  const pages = [
    {
      text: 'Logout',
      link: goLogout
    },
  ];

  return (
    <AppBar elevation={0} position="sticky" sx={{zIndex: 1, bgcolor: "primary", color: "common.white"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* --- desktop view --- */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 1,
              mr: 2,
              cursor: "pointer",
              display: {xs: 'none', md: 'flex'},
              letterSpacing: 1,
              fontFamily: "'Dancing Script', cursive, 'Sora', sans-serif",
            }}
          >
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </Typography>

          {/* --- desktop view --- */}
          <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={page.link}
                sx={{my: 2, color: "common.black", display: 'block'}}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          {/* --- mobile view --- */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: {xs: 'flex', md: 'none'},
              letterSpacing: 1,
              fontFamily: "'Dancing Script', cursive, 'Sora', sans-serif",
            }}
          >
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </Typography>

          {/* --- mobile view --- */}
          <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={page.link}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default PublicHeader;