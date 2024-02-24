import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Complete from './pages/Complete';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complete"
            element={
              <ProtectedRoute>
                <Complete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
