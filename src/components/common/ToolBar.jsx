import React from 'react'
import { NavLink } from 'react-router-dom'
import { config } from './../../config'
import { t } from './../../int'
import { menuOptions } from './../../utils'
const { language } = config

const ToolBar = props => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="#">Stock</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
          </li>
          {
            menuOptions.map(option => (
              <li className="nav-item">
                <NavLink className="nav-link" to={option.url}>{t(language, option.title)}</NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  </header>
)

export default ToolBar