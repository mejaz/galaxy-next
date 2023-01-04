import React from 'react';
import {useRouter} from "next/router";
import PageLayout from "../../../../components/PageLayout";
import SCForm from "../../../../components/form/partials/sc/SCForm";
import CertificateForm from "../../../../components/form/CertificateForm";
import useDocNo from "../../../../apiHooks/useDocNo";
import Loading from "../../../../components/Loading";

const FORM_TITLE = "Salary Certificate"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Generate ${FORM_TITLE}`
const FORM_TYPE = "SC"
const DOC_NO_CODE = "scDocNo"

export default function SalaryCert() {
  const router = useRouter()
  const {id} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
  const {docNo, isLoading, isError} = useDocNo(DOC_NO_CODE, authToken);

  if (isLoading) return <Loading />

  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <CertificateForm
        id={id}
        title={FORM_TITLE}
        authToken={authToken}
        editableFields={<SCForm.EditItems docNo={docNo} />}
        readOnlyFields={<SCForm.ReadOnlyItems/>}
        formType={FORM_TYPE}
      />
    </PageLayout>
  )
}

SalaryCert.authRequired = true