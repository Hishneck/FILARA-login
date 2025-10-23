import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c06ecc",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#37393d",
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "Inter",
          marginBottom: "4px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "12px",
          "& .MuiOutlinedInput-root": {
            height: " 40px",
            width: "466px",
            borderRadius: 8,
          },
          "& .MuiInputLabel-root": {
            transform: "translate(14px, 10px) scale(1)",
            fontSize: "14px",
            fontFamily: "Inter",
            color: "#737680",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)", // Лейбл при фокусе
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: 40,
            width: 466,
            borderRadius: 8,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            color: "#d0d3da",
          },
          "&.Mui-checked .MuiSvgIcon-root": {
            color: "#c06ecc",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "#ffffff",
            borderRadius: "8px",
            padding: "10px 20px",
          },
          props: { variant: "text" },
          style: {
            ":hover": { textDecoration: "underline" },
            backgroundColor: "#fff",
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
  },
  typography: {
    h5: {
      fontFamily: "Inter",
      fontSize: "24px",
      fontWeight: 500,
      margin: "0 0 32px 0",
    },
    body1: {
      fontFamily: "Inter",
      color: "#37393d",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "150%",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
