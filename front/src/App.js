import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Contact from "./Containers/Contact/Contact";
import Home from "./Containers/Home/Home";
import Telescope from "./Containers/Telescope/Telescope";
import Promotion from "./Containers/Promotion/Promotion";
import NotFound from "./Containers/NotFound/NotFound";
import Cart from "./Containers/Cart/Cart";
import TelescopeProduct from "./Containers/TelescopeProduct/TelescopeProduct";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search/Search";
import Oculaire from "./Containers/Oculaire/Oculaire";
import OculaireProduct from "./Containers/OculaireProduct/OculaireProduct";
import Monture from './Containers/Monture/Monture';
import MontureProduct from './Containers/MontureProduct/MontureProduct';
import About from "./Containers/About/About";
import Legals from "./Containers/Legals/Legals";
import Cgu from "./Containers/Cgu/Cgu";
import ToTop from "./Components/ToTop/ToTop";
import Login from "./Containers/Login/Login";
import UserAccount from "./Containers/userAccount/UserAccount";

function App() {
  return (
    <>
      <Header />
      <ToTop />
      <Routes  basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userAccount" element={<UserAccount />} />
        <Route path="/telescope" element={<Telescope />} />
        <Route path="/telescope/ref_=:id" element={<TelescopeProduct />} />
        <Route path="/oculaire" element={<Oculaire />} />
        <Route path="/oculaire/ref_=:id" element={<OculaireProduct />} />
        <Route path="/monture" element={<Monture />} />
        <Route path="/monture/ref_=:id" element={<MontureProduct />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path='/search/' element={<Search />} />
        <Route path='/search/query_=:query' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
