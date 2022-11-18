import React from 'react';
import {useRouter} from "next/router";
import UserForm from "../../../../components/form/UserFrom";
import QuickLinks from "../../../../components/QuickLinks";
import useProfile from "../../../../apiHooks/useProfile";
import PageLayout from "../../../../components/PageLayout";
import Loading from "../../../../components/Loading";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Employee Details`

export default function Edit() {
	const router = useRouter()
	const {id} = router.query
	const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
	const {profile, error} = useProfile(id, authToken);

	if (!profile) {
		return <Loading />
	}

	return (
		<PageLayout pageTitle={PAGE_TITLE} sideComponent={<QuickLinks id={id}/>}>
			<UserForm title={"Employee Details"} defaultValues={profile}
									isEdit={true} id={id}/>
		</PageLayout>
	)
}

Edit.authRequired = true