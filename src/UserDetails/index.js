import './index.css'

const UserDetails = props => {
  const {Details, ShowPassword, DeleteUserDetailsItem} = props
  const {id, username, website, password} = Details
  console.log(ShowPassword)
  const ShowAndHidePassword = () =>
    ShowPassword ? (
      <p className="password">{password}</p>
    ) : (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    )

  const onCLickDelete = () => {
    DeleteUserDetailsItem(id)
  }

  return (
    <li className="list-item">
      <p className="dp">{website[0].toUpperCase()}</p>
      <div className="details-container">
        <p className="website">{website}</p>
        <p className="name">{username}</p>
        {ShowAndHidePassword()}
      </div>
      <button
        testid="delete"
        className="btn"
        type="button"
        onClick={onCLickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default UserDetails
