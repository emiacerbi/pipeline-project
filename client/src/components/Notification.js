import React from "react"

export const Notification = ({ message }) => {
  const error = message.isError && 'error'

  if (!message.text) return null

  return (
    <div id="notification" className={`notification ${error}`}>
      {message.text}
    </div>
  )
}
