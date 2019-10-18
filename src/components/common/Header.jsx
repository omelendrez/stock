import React from 'react'

const Header = ({ title }) => (
  <div className="p-2 text-left text-white lead bg-info font-weight-normal">{title || "Home"}</div>
)

export default Header