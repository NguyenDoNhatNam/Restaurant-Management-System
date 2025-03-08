import React from 'react';
import 'ionicons';
const Rating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
        } else if (rating >= i - 0.5) {
            stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-500"></i>);
        } else {
            stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
        }
    }

    return <div>{stars}</div>;
};

export default Rating;
