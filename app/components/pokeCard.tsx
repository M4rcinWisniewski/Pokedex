/* eslint-disable @next/next/no-img-element */

import { Pokemon } from '../types/pokemon'; // Make sure you have the correct type

interface PokeCardProps {
  pokemon: Pokemon;
  shiny: boolean; 
  gender: boolean;// Specify the correct type for the pokemon prop
}

const PokeCard = ({ pokemon, shiny, gender}: PokeCardProps) => {
  const imageSrcMale = shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default
  const imageSrcFemale = shiny ? pokemon.sprites.front_shiny_female : pokemon.sprites.front_female
  let type = ''
  if(pokemon.types.length > 1) {
    type = 'TYPES'
  }
  else {
    type = 'TYPE'
  }

  return (
    <div className="pokemon-card flex flex-col justify-center items-center font-medium">
      <h6></h6>
      <h2 className='text-4xl 	'>{shiny ? `SHINY ${pokemon.name.toUpperCase()} ` : pokemon.name.toUpperCase() } #{pokemon.id} </h2>
      <img
        className='w-[15vw]' 
        src={gender ? imageSrcFemale : imageSrcMale} 
        alt={pokemon.name} 

      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>{type}</p>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.slot}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokeCard;
