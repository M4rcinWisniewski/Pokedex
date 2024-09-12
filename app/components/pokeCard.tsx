/* eslint-disable @next/next/no-img-element */

import { Pokemon } from '../types/pokemon'; // Make sure you have the correct type
import { Badge } from './shadcn/Badge';

interface PokeCardProps {
  pokemon: Pokemon;
  shiny: boolean; 
  gender: boolean; // Specify the correct type for the pokemon prop
}

// Mapping Pokemon types to the allowed badge variants
const pokemonTypeToVariant = {
  dragon: "dragon",
  flying: "flying",
  fire: "fire",
  water: "water",
  grass: "grass",
  electric: "electric",
  ice: "ice",
  fighting: 'fighting',
  poison: 'poison',
  ground: 'ground',
  psychic: 'psychic',
  bug: 'bug',
  rock: 'rock',
  ghost: 'ghost',
  dark: 'dark',
  steel: 'steel',
  fairy: 'fairy',
  normal: 'normal'
  // Add more type mappings as necessary
} as const;

const PokeCard = ({ pokemon, shiny, gender }: PokeCardProps) => {
  const imageSrcMale = shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
  const imageSrcFemale = shiny ? pokemon.sprites.front_shiny_female : pokemon.sprites.front_female;

  return (
    <div className="pokemon-card flex flex-col justify-center items-center font-medium">
      <h2 className='text-4xl'>
        {shiny ? `SHINY ${pokemon.name.toUpperCase()} ` : pokemon.name.toUpperCase()} #{pokemon.id}
      </h2>
      <img
        className='w-[15vw] min-w-64'
        src={gender ? imageSrcFemale : imageSrcMale}
        alt={gender ? `${pokemon.name} female` :  `${pokemon.name} male` }
      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <ul className='flex justify-center items-center gap-2 py-2'>
        {pokemon.types.map((type) => {
          // Map Pokémon type to the badge variant, or use 'default' if no match
          const variant = pokemonTypeToVariant[type.type.name as keyof typeof pokemonTypeToVariant] || "default";
          
          return (
            <Badge key={type.slot} variant={variant}>
              <li>{type.type.name}</li>
            </Badge>
          );
        })}
      </ul>
    </div>
  );
};

export default PokeCard;
