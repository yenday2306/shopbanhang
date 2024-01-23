import Header from './Header.tsx'
import Products from './Products.tsx'
import Footer from './Footer.tsx'
import { useCheckLogin } from '../../hook/useCheckLogin.ts';
function Home()  {

    useCheckLogin();
    return <div className='ml-[40px] mr-[40px]'>
        <Header/>
        <Products/>
        <Footer/>
    </div>
}
export default Home