import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
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
import FileUploadModal from "../modals/FileUploadModal";
import moment from "moment"
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

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

export default function DetailView({title, details}) {
  const router = useRouter()
  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json',
  }

  const uploadHeaders = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
  }

  const {reqId} = router.query
  const [loading, setLoading] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUploadModal, setOpenUploadModal] = React.useState(false);
  const [isSignedDocAvailable, setIsSignedDocAvailable] = React.useState(Boolean(details.isSigned))

  const deleteDocument = async () => {
    let response = await fetch(`/api/docs/${reqId}`, {
      method: 'DELETE',
      headers
    })

    if (response.ok) {
      setOpenDeleteModal(false)
      await router.replace("/dashboard")
    } else {
      setOpenDeleteModal(false)
      response = await response.json()
      alert(response.message)
    }
  }

  const uploadDocument = async (data) => {
    setLoading(true)
    let formData = new FormData()
    formData.append("docType", details.docType)
    formData.append("file", data.signedFile[0])

    let response = await fetch(`/api/docs/${reqId}/upload`, {
      method: 'POST',
      body: formData,
      headers: uploadHeaders,
    })

    if (response.ok) {
      setOpenUploadModal(false)
      setIsSignedDocAvailable(true)
    } else {
      alert('error')
    }
    setLoading(false)
  }

  const toggleDeleteModal = () => {
    setOpenDeleteModal(prevState => !prevState);
  };

  const toggleUploadModal = () => {
    setOpenUploadModal(prevState => !prevState);
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
              <Typography variant={'body1'}>{moment(details.issuedOn).format("DD-MMM-YYYY")}</Typography>
            </SpacedItems>
            <Divider/>

            <SpacedItems>
              <Typography variant={'body1'} color={"info.light"}>Issued By</Typography>
              <Typography variant={'body1'}>{details.issuedBy.lastName}</Typography>
            </SpacedItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{py: 1, px: 2}} elevation={5}>
              <SpacedItems>
                <Typography variant={'overline'}>Signed Document</Typography>
                {
                  isSignedDocAvailable
                    ? <ButtonGroup size="small" aria-label="small button group">
                      {[
                        <Button size={"small"} variant="outlined" color="info" startIcon={<UploadIcon/>}
                                onClick={() => toggleUploadModal()}>Upload</Button>,
                        <Button size={"small"} variant="contained" color="success"
                                startIcon={<DownloadIcon/>} onClick={() => downloadDoc(true)}>Download</Button>

                      ]}
                    </ButtonGroup>
                    :
                    <Button size={"small"} variant="contained" color="success" startIcon={<UploadIcon/>}
                            onClick={() => toggleUploadModal()}>Upload</Button>
                }

              </SpacedItems>
              <Divider/>
              <SpacedItems>
                <Typography variant={'overline'}>Un-signed Document</Typography>
                <Button
                  size={"small"}
                  variant="contained"
                  color="warning"
                  startIcon={<DownloadOutlinedIcon/>}
                  onClick={isSignedDocAvailable
                    ? () => alert("Document is already signed")
                    : () => downloadDoc(false)}
                  disabled={isSignedDocAvailable}
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
              <Typography
                variant={'body1'}>{`${details.issuedTo.email ? details.issuedTo.email : "Not Available"}`}</Typography>
            </SpacedItems>
          </Grid>
        </Grid>

        <Box sx={{my: 2, display: 'flex', justifyContent: 'flex-end', gap: '5px'}}>
          <Button size={"small"} variant="contained" color="secondary" startIcon={<ArrowBackIcon/>}
                  onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Box>

        <DocDeleteModal
          open={openDeleteModal}
          toggleOpen={toggleDeleteModal}
          deleteDocument={deleteDocument}
          loading={loading}
        />

        <FileUploadModal
          name={"signedFile"}
          allowedExt={[".pdf"]}
          title={"Signed Document Upload"}
          open={openUploadModal}
          toggleOpen={toggleUploadModal}
          handleUpload={uploadDocument}
          loading={loading}
        />

      </Box>

    </MainCardLayout>
  )
}
