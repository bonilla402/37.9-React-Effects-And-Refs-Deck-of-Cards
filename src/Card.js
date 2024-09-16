import React from 'react';
import './Card.css';

const Card = ({ imageUrl, title }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} />
        </div>
    );
};

export default Card;