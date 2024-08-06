"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ef",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#001a33",
    },
    text: {
      primary: "#000",
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <div className={inter.className}>{children}</div>
      </Box>
    </ThemeProvider>
  );
}
