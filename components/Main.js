import React from 'react';
import {styled} from '@mui/system';

const MainComponent = styled('div')({
  height: 'calc(100vh - 64.90px - 68.5px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export default function Main({children}) {
  return (
    <MainComponent>
      {children}
    </MainComponent>
  )
}