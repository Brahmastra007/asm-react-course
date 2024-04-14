import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';

// Defining this config object outside of the component so that it doesn't get recreated everytime
// the component loads which can cause infinite loops
const requestConfig = {};

export default function Meals() {
  // Using 'useHttp' hook to send HTTP requests
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  // If loading, show the user the relevant message
  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  // if (!data) {
  //   return <p>No meals found.</p>
  // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
