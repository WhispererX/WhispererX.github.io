import React from 'react';

export default function Technology({ title, icon }) {
	return (
		<div className="technology">
      <span className="icon">{icon}</span>
      <span className='title'>{title}</span>
		</div>
	);
}
