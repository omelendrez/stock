import React from 'react'
import Header from './Header'
import { config } from './../../config'
import { t } from './../../int'
const { language } = config

const Form = props => {
  const { title, children, save, cancel } = props
  return (
    <React.Fragment>
      <Header title={`${title}`} />
      <form className="container mt-3">
        {children}
        <button className="btn btn-primary mr-3" onClick={e => save(e)}>{t(language, "save")}</button>
        <button className="btn btn-danger ml-3" onClick={e => cancel(e)}>{t(language, "cancel")}</button>
      </form>
    </React.Fragment >
  )
}

export default Form