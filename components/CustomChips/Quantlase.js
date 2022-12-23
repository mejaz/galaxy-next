import React from 'react';
import CustomChip from "./CustomChip";

export default function ({company}) {
  const backgroundColor = "#fff"
  const color = "#0d7bec"

  return <CustomChip
    color={color}
    company={company}
    backgroundColor={backgroundColor}
  />
}