import React, { useState } from 'react';
import likeIcon from '../../assets/icons/like.png';
import bookmarkIcon from '../../assets/icons/bookmark.png';
import './ExploreTripCard.css';

const ExploreTripCard = ({ 
  image, 
  title, 
  location, 
  creator, 
  creatorAvatar 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="trip-card">
      {/* Card Image */}
      <div className="trip-card-image-container">
        <img src={image} alt={title} className="trip-card-image" />
        
        {/* Action Buttons */}
        <div className="trip-card-actions">
          <button
            className={`action-button ${isLiked ? 'active' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Me gusta"
          >
            <img src={likeIcon} alt="Like" className="action-icon" />
          </button>
          <button
            className={`action-button ${isSaved ? 'active' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Guardar"
          >
            <img src={bookmarkIcon} alt="Bookmark" className="action-icon" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="trip-card-content">
        <h3 className="trip-card-title">{title}</h3>
        <p className="trip-card-location">{location}</p>

        {/* Creator Info */}
        <div className="trip-card-creator">
          <img 
            src={creatorAvatar} 
            alt={creator} 
            className="creator-avatar"
          />
          <span className="creator-name">{creator}</span>
        </div>
      </div>
    </div>
  );
};

export default ExploreTripCard;