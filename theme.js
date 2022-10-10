import {createTheme} from "@mui/material/styles";
import {blueGrey, cyan, pink, grey} from '@mui/material/colors'

let theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      offWhite: '#FAF9F6'
    },
    // primary: blueGrey,
    // secondary: cyan
    // primary: {
    //   main: '#7AB2EA',
    //   light: '#B1DCF8',
    //   dark: '#3D68A8',
    // },
    // secondary: {
    //   main: '#7AB2EA',
    //   light: '#B1DCF8',
    //   dark: '#3D68A8',
    // },
    error: {
      main: '#FF5A23',
      light: '#FFAE7A',
      dark: '#B72311',
      100: '#FFEAD3',
      200: '#FFCFA6',

    },
    warning: {
      main: '#F7A502',
      light: '#FCD466',
      dark: '#B16A01',
      100: '#FEF4CC',
      200: '#FEE699'
    }
  },
  typography: {
    fontFamily: "'Sora', sans-serif",
  }
})

theme.components = {
  MuiButton: {
    styleOverrides: {
      containedSizeLarge: {
        padding: '16px',
        fontSize: '18px',
        letterSpacing: "5px"
      },
      text: {
        color: grey[500],
        // textTransform: "capitalize",
        "&:hover": {
          // backgroundColor: "#9c27b0",
          // color: "#FFF"
        }
      }
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      subheader: {
        fontSize: '0.8rem',
      }
    }
  }
  // MuiButtonGroup: {
  //   defaultProps: {
  //     '@media (max-width:600px)': {
  //       size: 'small',
  //     },
  //   }
  // }
}

// responsive typography
theme.typography.h1 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.p = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  },
};

export default theme;