import React from 'react';
import Aifi from "./CustomChips/Aifi";
import Quantlase from "./CustomChips/Quantlase";

export default function ({company}) {
  return (
    <>{getCompanyChip(company)}</>
  )
}

const getCompanyChip = (company) => {
  let chip = ""
  switch (company.toLowerCase()) {
    case 'aifi':
      chip = <Aifi company={company} />
      break
    case 'quantlase':
      chip = <Quantlase company={company} />
      break
    default:
      chip = null
  }
  return chip
}