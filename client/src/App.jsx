import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import Layout from './components/layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicDemo from './features/products/Product';
import Register from './features/auth/register';
import Login from './features/auth/login';
import Basket from './features/basket/Basket';
import ProductsDemo from './features/products/ProductAdmin';
import SingleProduct from "./features/products/SingleProduct";
import Home from "./components/Home";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home/>} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/product' element={<BasicDemo />} />
            <Route path='/productManaget' element={<ProductsDemo />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<SingleProduct />} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
