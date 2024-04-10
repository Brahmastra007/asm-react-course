import { useState, useEffect } from 'react';

// We create the 'Meals' component for displaying all the meals available
export default function Meals() {
  // State for managing all the meals loaded from the backend
  const [loadedMeals, setLoadedMeals] = useState([]);

  // Fetching the meals data from backend via HTTP request
  // Using 'useEffect' hook so that we don't cause infinite loop
  // No dependencies present which means that the hook will run exactly once after component renders
  useEffect(() => {
    async function fetchMeals() {
      // Fetching meals data
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        // ...
      }

      const meals = await response.json();
      // Setting received meals data in the 'loadedMeals' state
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
