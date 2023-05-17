import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store, { globalstore } from "@/utils/store";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const queryClient = new QueryClient();

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={globalstore}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {layout(<Component {...pageProps} />)}
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}
