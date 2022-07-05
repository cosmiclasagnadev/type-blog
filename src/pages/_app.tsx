import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

//we wrap the app with the withTRPC higher order function
export default withTRPC<AppRouter>({
  config({ ctx }) {
    //this HOC contains the config for the trpc client
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    // we set the url of the trpc server based on if we are in production or not
    // of course -- we are going to deploy to vercel so we are able to use the NEXT_PUBLIC_VERCEL_URL env variable above...

    //we compile loggerLink and the httpBatchLinks into a single links array. This is so it is faster to return all the links in the return statement below.
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60, // staleTime is the time in seconds that data within the client is considered 'stale'.
          },
        },
      },
      headers() {
        // we can pass the additional headers function to the trpc client
        if (ctx?.req) {
          // if our context has a request object...
          return {
            // we return the headers from that context
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      links, // we pass the links array to the trpc client
      transformer: superjson, // we use superjson to transform our data (this can use native data types)
    };
  },

  ssr: false, // we set this to false so we can see all the queries our client is making.
  // if we set this to true -- our client is going to make requests from the server, therefore we won't see the queries in the network tab
})(MyApp); //don't forget to pass the MyApp component to the withTRPC higher order function
