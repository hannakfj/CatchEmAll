export interface PokemonSprites {
    front_default: string;
  }
  
  export interface PokemonType {
    type: {
      name: string;
    };
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: PokemonSprites;
    types: PokemonType[];
  }
  
  export interface ColumnConfig {
    picture: boolean;
    weight: boolean;
    height: boolean;
    types: boolean;
  }
  
  export interface PokemonRowProps {
    pokemon: PokemonDetails;
    columnsConfig: ColumnConfig;
    onRowClick: (pokemonName: string) => void;
  }

  export interface PokemonTableProps {
    pokemonDetails: PokemonDetails[];
    columnsConfig: ColumnConfig;
    onRowClick: (pokemonName: string) => void;
  }