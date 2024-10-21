import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
  return (
    <Link to={`/${name}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={6}
        textAlign="center"
        backgroundColor="white"
        boxShadow="md"
        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
      >
        <Text fontWeight="bold" fontSize="xl" mt={4}>
          {name.toUpperCase()}
        </Text>
      </Box>
    </Link>
  );
};

export default PokemonCard;
