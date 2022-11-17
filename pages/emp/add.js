import React from 'react';
import UserForm from "../../components/form/UserFrom"
import PageLayout from "../../components/PageLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Add Employee`

export default function Add() {
	return (
		<PageLayout pageTitle={PAGE_TITLE}>
			<UserForm title={"Add Employee"} />
		</PageLayout>
	)
}

Add.authRequired = true
