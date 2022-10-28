import React from 'react';
import {useRouter} from "next/router";
import SubLayout from "../../../components/SubLayout";
import UserForm from "../../../components/form/UserFrom";
import DetailForm from "../../../components/form/DetailForm";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Document Details`
const DETAILS_URL = "/api/docs"

export default function CertInfo() {
  const router = useRouter()
  const {reqId} = router.query

  const [details, setDetails] = React.useState()

  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json'
  }

  React.useEffect(() => {
    fetch(`${DETAILS_URL}/${reqId}`, {headers})
      .then(response => response.json())
      .then(obj => setDetails(obj))
      .catch(error => console.log(error))
  }, [reqId])

  return (
    <SubLayout
      pageTitle={PAGE_TITLE}
      component1={<DetailForm title={"Document Detail"}/>}
    />
  )
}


CertInfo.authRequired = true