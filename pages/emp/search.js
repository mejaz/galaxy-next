import React from 'react';
import WorkAreaLayout from "../../components/WorkAreaLayout";

export default function Search() {
	return <WorkAreaLayout><h1>Search Employee</h1></WorkAreaLayout>
}

Search.authRequired = true