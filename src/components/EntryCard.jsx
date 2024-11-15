import React from 'react';

const EntryCard = ({ entry }) => {
  return (
    <div className="entry-card">
      <img src={entry.coverImage} alt={entry.title} className="entry-image" />
      <h4 className="entry-title">{entry.title}</h4>
      <p className="entry-date">{entry.date}</p>
      <button className="favorite-button">
        {entry.isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
};

export default EntryCard;
