import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Contact from "./Containers/Contact/Contact";
import Home from "./Containers/Home/Home";
import Telescope from "./Containers/Telescope/Telescope";
import Promotion from "./Containers/Promotion/Promotion";
import NotFound from "./Containers/NotFound/NotFound";
import Cart from "./Containers/Cart/Cart";
import TelescopeProduct from "./Containers/TelescopeProduct/TelescopeProduct";
import PromotionProduct from "./Containers/PromotionProduct/PromotionProduct";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search/Search";

function App() {
  return (
    <>
      <Header />
      <Routes  basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Home />} />
        <Route path="/telescope" element={<Telescope />} />
        <Route path="/telescope/ref_=:id" element={<TelescopeProduct />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/promotion/ref_=:id" element={<PromotionProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/search/' element={<Search />} />
        <Route path='/search/query_=:query' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
