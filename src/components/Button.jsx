import React from 'react'

export default function Button({ content, onClick, icon }) {
  return (
    <button className="button" onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      {content}
    </button>
  )
}
