import React from 'react'

const Alert = ({ response }) => {
  const { message, success, error } = response
  const style = `alert alert-${success ? 'success' : 'danger'} alert-dismissible fade show`
  const responseMessage = success ? message : error
  return (
    responseMessage ?
      (<div className={style} role="alert">
        {responseMessage.replace(/Validation error: /g, "")}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button></div>)
      :
      null
  )
}

export default Alert