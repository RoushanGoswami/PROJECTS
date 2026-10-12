import {createBrowserRouter,RouterProvider} from 'react-router'
import Home from './screens/Home.jsx'
import Signin from './screens/Signin.jsx'
import Signup from './screens/Signup.jsx'
import ProductDetails from './screens/ProductDetails.jsx'
import ProductList from './admin/ProductList.jsx'
import AddProduct from './admin/AddProduct.jsx'
import EditProduct from './admin/EditProduct.jsx'

export default function App() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([ // router set karne ke liye new approach
  {path:"/",element:<Signin/>},
  {path:"/signup",element:<Signup/>},
  {path:"/home",element:<Home/>},
  {path:"/product/:id",element:<ProductDetails/>},
  // admin pages
  {path:"/admin/products",element:<ProductList/>},
  {path:"/admin/products/add",element:<AddProduct/>},
  {path:"/admin/products/:id/edit",element:<EditProduct/>}
])