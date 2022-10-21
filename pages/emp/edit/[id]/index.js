import React from 'react';
import {useRouter} from "next/router";
import UserForm from "../../../../components/form/UserFrom";
import QuickLinks from "../../../../components/QuickLinks";
import useSWR from 'swr';
import SubLayout from "../../../../components/SubLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Employee Details`
const USER_DETAILS_URL = "/api/user/profile"

const fetcher = (url, headers) => fetch(url, {headers}).then((res) => res.json());

export default function Edit() {
	const router = useRouter()
	const {id} = router.query

	const headers = {
		Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
		'Content-type': 'application/json'
	}

	const params = new URLSearchParams({id})
	const url = `${USER_DETAILS_URL}?${params}`
	const {data: userObj, error} = useSWR([url, headers], fetcher);

	if (!userObj) {
		return <h1>Loading...</h1>
	}

	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<UserForm title={"Employee Details"} defaultValues={userObj}
									isEdit={true} id={id}/>}
			component2={<QuickLinks id={id}/>}
		/>
	)
}

Edit.authRequired = true