import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {colors, math} from './utils/game.utils';


const PlayNumber = props => (
  <button className="number" onClick={() => console.log(props.number)}>{props.number}</button>
)

const StarMatch = () => {
  const [stars, setStars] = useState(math.random(1,9));
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          
          {math.range(1, stars).map(starID => 
            <div key={starID} className="star" />
          )}
        </div>
        <div className="right">
          {math.range(1, 9).map(numID => 
            <PlayNumber key={numID} number={numID} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

ReactDOM.render(<StarMatch />, document.getElementById('root'));

