import React, { useEffect, useReducer } from 'react';
import randomWords from 'random-words';
import Header from './components/Header';
import Notification from './components/Notification';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';

const initialState = {
  playable: true,
  correctLetters: [],
  wrongLetters: [],
  showNotification: false,
  word: null,
  finalMessage: '',
};
const checkWin = (correct, wrong, word) => {
  if (word) {
    let status = 'win';
    word.split('').forEach((letter) => {
      if (!correct.includes(letter)) {
        status = '';
      }
    });
    if (wrong.length === 6) status = 'lose';
    return status;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORD':
      return { ...state, word: action.payload };
    case 'ADD_CORRECT_LETTER':
      return {
        ...state,
        correctLetters: [...state.correctLetters, action.payload],
      };
    case 'ADD_WRONG_LETTER':
      return {
        ...state,
        wrongLetters: [...state.wrongLetters, action.payload],
      };
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        showNotification: false,
      };
    case 'PLAY_AGAIN':
      return {
        ...state,
        playable: true,
        correctLetters: [],
        wrongLetters: [],
        finalMessage: '',
      };
    case 'WIN':
      return {
        ...state,
        playable: false,
        finalMessage: 'You won',
      };
    case 'LOSS':
      return {
        ...state,
        playable: false,
        finalMessage: 'You Lost',
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getRandomWord();
  }, []);
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (state.playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (state.word.includes(letter)) {
          if (!state.correctLetters.includes(letter)) {
            dispatch({ type: 'ADD_CORRECT_LETTER', payload: letter });
          } else {
            show();
          }
        } else {
          if (!state.wrongLetters.includes(letter)) {
            dispatch({ type: 'ADD_WRONG_LETTER', payload: letter });
          } else {
            show();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [state.playable, state.correctLetters, state.wrongLetters, state.word]);
  const show = () => {
    dispatch({ type: 'SHOW_NOTIFICATION' });
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' });
    }, 2000);
  };
  const getRandomWord = () =>
    dispatch({ type: 'SET_WORD', payload: randomWords() });

  const playAgain = () => {
    dispatch({ type: 'PLAY_AGAIN' });
    getRandomWord();
  };
  useEffect(() => {
    const checkPlayable = () => {
      if (
        checkWin(state.correctLetters, state.wrongLetters, state.word) === 'win'
      ) {
        dispatch({ type: 'WIN' });
      } else if (
        checkWin(state.correctLetters, state.wrongLetters, state.word) ===
        'lose'
      ) {
        dispatch({ type: 'LOSS' });
      }
    };
    checkPlayable();
  }, [state.correctLetters, state.wrongLetters, state.word]);
  return (
    <>
      <Header />
      <div className='flex-container'>
        <Figure wrongLetters={state.wrongLetters} />
        {state.wrongLetters.length > 0 && (
          <WrongLetters wrongLetters={state.wrongLetters} />
        )}
      </div>
      <Word word={state.word} correctLetters={state.correctLetters} />
      {state.showNotification && <Notification />}
      {!state.playable && (
        <Popup
          message={state.finalMessage}
          word={state.word}
          playAgain={playAgain}
        />
      )}
    </>
  );
};

export default App;
