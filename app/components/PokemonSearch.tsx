'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/Tabs"
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokeCard from './pokeCard';
import Pokemon from '../types/pokemon'; // Assuming you have a types file for the Pokemon type
import { Switch } from './shadcn/Switch';
import { Button } from './shadcn/Button';
import { OrbitProgress } from "react-loading-indicators";

export default function PokeSearch() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Initialize state to hold Pokemon data
    const [loading, setLoading] = useState<boolean>(false); // Start as not loading
    const [selectedPokemon, setSelectedPokemon] = useState<string>('pikachu'); // Holds the selected Pokemon after click
    const [inputValue, setInputValue] = useState<string>(''); // Holds the value of input field while typing
    const [error, setError] = useState<string | null>(null); // Error state to handle API errors
    const [gender, setGender] = useState<boolean>(false)
    // Handle input change
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value); // Update input value while typing
    };
  

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
    
    const pokeSearch = (isShiny: boolean) => {
        return (
        <>
        {loading ? (
            <div className="flex justify-center items-center py-[15vh]">
                <OrbitProgress variant="disc" color="#ff0000" size="medium" text="" textColor="" />
            </div> // Show loading state while fetching
          ) : error ? (
            <div>{error}</div> // Show error message if API call fails
          ) : (
            pokemon && <PokeCard pokemon={pokemon} shiny={isShiny} gender={gender}/>
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
              <Switch onClick={toggleGender}/>
            </div>
        </div> 
        </>
    )}

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-2 pb-20 gap-4 sm: font-[family-name:var(--font-geist-sans)]">

        <Tabs defaultValue="Normal" className="w-[40vw] flex justify-center items-center flex-col">
            <TabsList className="flex justify-center items-center gap-4 w-[15vw]">
                <TabsTrigger value="Normal">Normal</TabsTrigger>
                <TabsTrigger value="Shiny">Shiny</TabsTrigger>
            </TabsList>
            <TabsContent value="Normal">
                {pokeSearch(false)}
  
            </TabsContent>
            <TabsContent value="Shiny">
                {pokeSearch(true)}
            </TabsContent>
        </Tabs>

      </div>
    );
}
