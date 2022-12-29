import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useRouter} from "next/router";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

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

  const goLogin = () => {
    handleCloseNavMenu()
    router.push("/login")
  }

  const pages = [
    {
      text: 'Login',
      link: goLogin
    },
  ];

  return (
    <AppBar position="sticky" sx={{bgcolor: "transparent", color: "common.black"}}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <KeyboardDoubleArrowRightIcon sx={{fontSize: '30px'}}/>
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={() => router.push("/login")}
            sx={{
              flexGrow: 1,
              mr: 2,
              cursor: "pointer",
              display: {xs: 'none', md: 'flex'},
              letterSpacing: 1,
              fontStyle: 'italic',
              // fontFamily: "'Dancing Script', cursive, 'Sora', sans-serif",
            }}
          >
            {process.env.NEXT_PUBLIC_COMMON_HEADER}
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
            onClick={() => router.push("/login")}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: {xs: 'flex', md: 'none'},
              letterSpacing: 1,
              // fontFamily: "'Dancing Script', cursive, 'Sora', sans-serif",
            }}
          >
            {process.env.NEXT_PUBLIC_COMMON_HEADER}
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