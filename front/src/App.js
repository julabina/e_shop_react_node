import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Contact from "./Containers/Contact/Contact";
import Home from "./Containers/Home/Home";
import Musique from "./Containers/Musique/Musique";
import Telescope from "./Containers/Telescope/Telescope";
import Promotion from "./Containers/Promotion/Promotion";
import NotFound from "./Containers/NotFound/NotFound";
import Chien from "./Containers/Chien/Chien";
import Cart from "./Containers/Cart/Cart";
import MusiqueProduct from "./Containers/MusiqueProduct/MusiqueProduct";
import TelescopeProduct from "./Containers/TelescopeProduct/TelescopeProduct";
import ChienProduct from "./Containers/ChienProduct/ChienProduct";
import PromotionProduct from "./Containers/PromotionProduct/PromotionProduct";

function App() {
  return (
    <>
      <Header />
      <Routes  basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Home />} />
        <Route path="/musique" element={<Musique />} />
        <Route path="/musique/:id" element={<MusiqueProduct />} />
        <Route path="/telescope" element={<Telescope />} />
        <Route path="/telescope/:id" element={<TelescopeProduct />} />
        <Route path="/chien" element={<Chien />} />
        <Route path="/chien/:id" element={<ChienProduct />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/promotion/:id" element={<PromotionProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
