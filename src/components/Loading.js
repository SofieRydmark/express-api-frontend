import React from 'react'
import { RaceBy } from '@uiball/loaders'

export const Loading = () => {
  return (
    <div className="loading">
      <RaceBy 
        size={80}
        lineWeight={5}
        speed={1.4} 
        color="black" 
        />
    </div>
  )
};

