import '../styles/globals.css'
import Layout from '../components/Layout'
import '../styles/styles.css'
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        
      </AuthProvider>
    </>
  )
}

export default MyApp
