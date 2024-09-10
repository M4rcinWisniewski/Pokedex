// types/pokemon.ts

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      back_default: string;
      front_shiny: string;
      front_female: string;
      front_shiny_female:string;
      other: {
        'official-artwork': {
          front_default: string;
          
        };
      };
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
      };
    }>;
    abilities: Array<{
      ability: {
        name: string;
      };
      is_hidden: boolean;
      slot: number;
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
  }

export default Pokemon