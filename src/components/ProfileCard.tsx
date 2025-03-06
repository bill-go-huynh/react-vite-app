import React from 'react'

interface ProfileCardProps {
  name: string
  position: string
  avatarUrl: string
  facebookUrl: string
  youtubeUrl: string
  tiktokUrl: string
  githubUrl: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  position,
  avatarUrl,
  facebookUrl,
  youtubeUrl,
  tiktokUrl,
  githubUrl,
}) => {
  return (
    <div className="profile-card">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="profile-card__avatar"
      />
      <h2 className="profile-card__name">{name}</h2>
      <p className="profile-card__title">{position}</p>
      <div className="card__social">
        <div>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <button className="profile-card__button">Contact me</button>
    </div>
  )
}

export default ProfileCard
