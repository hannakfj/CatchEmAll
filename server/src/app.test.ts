import request from 'supertest';
import app from './server'; 

// The tests are organized into two describe blocks:
// one for the Pokémon list endpoint and another for the Pokémon details endpoint.
describe('Pokémon API', () => {
    // The tests for the Pokémon list endpoint are organized into three test cases
    describe('GET /api/pokemon', () => {
        it('should return a list of Pokémon with limit and offset', async () => {
            const response = await request(app).get('/api/pokemon?limit=10&offset=5');
        
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('results');
            expect(Array.isArray(response.body.results)).toBe(true);
          });

        it('should return an error "wrong parameters"', async () => {
            const response = await request(app).get('/api/pokemon');  

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Invalid query parameters'
          });
        });

        it('should return a 400 error for invalid query parameters', async () => {
            const response = await request(app).get('/api/pokemon?limit=invalid&offset=-5');
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid query parameters');
          });
    });
    // The tests for the Pokémon details endpoint are organized into three test cases
    describe('GET /api/pokemon/:name', () => {
      it('should return the details of a specific Pokémon', async () => {
        const pokemonName = 'pikachu';
        const response = await request(app).get(`/api/pokemon/${pokemonName}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', pokemonName);
      });
  
      it('should return a 404 error if the Pokémon is not found', async () => {
        const pokemonName = 'nonexistentpokemon';
        const response = await request(app).get(`/api/pokemon/${pokemonName}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', `Pokémon "${pokemonName}" not found`);
      });
  
      it('should return a 400 error for invalid Pokémon name', async () => {
        const invalidName = 'pikachu123'; 
        const response = await request(app).get(`/api/pokemon/${invalidName}`);
      
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid Pokémon name');  
      });
      
    });
  });