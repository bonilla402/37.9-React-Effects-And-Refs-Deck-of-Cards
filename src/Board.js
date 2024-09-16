import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';
import Card from './Card';

const Board = () => {
    const [deckId, setDeckId] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Make the API call to shuffle a new deck
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
                // Store the deck ID in state
                const id = response.data.deck_id;
                setDeckId(id);

                // Log the deck ID to the console
                console.log('Deck ID:', id);

                // Set loading to false
                setLoading(false);
            })
            .catch(error => {
                // Show error in an alert
                alert('Failed to fetch deck. Please try again later.');
                console.error('Error fetching deck:', error);

                // Set loading to false
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs only once

    const sampleCards = [
        { id: 1, title: '9 of Clubs', imageUrl: 'https://deckofcardsapi.com/static/img/9C.png' },
        { id: 2, title: '7 of Spades', imageUrl: 'https://deckofcardsapi.com/static/img/7S.png' },
        { id: 3, title: '2 of Diamonds', imageUrl: 'https://deckofcardsapi.com/static/img/2D.png' },
    ];

    return (
        <div className="board-container">
            {
                loading 
                    ? (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>) 
                    : (
                        <>
                            <div className="buttons-container">
                                <button>Give me a card</button>
                                <button>Reshuffle</button>
                            </div>
                            <div className="board">
                                {deckId && sampleCards.map((card) => (
                                    <Card key={card.id} title={card.title} imageUrl={card.imageUrl}/>
                                ))}
                            </div>
                        </>)
            }
        </div>
    );
};

export default Board;
