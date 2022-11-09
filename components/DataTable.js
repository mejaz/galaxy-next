import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from "next/link";

const getDate = (dateStr) => {
	let nowDate = new Date(dateStr);
	return nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
}

export default function StickyHeadTable({rows, cols, actionRoute}) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{width: '100%', overflow: 'hidden'}} elevation={0}>
			<TableContainer sx={{maxHeight: 440}}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{cols.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{minWidth: column.minWidth}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={index}>
										{cols.map((column, i) => {
											const value = row[column.id];
											return cols.length - 1 === i
												? <TableCell key={i} align={column.align}>
													<Link href={actionRoute ? actionRoute.replace("#id", row._id) : "#"}>
														<a>View</a>
													</Link>
												</TableCell>
												: <TableCell key={i} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: typeof value === "boolean" ? String(value).toUpperCase() : value}
												</TableCell>
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
