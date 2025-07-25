import Navbar from '../components/navbar'
import '../styles/main.css'

export default function MyApp({ Component, pageProps}) {
    return (
        <>
        <Navbar />
        <Component {...pageProps} />
        </>
    )
}