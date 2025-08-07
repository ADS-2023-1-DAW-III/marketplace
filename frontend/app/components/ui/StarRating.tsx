import React, { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  rating?: number;
  onChange?: (rating: number) => void; 
};

const StarRating: React.FC<StarRatingProps> = ({ rating: ratingProp = 0, onChange }) => {
  const [rating, setRating] = useState(ratingProp);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 cursor-pointer ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
