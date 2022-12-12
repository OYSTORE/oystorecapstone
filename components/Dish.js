
const Dish = ({}) => {
    return (
        <div className="flex flex-col py-10">
          <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">Featured Dishes</h1>
          <div className="flex  items-center justify-center flex-wrap w-full">
              {dishes.map(dish => (<Cards 
              key={dish.id} 
              name={dish.name}
              price={dish.price}
              unit={dish.unit}
              main_category={dish.main_category}
              sub_category={dish.sub_category}
              ratings={dish.ratings}
              reviews={dish.reviews}
              served_by={dish.served_by}

              />) )}
          </div>
      </div>
    );
}
 
export default Dish;