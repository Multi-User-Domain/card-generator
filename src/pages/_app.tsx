
import '../styles/globals.css';
import {Helmet} from "react-helmet";

import type, { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Helmet>
      <script src="https://cdn.jsdelivr.net/npm/@ulb-darmstadt/shacl-form/dist/index.js" type="module"></script>
    </Helmet>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp
