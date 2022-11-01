import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  MenuList,
  Popper,
  Typography
} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import Paper from "@mui/material/Paper";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import {useRouter} from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DocDeleteModal from "../modals/DocDeleteModal";
import UploadIcon from '@mui/icons-material/Upload';
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FileSaver = require('file-saver');

const SpacedItems = ({children}) => (
  <Box sx={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    my: 2
  }}>
    {children}
  </Box>)

const GroupButton = () => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon/>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default function DetailView({title, details}) {
  const router = useRouter()
  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json',
  }

  const {reqId} = router.query
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const deleteDocument = async () => {
    let response = await fetch(`/api/docs/${reqId}`, {
      method: 'DELETE',
      headers
    })

    if (response.ok) {
      setOpenDeleteModal(false)
      await router.replace("/dashboard")
    } else {
      alert("error deleting document")
    }
  }

  const toggleDeleteModal = () => {
    setOpenDeleteModal(prevState => !prevState);
  };

  const downloadDoc = async (signed) => {
    let response = await fetch(`/api/docs/${reqId}/download/?signed=${signed}`, {headers})

    if (response.ok) {
      let contentDispositionHeader = response.headers.get("Content-Disposition")
      let filename = contentDispositionHeader.split("filename=").pop()

      response = await response.blob()
      FileSaver.saveAs(response, filename)
    }
  }

  return (
    <MainCardLayout title={title}>
      <Box
        sx={{
          mb: "0",
          "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={6}>
            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Document Number</Typography>
              <Typography variant={'body1'}>{details.docNo}</Typography>
            </SpacedItems>
            <Divider/>

            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Document Type</Typography>
              <Typography variant={'body1'}>{details.docType}</Typography>
            </SpacedItems>
            <Divider/>

            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Issued On</Typography>
              <Typography variant={'body1'}>{details.issuedOn}</Typography>
            </SpacedItems>
            <Divider/>

            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Issued By</Typography>
              <Typography variant={'body1'}>{`${details.issuedBy.firstName} ${details.issuedBy.lastName}`}</Typography>
            </SpacedItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{py: 1, px: 2}} elevation={5}>
              <SpacedItems>
                <Typography variant={'overline'}>Signed Document</Typography>
                {
                  !details.certSignedPath
                    ? <ButtonGroup size="small" aria-label="small button group">
                      {[
                        <Button size={"small"} variant="contained" color="warning" startIcon={<UploadIcon/>}>Upload</Button>,
                        <Button size={"small"} variant="contained" color="success"
                                startIcon={<DownloadIcon/>}>Download</Button>

                      ]}
                      </ButtonGroup>
                    : <Button size={"small"} variant="contained" color="success" startIcon={<UploadIcon/>}>Upload</Button>
                }

              </SpacedItems>
              <Divider/>
              <SpacedItems>
                <Typography variant={'overline'}>Un-signed Document</Typography>
                <Button size={"small"} variant="contained" color="warning" startIcon={<DownloadOutlinedIcon/>}
                        onClick={() => downloadDoc(false)}
                >Download</Button>
              </SpacedItems>
              <Divider/>
              <SpacedItems>
                <Typography variant={'overline'} color={"error.main"}>Delete Document</Typography>
                <Button size={"small"} variant="contained" color="error" startIcon={<DeleteIcon/>}
                        onClick={() => toggleDeleteModal()}
                >Delete</Button>
              </SpacedItems>
            </Paper>
          </Grid>
        </Grid>
        <Divider/>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={12} sx={{mt: 3, mb: 1}}>
            <Typography variant={'overline'} color={"secondary"}>Issued To</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Employee Id</Typography>
              <Typography variant={'body1'}>{details.issuedTo.empId}</Typography>
            </SpacedItems>
            <Divider/>
          </Grid>

          <Grid item xs={12} md={6}>
            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Employee Name</Typography>
              <Typography variant={'body1'}>{`${details.issuedTo.firstName} ${details.issuedTo.lastName}`}</Typography>
            </SpacedItems>
            <Divider/>
          </Grid>

          <Grid item xs={12} md={6}>
            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Employee Email</Typography>
              <Typography variant={'body1'}>{`${details.issuedTo.email}`}</Typography>
            </SpacedItems>
          </Grid>
        </Grid>

        <Divider/>
        <Box sx={{width: '100%', textAlign: 'right', my: 3}}>
          <Button size={"small"} variant="contained" color="primary" startIcon={<ArrowBackIcon/>}
                  onClick={() => router.back()}
          >Go Back</Button>
        </Box>

        <DocDeleteModal open={openDeleteModal} toggleOpen={toggleDeleteModal} deleteDocument={deleteDocument}/>

      </Box>

    </MainCardLayout>
  )
}
