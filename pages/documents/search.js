import React from 'react';
import Head from "next/head";
import {Card, CardContent, CardHeader, FormControl, Grid} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CustomInputField from "../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Divider from "@mui/material/Divider";
import StickyHeadTable from "../../components/DataTable";
import * as Url from "url";
import SubLayout from "../../components/SubLayout";
import UserForm from "../../components/form/UserFrom";
import SearchForm from "../../components/form/SearchForm";
import SearchDocs from "../../components/form/SearchDocs";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Search Document`


export default function Search() {

	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<SearchDocs title={"Search Document"} />}
		/>

	)
}

Search.authRequired = true