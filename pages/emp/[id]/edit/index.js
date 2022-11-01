import React from 'react';
import {useRouter} from "next/router";
import UserForm from "../../../../components/form/UserFrom";
import QuickLinks from "../../../../components/QuickLinks";
import SubLayout from "../../../../components/SubLayout";
import useProfile from "../../../../apiHooks/useProfile";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Employee Details`

export default function Edit() {
	const router = useRouter()
	const {id} = router.query
	const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
	const {profile, error} = useProfile(id, authToken);

	if (!profile) {
		return <h1>Loading...</h1>
	}

	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<UserForm title={"Employee Details"} defaultValues={profile}
									isEdit={true} id={id}/>}
			component2={<QuickLinks id={id}/>}
		/>
	)
}

Edit.authRequired = true