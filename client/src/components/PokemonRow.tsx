import React from "react";
import { Tr, Td, Image, Text } from "@chakra-ui/react";
import { PokemonRowProps} from "../types/pokemon";

  // Define the PokemonRow component
  const PokemonRow: React.FC<PokemonRowProps> = ({
    pokemon,
    columnsConfig,
    onRowClick,
  }) => {
    // Extract the necessary data from the Pokemon object
    const { id, name, sprites, weight, height, types } = pokemon;

    return (
      <Tr onClick={() => onRowClick(name)} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} height="80px">
        {/* ID Column */}
        <Td padding="4px 8px">
          <Text fontWeight="bold" fontSize="sm" whiteSpace="nowrap">
            {id}
          </Text>
        </Td>
    
        {/* Name Column */}
        <Td padding="4px 8px">
          <Text fontWeight="bold" fontSize="sm" whiteSpace="nowrap">
            {name.toUpperCase()}
          </Text>
        </Td>
    
        {/* Picture Column */}
        {columnsConfig.picture && (
          <Td padding="4px 8px" maxW="50px">
            <Image src={sprites.front_default} alt={name} boxSize="70px" />
          </Td>
        )}
    
        {/* Weight Column */}
        {columnsConfig.weight && (
          <Td padding="4px 8px">
            <Text fontSize="sm">{weight} hg</Text>
          </Td>
        )}
    
        {/* Height Column */}
        {columnsConfig.height && (
          <Td padding="4px 8px">
            <Text fontSize="sm">{height} dm</Text>
          </Td>
        )}
    
        {/* Types Column */}
        {columnsConfig.types && (
          <Td padding="4px 8px">
            <Text fontSize="sm" whiteSpace="nowrap">
              {types.map((type) => type.type.name).join(", ")}
            </Text>
          </Td>
        )}
      </Tr>
    );
    
  };
  
  export default PokemonRow;