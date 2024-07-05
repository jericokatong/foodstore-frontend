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
  UserOrders,
  Logout,
} from '../../pages';
import GuardRoute from '../../components/GuardRoute';
import GuestRouteOnly from '../../components/GuestRouteOnly';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route element={<Home />} path="/" />
        {/* GUEST ROUTE */}
        <Route element={<GuestRouteOnly />}>
          <Route element={<Register />} path="/register" />
          <Route element={<RegisterSuccess />} path="/register/berhasil" />
          <Route element={<Login />} path="/login" />
        </Route>

        {/* GUARD ROUTE */}
        <Route element={<GuardRoute />}>
          <Route
            element={<UserAddressAdd />}
            path="/alamat-pengiriman/tambah"
          />
          <Route element={<UserAddress />} path="/alamat-pengiriman" />
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<Invoice />} path="/invoice/:order_id" />
          <Route element={<UserAccount />} path="/account" />
          <Route element={<UserOrders />} path="/pesanan" />
          <Route element={<Logout />} path="/logout" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
