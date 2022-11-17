import React from 'react';
import SubLayout from "../components/SubLayout";
import DesignationForm from "../components/form/DesignationForm";
import PageLayout from "../components/PageLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Designations`

export default function Designations() {
	return (
		<PageLayout pageTitle={PAGE_TITLE}>
			<DesignationForm title={"Designations"} />
		</PageLayout>
	)
}

Designations.authRequired = true