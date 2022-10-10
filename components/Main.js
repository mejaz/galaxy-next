import React from 'react';
import {styled} from '@mui/system';

const MainComponent = styled('footer')({
  minHeight: 'calc(100vh - 64.90px - 68.5px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export default function ({children}) {
  return (
    <MainComponent>
      {children}
    </MainComponent>
  )
}