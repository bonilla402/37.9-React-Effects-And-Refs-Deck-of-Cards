import React from 'react';
import './Board.css';
import Card from './Card';

const Board = () => {
    const sampleCards = [
        { id: 1, title: '9 of Clubs', imageUrl: 'https://deckofcardsapi.com/static/img/9C.png' },
        { id: 2, title: '7 of Spades', imageUrl: 'https://deckofcardsapi.com/static/img/7S.png' },
        { id: 3, title: '2 of Diamonds', imageUrl: 'https://deckofcardsapi.com/static/img/2D.png' },
    ];

    return (
        <div className="board-container">
            <div className="buttons-container">
                <button>Give me a card</button>
                <button>Reshuffle</button>
            </div>
            <div className="board">
                {sampleCards.map((card) => (
                    <Card key={card.id} title={card.title} imageUrl={card.imageUrl} />
                ))}
            </div>
        </div>
    );
};

export default Board;
