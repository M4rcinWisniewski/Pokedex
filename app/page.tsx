'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokeCard from './components/pokeCard';
import Pokemon from './types/pokemon'; // Assuming you have a types file for the Pokemon type
import { Switch } from './components/shadcn/Switch';
import { Button } from './components/shadcn/Button';
export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Initialize state to hold Pokemon data
  const [loading, setLoading] = useState<boolean>(false); // Start as not loading
  const [selectedPokemon, setSelectedPokemon] = useState<string>('pikachu'); // Holds the selected Pokemon after click
  const [inputValue, setInputValue] = useState<string>(''); // Holds the value of input field while typing
  const [error, setError] = useState<string | null>(null); // Error state to handle API errors
  const [shiny, setShiny] = useState<boolean>(false);
  const [gender, setGender] = useState<boolean>(false)
  // Handle input change
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value); // Update input value while typing
  };

  const toggleShiny = () => {
    setShiny(!shiny)
  }
  const toggleGender = () => {
    setGender(!gender)
  }
  // Handle button click to search
  const handleSearchClick = () => {
    setSelectedPokemon(inputValue.trim().toLowerCase());
    // setShiny(false); // Set the selected Pokemon when the button is clicked
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick(); // Trigger search if Enter is pressed
    }
  };

  useEffect(() => {
    // Only fetch if selectedPokemon is not empty
    if (!selectedPokemon) return;

    const fetchPokemon = async () => {
      setLoading(true); // Start loading when API call begins
      setError(null); // Reset error state before a new request
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
        setPokemon(response.data); // Store the data in state
      } catch (error) {
        setError('Pokémon not found or API error');
        setPokemon(null); // Reset Pokemon state if error occurs
      } finally {
        setLoading(false); // Stop loading when API call finishes
      }
    };

    fetchPokemon(); // Call the function to fetch the data when selectedPokemon changes
  }, [selectedPokemon]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {loading ? (
          <div>Loading...</div> // Show loading state while fetching
        ) : error ? (
          <div>{error}</div> // Show error message if API call fails
        ) : (
          pokemon && <PokeCard pokemon={pokemon} shiny={shiny} gender={gender}/>
        )}
      <div className="flex flex-col gap-4 justify-center items-center">   
          <input 
          type="text" 
          value={inputValue} // Bind input field to inputValue state
          onChange={handleInputChange} // Update inputValue when typing
          placeholder="Enter Pokémon name" 
          className="text-black p-2 border rounded" 
          onKeyDown={handleKeyDown}
        />
          
          <Button onClick={handleSearchClick} variant={'default'}>Find Pokemon</Button>
          <div className='flex justify-center items-center gap-2'>
            <Switch onClick={toggleShiny}/>
            <Switch onClick={toggleGender}/>
          </div>
      </div> 

    </div>
  );
}
