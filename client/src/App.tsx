import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Provider } from 'react-redux';  
import { store } from './store';
import PokemonTablePage from './pages/PokemonTablePage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import { ChakraProvider } from '@chakra-ui/react';  
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <BrowserRouter> 
    <ChakraProvider>
      <div> 
        <Header/>
        <Routes>
          <Route path="/" element={<PokemonTablePage />} />   {/* Main route */}
          <Route path="/:name" element={<PokemonDetailPage />} />   {/* Detail route */}
        </Routes>
      </div>
    </ChakraProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
