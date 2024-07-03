// import './App.css';
import { Routes } from './config';
import { Provider } from 'react-redux';
import store from './config/Redux/store';
import { listen } from './features/listener';
import { useEffect } from 'react';
import { getCart } from './api/cart';

function App() {
  useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
