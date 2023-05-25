import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "~/utils/api";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
// import "../src/style/global.css";
import "~/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const emotionCache = clientSideEmotionCache;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SessionProvider session={session}>
            <CssBaseline />
            <Component {...pageProps} />
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
