import React from 'react';
import MovieCard from './MovieCard.jsx';

var Recommendations = (props) => {
    return (
    <div className="container is-fluid">
        <div className="columns is-multiline">
            {props.recs.length !== 0 ? (
            props.recs.map((movie) => {
                return (
                    <div className="column is-one-fifth">
                        <MovieCard movie={movie} />
                    </div>
                );
            })
            ) : (
            <div>No Recommendations For You</div>
        )}
        </div>
    </div>
    );
};

export default Recommendations;
