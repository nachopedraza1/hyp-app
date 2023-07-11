import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff8e94'
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "gray",
                    "&.MuiOutlinedInput-root": {
                        '&:hover fieldset': {
                            borderColor: '#ff8e94',
                        },
                    },
                },

            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                    color: '#ffff'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#ffff',
                    marginBottom: 4
                }
            }
        }
    },
    typography: {
        fontFamily: 'Poppins',
    }
})