import React from "react";

const FoodSlide = ({ item }) => {
  return (
    <div className="tranding-slide p-4">
      <div className="tranding-slide-img">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="tranding-slide-content text-center mt-4">
        <h1 className="food-price text-2xl font-bold text-green-600">
          {item.price}
        </h1>
        <h2 className="food-name text-xl font-semibold">{item.name}</h2>

        <h3 className="food-rating flex items-center justify-center mt-2 text-yellow-500">
          <div className="rating flex">
            {[...Array(5)].map((_, i) => (
              <ion-icon
                key={i}
                name={i < Math.floor(item.rating) ? "star" : "star-outline"}
                className="text-yellow-400"
              ></ion-icon>
            ))}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default FoodSlide;
