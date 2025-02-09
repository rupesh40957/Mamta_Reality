import React from 'react';
import Head from 'next/head';

const GoogleTagManager = () => {
  return (
    <>
      {/* GTM in the <head> tag */}
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WBRZ8HLP');`
          }}
        />
      </Head>

      {/* GTM noscript (for browsers without JS support) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WBRZ8HLP"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
};

export default GoogleTagManager;
