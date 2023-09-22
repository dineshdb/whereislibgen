import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Find out where LibGen is right now."
        />
        <title>Where is Libgen now?</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
