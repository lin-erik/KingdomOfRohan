import React from 'react';

function MoodRatings({ movie, moods, reviewCount }) {
  if (!reviewCount) {
    return null;
  } else {
    return (
      <div className="columns">
        {moods.length > 0 ? (
          <div className="column" style={{ textAlign: 'center' }}>
            <progress
              className="progress is-success"
              value={`${movie[moods[0]]}`}
              max={reviewCount}
            />
            {Math.floor((movie[moods[0]] / reviewCount) * 100) +
              '% of users rated this movie ' +
              moods[0]}
          </div>
        ) : (
          <div />
        )}
        {moods.length > 1 ? (
          <div className="column" style={{ textAlign: 'center' }}>
            <progress
              className="progress is-primary"
              value={`${movie[moods[1]]}`}
              max={reviewCount}
            />
            {Math.floor((movie[moods[1]] / reviewCount) * 100) +
              '% of users rated this movie ' +
              moods[1]}
          </div>
        ) : (
          <div />
        )}
        {moods.length > 2 ? (
          <div className="column" style={{ textAlign: 'center' }}>
            <progress
              className="progress is-warning"
              value={`${movie[moods[2]]}`}
              max={reviewCount}
            />
            {Math.floor((movie[moods[2]] / reviewCount) * 100) +
              '% of users rated this movie ' +
              moods[2]}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default MoodRatings;
