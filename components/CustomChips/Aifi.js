import React from 'react';
import CustomChip from "./CustomChip";

export default function ({company}) {
  const backgroundColor = "#fff"
  const color = "#f88f00"

  return <CustomChip
    color={color}
    company={company}
    backgroundColor={backgroundColor}
  />
}
