import React from 'react'

export const Loading = () => {
  return (
    <div className="loading">
    <lottie-player
      src="https://assets3.lottiefiles.com/private_files/lf30_x8aowqs9.json"
      speed="2"
      background="transparent"
      loop
      autoplay
      style={{ width: '100px',
        height: '100px' }} />
    </div>
  )
};

