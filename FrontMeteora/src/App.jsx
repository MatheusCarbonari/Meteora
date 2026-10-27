import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DefaultPage from "./Pages/DefaultPage";
import Catalog from "./Pages/Catalog";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="produto/:slug" element={<ProductDetails />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
