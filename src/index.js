import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {colors, math} from './utils/game.utils';

const StarsDisplay = props => {
  return (
    <>
      {math.range(1, props.count).map(starID =>
        <div key={starID} className="star" />
      )}
    </>
  )
};

const PlayNumber = props => (
  <button 
    className="number"
    style={{backgroundColor: colors[props.status]}}
    onClick={() => props.onClick(props.number, props.status)}>
      {props.number}
  </button>
)

const PlayAgain = props => (
  <div className='game-done'>
    <button onClick={props.onClick}>Play Again</button>
  </div>
)

const StarMatch = () => {
  const [stars, setStars] = useState(math.random(1,9));
  const [availableNums,setAvailableNums] = useState(math.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const isCandidatesWrong = math.sum(candidateNums) > stars;
  const isGameDone = availableNums.length === 0;

  const resetGame = () => {
    // this is enough when there is not side efects
    setStars(math.random(1, 9));
    setAvailableNums(math.range(1, 9));
    setCandidateNums([]);
  }

  const numberStatus = number => {
    if(!availableNums.includes(number)) return 'used';

    if(candidateNums.includes(number)) {
      return isCandidatesWrong ? 'wrong' : 'candidate'
    }

    return 'available';
  }

  const onNumberClick = (number, currentStatus) => {
    if(currentStatus === 'used') return;
    
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cNum => cNum !== number);
    if(math.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums)
    } else {
      const newAvailabeNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(math.randomSumIn(newAvailabeNums, 9));
      setAvailableNums(newAvailabeNums);
      setCandidateNums([]);
    }
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">

        <div className="left">
          {isGameDone ? (
            <PlayAgain onClick={resetGame} />
          ) : (
            <StarsDisplay count = { stars } />
          ) 
          }
        </div>

        <div className="right">
          {math.range(1, 9).map(number => 
            <PlayNumber 
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          )}
        </div>

      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

ReactDOM.render(<StarMatch />, document.getElementById('root'));

