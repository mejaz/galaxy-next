import React from 'react';
import SearchForm from "../../components/form/SearchForm";
import PageLayout from "../../components/PageLayout";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Search Employee`


export default function Search() {

	return (
		<PageLayout pageTitle={PAGE_TITLE}>
			<SearchForm title={"Search Employee"} />
		</PageLayout>
	)
}

Search.authRequired = true