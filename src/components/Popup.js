import React from 'react';

const Popup = ({ playAgain, message, word }) => {
  return (
    <div className='popup-container'>
      <div className='popup'>
        <h2>{message}</h2>
        {message === 'You Lost' && (
          <h3>Hidden word was : {word.toUpperCase()}</h3>
        )}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
