import React from 'react';
import SubLayout from "../../components/SubLayout";
import SearchDocs from "../../components/form/SearchDocs";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Search Document`

export default function Search() {

	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<SearchDocs title={"Search Document"} />}
		/>
	)
}

Search.authRequired = true