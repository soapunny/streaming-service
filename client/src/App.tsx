// client/src/App.tsx

import "@/global.css";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailScreen";
import NavBar from "./components/layout/Navbar";
import SearchScreen from "./screens/SearchScreen";
import WishlistScreen from "./screens/WishlistScreen";
// import EffectsTest from '@/test/effects'
// import CleanupTest from './test/cleanup';
// import TodoList from './test/todo-list';
// import CryptoTracker from './test/crypto-tracker';

function App() {
  return (
    <div className="main-wrapper">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/movie/:id" element={<MovieDetailsScreen />} />
          <Route path="/search/:keyword?" element={<SearchScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
