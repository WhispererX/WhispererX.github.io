import React from 'react'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <Outlet />
    </>
  )
}
