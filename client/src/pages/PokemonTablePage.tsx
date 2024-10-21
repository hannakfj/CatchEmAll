import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGetPokemonsQuery } from '../services/pokemonApi'; 
import { PokemonDetails, ColumnConfig } from '../types/pokemon';
import PokemonTable from '../components/PokemonTable';
import ColumnToggle from '../components/ColumnToggle';

const PokemonTablePage: React.FC = () => {
  const [page, setPage] = useState(0); // Add pagination state
  const limit = 10; // Set a limit of Pokémon to fetch per page
  const offset = page * limit;

  // Fetch paginated Pokémon data
  const { data, error, isLoading } = useGetPokemonsQuery({ limit, offset });

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const navigate = useNavigate();

  // Load initial column configuration from localStorage or use default
  const [columnsConfig, setColumnsConfig] = useState<ColumnConfig>(() => {
    const savedConfig = localStorage.getItem('pokemonTableConfig');
    return savedConfig
      ? JSON.parse(savedConfig)
      : { picture: true, weight: true, height: true, types: true }; // Default configuration
  });

  // Fetch detailed data for each Pokémon in the paginated list
  useEffect(() => {
    const fetchDetails = async () => {
      if (data?.results) {
        try {
          setDetailsLoading(true);
          const detailsPromises = data.results.map(async (pokemon: { name: string; url: string }) => {
            const response = await fetch(pokemon.url); // Fetch detailed data for each Pokémon
            if (!response.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            return response.json();
          });
          const details = await Promise.all(detailsPromises);
          setPokemonDetails(details);
          setDetailsLoading(false);
        } catch (error) {
          setDetailsError(true);
          setDetailsLoading(false);
        }
      }
    };
    fetchDetails();
  }, [data]);

  // Navigate to the detailed page of the clicked Pokémon
  const handleRowClick = (pokemonName: string) => {
    navigate(`/${pokemonName}`);
  };

  // Persist column configuration in localStorage
  useEffect(() => {
    localStorage.setItem('pokemonTableConfig', JSON.stringify(columnsConfig));
  }, [columnsConfig]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text>Error fetching Pokémon data</Text>;
  }

  return (
    <Box padding={4} maxWidth="1000px" margin="auto">
      <ColumnToggle columnsConfig={columnsConfig} setColumnsConfig={setColumnsConfig} />
      
      {/* Display loading spinner if details are loading */}
      {detailsLoading && <Spinner size="lg" />}
      
      {/* Display error message if there is an error in fetching details */}
      {detailsError && <Text>Error fetching Pokémon details</Text>}
      <PokemonTable
        pokemonDetails={pokemonDetails}
        columnsConfig={columnsConfig}
        onRowClick={handleRowClick}
      />

      {/* Pagination controls */}
      <Flex justifyContent="space-between" mt={4}>
        <Button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!data?.results.length}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default PokemonTablePage;
