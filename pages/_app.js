import "../styles/globals.css";
import { darkTheme, lightTheme } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
