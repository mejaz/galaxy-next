import React from 'react';
import {useRouter} from "next/router";
import PageLayout from "../../../../components/PageLayout";
import ELForm from "../../../../components/form/partials/el/ELForm";
import CertificateForm from "../../../../components/form/CertificateForm";

const FORM_TITLE = "Experience Letter"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Generate ${FORM_TITLE}`
const FORM_TYPE = "EL"

export default function ExperienceLetter() {
  const router = useRouter()
  const {id} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <CertificateForm
        id={id}
        title={FORM_TITLE}
        authToken={authToken}
        editableFields={<ELForm.EditItems/>}
        readOnlyFields={<ELForm.ReadOnlyItems/>}
        formType={FORM_TYPE}
      />
    </PageLayout>
  )
}

ExperienceLetter.authRequired = true