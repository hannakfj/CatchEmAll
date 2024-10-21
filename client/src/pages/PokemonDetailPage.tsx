import React from 'react';
import { Box, Spinner, Text, Image, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../services/pokemonApi'; 

const PokemonDetailPage: React.FC = () => {
  // Extract the Pokémon name from the URL params
  const { name } = useParams<{ name: string }>();
  
  // Use the name to fetch Pokémon details
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  // Display an error message if the request fails
  if (error || !data) {
    return <Text>Error fetching details for {name}</Text>;
  }

  // Define the Pokémon attributes to display
  const attributes = [
    { label: 'Height', value: `${data.height} dm` },
    { label: 'Weight', value: `${data.weight} hg` },
    { label: 'Base Experience', value: data.base_experience },
    {
      label: 'Abilities',
      value: data.abilities
        .map((ability: { ability: { name: string } }) => ability.ability.name)
        .join(', '),
    },
    {
      label: 'Types',
      value: data.types
        .map((type: { type: { name: string } }) => type.type.name)
        .join(', '),
    },
  ];

  return (
    <Box padding={4} textAlign="center" maxWidth="800px" margin="auto">
      <Heading as="h2" size="xl" mb={4}>
        {data.name.toUpperCase()}
      </Heading>
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        boxSize="200px"
        margin="auto"
        mb={4}
      />
      {/* Display each Pokémon attribute */}
      {attributes.map((attr) => (
        <Text key={attr.label} fontSize="lg" mb={2}>
          <strong>{attr.label}:</strong> {attr.value}
        </Text>
      ))}
    </Box>
  );
};

export default PokemonDetailPage;
