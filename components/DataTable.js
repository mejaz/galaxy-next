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
import moment from "moment"
import {Typography} from "@mui/material";

export default function StickyHeadTable({cols, baseUrl, authToken, searchFields, actionRoute, dataHook, resetToggle}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {totalCount, rows, isLoading: searchLoading} = dataHook(authToken, baseUrl, searchFields, page, rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setPage(0)
  }, [resetToggle])

  return (
    rows && rows.length > 0
      ? <Paper sx={{width: '100%', overflow: 'hidden'}} elevation={0}>
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
                            {column.type === 'date'
                              ? value ? moment(value).format(column.format) : "Not Available"
                              : column.type === "status"
                                ? <span style={{
                                  padding: '1px',
                                  backgroundColor: String(value).toUpperCase() === 'SIGNED' ? "lightgreen" : 'lightsalmon'
                                }}>{String(value).toUpperCase()}</span>
                                : column.type === 'mobNo'
                                  ? value
                                    ? `0${value}`
                                    : "Not Available"
                                  : value
                            }
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
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      : <Typography
        variant={"body1"}
        color={"info.main"}
        sx={{mb: 3}}
      >
        No data to display
      </Typography>
  )
}
