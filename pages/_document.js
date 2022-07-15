import Document, {Html, Head, Main, NextScript} from 'next/document'

export default () => {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export const getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
}