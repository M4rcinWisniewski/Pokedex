import axios from 'axios';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (idOrName: string) => {
  try {
    const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};
