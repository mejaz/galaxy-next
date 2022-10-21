import React from 'react';
import UserForm from "../../components/form/UserFrom"
import SubLayout from "../../components/SubLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Add Employee`

export default function Add() {
	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<UserForm title={"Add Employee"} />}
		/>
	)
}

Add.authRequired = true