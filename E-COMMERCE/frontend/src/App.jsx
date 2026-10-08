import {createBrowserRouter,RouterProvider} from 'react-router'
import Home from './screens/Home.jsx'
import Signin from './screens/Signin.jsx'
import Signup from './screens/Signup.jsx'
import ProductDetails from './screens/ProductDetails.jsx'

export default function App() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([ // router set karne ke liye new approach
  {path:"/",element:<Signin/>},
  {path:"/signup",element:<Signup/>},
  {path:"/home",element:<Home/>},
  {path:"/product/:id",element:<ProductDetails/>}
])
