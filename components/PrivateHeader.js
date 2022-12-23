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
import {useRouter} from "next/router";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarItems from "./SidebarItems";
import CompanySuperScript from "./CompanySuperScript";


// only for logged in users
const PrivateHeader = (props) => {
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const company = localStorage.getItem(process.env.NEXT_PUBLIC_COMPANY_STORAGE)

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
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)
    handleCloseNavMenu()
    router.push("/login")
  }

  return (
    <AppBar elevation={0} position="sticky" sx={{zIndex: 1, bgcolor: "primary", color: "common.white"}}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* --- desktop view --- */}
          <Box sx={{
            flexGrow: 1,
            mr: 2,
            display: {xs: 'none', md: 'flex'},
          }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              onClick={() => router.push("/dashboard")}
              sx={{
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              {process.env.NEXT_PUBLIC_COMMON_HEADER}
            </Typography>
            <Box>{company && <CompanySuperScript company={company} />}</Box>
          </Box>


          {/* --- desktop view --- */}
          <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
            <Button
              onClick={goLogout}
              sx={{my: 2, color: "primary.contrastText", display: 'block'}}
            >
              LOGOUT
            </Button>
          </Box>

          {/* --- mobile view --- */}
          <Box sx={{
            flexGrow: 1,
            mr: 2,
            display: {md: 'none'},
          }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              onClick={() => router.push("/dashboard")}
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                display: {xs: 'flex', md: 'none'},
                letterSpacing: 1,
              }}
            >
              {process.env.NEXT_PUBLIC_COMMON_HEADER}
            </Typography>
            <Box>{company && <CompanySuperScript company={company} />}</Box>
          </Box>

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
              <SidebarItems/>
              <ListItem>
                <ListItemButton onClick={() => goLogout()}>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary={'Logout'}/>
                </ListItemButton>
              </ListItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default PrivateHeader;