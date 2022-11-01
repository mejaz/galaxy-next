import React from 'react';
import {useRouter} from "next/router";
import DetailView from "../../../components/form/DetailView";
import PageLayout from "../../../components/PageLayout";
import useDocDetails from "../../../apiHooks/useDocDetails";
import Loading from "../../../components/Loading";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Document Details`

export default function CertInfo() {
  const router = useRouter()
  const {reqId} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  const {details, isLoading, isError} = useDocDetails(reqId, authToken)

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <DetailView title={"Document Details"} details={details}/>
    </PageLayout>
  )
}


CertInfo.authRequired = true