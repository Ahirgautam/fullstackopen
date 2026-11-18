

const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }
    else {
        return <div className={`notification ${type}`}>{message}</div>
    }
}

export default Notification