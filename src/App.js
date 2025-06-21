import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsProvider } from './context/ItemsContext';
import Navbar from './components/Navbar/Navbar';
import ViewItemsPage from './pages/ViewItemsPage';
import AddItemPage from './pages/AddItemPage';
import './App.css';

function App() {
  return (
    <ItemsProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ViewItemsPage />} />
              <Route path="/add" element={<AddItemPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ItemsProvider>
  );
}

export default App;