import React from 'react';
import {useRouter} from "next/router";
import PageLayout from "../../../../components/PageLayout";
import STLForm from "../../../../components/form/partials/stl/STLForm";
import CertificateForm from "../../../../components/form/CertificateForm";

const FORM_TITLE = "Salary Transfer Letter"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Generate ${FORM_TITLE}`
const FORM_TYPE = "STL"

export default function SalaryTransferLetter() {
  const router = useRouter()
  const {id} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <CertificateForm
        id={id}
        title={FORM_TITLE}
        authToken={authToken}
        editableFields={<STLForm.EditItems/>}
        readOnlyFields={<STLForm.ReadOnlyItems/>}
        formType={FORM_TYPE}
      />
    </PageLayout>
  )
}

SalaryTransferLetter.authRequired = true
