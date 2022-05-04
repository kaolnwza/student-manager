import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheets } from '@material-ui/styles';
import React from 'react';
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* <link
                        href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@300&display=swap"
                        rel="stylesheet"
                    /> */}
                    <script src="https://cdn.lordicon.com/lusqsztk.js"></script>

                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

}


export default MyDocument