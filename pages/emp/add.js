import React from 'react';
import UserForm from "../../components/form/UserFrom"
import PageLayout from "../../components/PageLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Add Employee`

export default function Add() {
	return (
		<PageLayout pageTitle={PAGE_TITLE}>
			<UserForm title={"Add Employee"} />
		</PageLayout>
	)
}

Add.authRequired = true
