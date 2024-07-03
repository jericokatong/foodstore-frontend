import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';
import {
  Home,
  Register,
  RegisterSuccess,
  Login,
  UserAddressAdd,
  UserAddress,
  Checkout,
  Invoice,
  UserAccount,
} from '../../pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<RegisterSuccess />} path="/register/berhasil" />
        <Route element={<Login />} path="/login" />
        <Route element={<UserAddressAdd />} path="/alamat-pengiriman/tambah" />
        <Route element={<UserAddress />} path="/alamat-pengiriman" />
        <Route element={<Checkout />} path="/checkout" />
        <Route element={<Invoice />} path="/invoice/:order_id" />
        <Route element={<UserAccount />} path="/account" />
      </Switch>
    </Router>
  );
};

export default Routes;
