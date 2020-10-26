import React from 'react';

const WrongLetters = ({ wrongLetters }) => {
  return (
    <div className='wrong-letters'>
      <div>
        <p>Wrong :</p>
      </div>
      {wrongLetters
        .map((letter, index) => {
          return <span key={index}>{letter}</span>;
        })
        .reduce((acc, cur) => (acc === null ? [cur] : [acc, ', ', cur]), null)}
    </div>
  );
};

export default WrongLetters;
