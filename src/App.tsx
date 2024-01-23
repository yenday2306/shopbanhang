
import './App.css'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Login from './components/loginComponent/Login';
import Signup from './components/loginComponent/Signup';
import Home from './components/uiComponent/Home';
import Buying from './components/childrenComponent/Buying';
import { Provider } from 'react-redux';
import { store } from './store';
import Admin from './components/AdminComponent/Admin';
import Search from './components/childrenComponent/Search';
import ThanhToan from './components/uiComponent/ThanhToan';
// import Login from './components/Login.tsx'
// import Home from './components/Home.tsx'
// import Signup from './components/Signup.tsx'
// import Buying from './components/Buying.tsx'
// import { Provider } from 'react-redux';
// import { store } from './store.ts';
// import Search from './components/Search.tsx';
// import Admin from './components/Admin.tsx';
// import ThanhToan from './components/ThanhToan.tsx';

function App() {
  function checkLogin() {
    const emailLogin = localStorage.getItem('email');
    console.log(emailLogin);
    if (emailLogin) {
      return true;
    } else {
      return redirect('/login')
    }
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,

    },
    {
      path: "/",
      element: <Home />,
      loader: () => checkLogin(),

    },

    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/buying/:id",
      element: <Buying />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/thanhtoan",
      element: <ThanhToan />
    },


  ])
  // return <div>
  //       <Header/>
  //       <Products/>
  //       <Footer/>

  //   </div>

  return (
    
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
// const Layout = () => {
//   const account = useSelector((state: RootState) => state.account)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (localStorage.getItem('email')) {
//       dispatch(saveUser(localStorage.getItem('email') || ''))
//     }
//   }, [])

//   function logout() {
//     dispatch(clearUser());
//   }

//   return <div>
//     <header className="flex flex-row justify-between">
//       <p>header</p>
//       <p>Email: {account.email} <button onClick={logout}>Logout</button></p>
//     </header>
//     <Outlet />
//     <footer>footer</footer>
//   </div>
// }
export default App
