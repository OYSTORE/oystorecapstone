import Cards from "./Cards";

const PopularDish = () => {
    return (
        <div className="flex  items-center justify-center flex-wrap w-full">
              {currentDishes.map(dish => (<Cards key={dish.id} dish={dish} addToCart={addToCart} />) )}
        </div>
    );
}
 
export default PopularDish;