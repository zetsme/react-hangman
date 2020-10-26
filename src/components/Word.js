import React from 'react';

const Word = ({ word, correctLetters }) => {
  if (word) {
    return (
      <div className='word'>
        {word.split('').map((letter, index) => {
          return (
            <span key={index} className='letter'>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          );
        })}
      </div>
    );
  }
  return null;
};

export default Word;
