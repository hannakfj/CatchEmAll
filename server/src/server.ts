import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { query, param, validationResult } from 'express-validator';

dotenv.config();

const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const pokeApiUrl = process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2/pokemon';

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// In-memory cache
const cache = new Map<string, any>();
const CACHE_DURATION = 1000 * 60 * 10; // Cache data for 10 minutes

// Helper function to check if the cache is still valid
const isCacheValid = (timestamp: number) => {
  const now = Date.now();
  return now - timestamp < CACHE_DURATION;
};

//get a list of pokemons
app.get(
  '/api/pokemon',
  [
    query('limit').isInt({ min: 1, max: 100 }).default(20),
    query('offset').isInt({ min: 0 }).default(0),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: 'Invalid query parameters' });
      return;
    }
    const limit = req.query.limit;
    const offset = req.query.offset;
    const cacheKey = `pokemon-list-${limit}-${offset}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData && isCacheValid(cachedData.timestamp)) {
      console.log('Serving from cache');
      res.json(cachedData.data);
      return;
    }

    try {
      const { data } = await axios.get(`${pokeApiUrl}?offset=${offset}&limit=${limit}`);
      cache.set(cacheKey, { data, timestamp: Date.now() });
      console.log('Serving from API');
      res.json(data);
    } catch (error: any) {
      console.error('Error fetching Pokémon data:', error.message);

      if (error.response?.status === 404) {
        res.status(404).json({ error: 'Resource not found' });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        res.status(400).json({ error: 'Bad request' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
);


// Get a specific pokemon by name
app.get(
  '/api/pokemon/:name', 
  [
    // Validate the Pokémon name parameter
    param('name')
      .isString()
      .trim()
      .matches(/^[a-zA-Z-]+$/) // Ensure the name only contains valid characters
      .withMessage('Invalid Pokémon name'),
  ], 

  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     res.status(400).json({ error: errors.array()[0].msg });
      
    }
    const pokemonName = req.params.name.toLowerCase(); // Normalize input to lowercase

    try {
      const cacheKey = `pokemon-${pokemonName}`;
      const cachedData = cache.get(cacheKey);

      // Check if cached data exists and is valid
      if (cachedData && isCacheValid(cachedData.timestamp)) {
        console.log('Serving from cache');
        res.json(cachedData.data);  // Return cached data
        return; 
      }

      // If no valid cache, make the request to PokeAPI
      const response = await axios.get(`${pokeApiUrl}/${pokemonName}`);
      
      // If the request is successful, cache the data and send it back to the client
      if (response.status === 200) {
        cache.set(cacheKey, { data: response.data, timestamp: Date.now() });  
        console.log('Serving from API');
        res.json(response.data);  // Send the data back to the client
      } else {
        res.status(404).json({ error: 'Pokémon not found' });
      }
    
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (Pokémon not found)
        res.status(404).json({ error: `Pokémon "${pokemonName}" not found` });
      } else {
        console.error('Error fetching Pokémon data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;