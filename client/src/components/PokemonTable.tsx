// src/components/PokemonTable.tsx
import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import PokemonRow from "./PokemonRow";
import { PokemonTableProps} from "../types/pokemon";

// Define the PokemonTable component
const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemonDetails,
  columnsConfig,
  onRowClick,
}) => {
  return (
    <Table variant="simple" size="sm" padding="4px 8px">  
      <Thead>
        <Tr>
          {/* Table headers */}
          <Th>ID</Th>
          <Th>Name</Th>
          {columnsConfig.picture && <Th>Picture</Th>}
          {columnsConfig.weight && <Th>Weight</Th>}
          {columnsConfig.height && <Th>Height</Th>}
          {columnsConfig.types && <Th>Types</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {pokemonDetails.map((pokemon) => (
          <PokemonRow
            key={pokemon.id}
            pokemon={pokemon}  
            columnsConfig={columnsConfig}
            onRowClick={onRowClick}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default PokemonTable;
