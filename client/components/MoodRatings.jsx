import React from 'react';


function MoodRatings({ movie, moods, reviewCount }) {
  var dbMoods = [
    'whimsical',
    'intense',
    'thriller',
    'heartfelt',
    'gripping',
    'boring',
    'thought provoking',
    'uplifting',
    'light',
    'tear jerker',
    'challenging',
    'mind screw',
    'nostalgic',
    'powerful',
    'despair',
    'exhausting',
    'paranoid',
    'motivated',
    'uncomfortable'
  ];
  if (!reviewCount) {
    return null;
  } else {
    var topMoods = moods;
    console.log(topMoods);
    if (moods === []) {
      dbMoods.forEach(mood => {
        topMoods.push({ mood: mood, count: movie[mood] || 0 });
        console.log(topMoods);
      });
      topMoods.sort((a, b) => {
        a.count - b.count;
      });
      topMoods = topMoods.slice(0, 3);
    }
    console.log(moods);
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
