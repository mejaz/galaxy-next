import React from 'react';
import {useRouter} from "next/router";
import PageLayout from "../../../../components/PageLayout";
import SCForm from "../../../../components/form/partials/sc/SCForm";
import CertificateForm from "../../../../components/form/CertificateForm";

const FORM_TITLE = "Salary Certificate"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Generate ${FORM_TITLE}`
const FORM_TYPE = "SC"

export default function SalaryCert() {
  const router = useRouter()
  const {id} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <CertificateForm
        id={id}
        title={FORM_TITLE}
        authToken={authToken}
        editableFields={<SCForm.EditItems/>}
        readOnlyFields={<SCForm.ReadOnlyItems/>}
        formType={FORM_TYPE}
      />
    </PageLayout>
  )
}

SalaryCert.authRequired = true