export const SEARCH_EMPLOYEE_TABLE_COLS = [
  {id: 'empId', label: 'Id', minWidth: 50},
  {id: 'firstName', label: 'First Name', minWidth: 170},
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 170,
  },
  {
    id: 'dob',
    label: 'D.O.B.',
    minWidth: 100,
    type: 'date',
    format: "DD-MMM-YYYY"
  },
  {
    id: 'primaryMobile',
    label: 'Primary Mobile',
    minWidth: 170,
    type: "mobNo",
    prepend: "0"
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
]

export const SEARCH_DOC_TABLE_COLS = [
  {id: 'docNo', label: 'Doc No', minWidth: 100},
  {id: 'docType', label: 'Doc type', minWidth: 100},
  {
    id: 'issuedTo',
    label: 'Issued To',
    minWidth: 200,
  },
  {
    id: 'issuedBy',
    label: 'Issued By',
    minWidth: 10,
  },
  {
    id: 'issuedOn',
    label: 'Issued On',
    minWidth: 140,
    type: 'date',
    format: "DD/MMM/YYYY"
  },
  {
    id: 'isSignedUploaded',
    label: 'Signed?',
    minWidth: 10,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 10,
  },
]