import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary:{
            main: "#ff8e94"
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "black",
                    borderRadius: 10,
                    "&.MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "gray"
                        }, '&:hover fieldset': {
                            borderColor: 'gray',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: "#ff8e94",
                        },
                    },
                },
                notchedOutline: {
                    borderColor: "gray",
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                    color: '#ffff',
                    borderRadius: 10,
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'gray',
                    marginBottom: 4
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    marginLeft: 3,
                }
            }
        }
    },
    typography: {
        fontFamily: 'Poppins',
    }
})