const Notification = ({type, message}) => {
  const NotificationStyle = type === 'success' ? {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  } : {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null){
    return null
  }

  return (
    <div style={NotificationStyle}>{message}</div>
  )
}

export default Notification