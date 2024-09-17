import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Board.css';
import Card from './Card';

const Board = () => {
    const deckIdRef = useRef(null);  // useRef to store deckId
    const [loading, setLoading] = useState(true);
    const [drawnCards, setDrawnCards] = useState([]); // Array to store drawn cards

    const drawCard = () => {
        if (deckIdRef.current) {
            axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`)
                .then(response => {
                    if (response.data.remaining === 0) {
                        alert('Error: no cards remaining!');
                    } else {
                        const card = response.data.cards[0];
                        const formattedCard = {
                            id: card.code,
                            title: `${card.value} of ${card.suit}`,
                            imageUrl: card.image,
                        };
                        setDrawnCards(prevCards => [...prevCards, formattedCard]);
                        console.log('Drawn Card:', formattedCard);
                    }
                })
                .catch(error => {
                    alert('Failed to draw a card. Please try again later.');
                    console.error('Error drawing card:', error);
                });
        }
    };

    const shuffleDeck = () => {
        if (deckIdRef.current) {
            setLoading(true);
            axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`)
                .then(() => {
                    setDrawnCards([]);
                    console.log('Deck shuffled');
                    drawCard();
                })
                .catch(error => {
                    alert('Failed to shuffle the deck. Please try again later.');
                    console.error('Error shuffling deck:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
                deckIdRef.current = response.data.deck_id;
                console.log('Deck ID:', deckIdRef.current);
                drawCard();
                setLoading(false);
            })
            .catch(error => {
                alert('Failed to fetch deck. Please try again later.');
                console.error('Error fetching deck:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="board-container">
            {loading ? (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    <div className="buttons-container">
                        <button onClick={drawCard}>Give me a card</button>
                        <button onClick={shuffleDeck}>Reshuffle</button>
                    </div>
                    <div className="board">
                        {drawnCards.map((card) => (
                            <Card key={card.id} title={card.title} imageUrl={card.imageUrl} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Board;
