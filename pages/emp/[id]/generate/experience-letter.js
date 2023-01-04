import React from 'react';
import {useRouter} from "next/router";
import PageLayout from "../../../../components/PageLayout";
import ELForm from "../../../../components/form/partials/el/ELForm";
import CertificateForm from "../../../../components/form/CertificateForm";
import useDocNo from "../../../../apiHooks/useDocNo";
import Loading from "../../../../components/Loading";

const FORM_TITLE = "Experience Letter"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Generate ${FORM_TITLE}`
const FORM_TYPE = "EL"
const DOC_NO_CODE = "coeDocNo"

export default function ExperienceLetter() {
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
        editableFields={<ELForm.EditItems docNo={docNo}/>}
        readOnlyFields={<ELForm.ReadOnlyItems/>}
        formType={FORM_TYPE}
      />
    </PageLayout>
  )
}

ExperienceLetter.authRequired = true