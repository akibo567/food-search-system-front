import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './screen/search';
import ShopDetail from './screen/shop_detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Search />} />
          <Route path={`/shop_detail`} element={<ShopDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
