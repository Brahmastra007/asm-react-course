import MealItem from './meal-item';
import classes from './meals-grid.module.css';

// Defining meals grid for displaying all the meals
export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          {/* Spreading all the attributes of meal so they can be accessed individually through props */}
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
