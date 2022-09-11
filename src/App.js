import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinsPage from "./pages/coins-page";
import FavoritesPage from "./pages/favorites-page";
import ExchangesPage from "./pages/exchanges-page";
import ErrorPage from "./pages/error-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<CoinsPage />} />
          <Route path="coins" element={<CoinsPage />} />
          <Route path="exchanges" element={<ExchangesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
