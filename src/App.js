import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import UserDetails from './UserDetails'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    userDetailsList: [],
    count: 0,
    showPassword: false,
    searchValue: '',
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  submitUserDetails = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website !== '' && username !== '' && password !== '') {
      const userDetails = {
        id: uuidv4(),
        username,
        website,
        password,
      }
      this.setState(prevState => ({
        userDetailsList: [...prevState.userDetailsList, userDetails],
        count: prevState.count + 1,
        website: '',
        username: '',
        password: '',
      }))
      const {userDetailsList} = this.state
      console.log(userDetailsList)
    }
  }

  ShowUserPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  DeleteUserDetailsItem = id => {
    const {userDetailsList} = this.state
    const filteredList = userDetailsList.filter(each => each.id !== id)
    this.setState(prevState => ({
      userDetailsList: [...filteredList],
      count: prevState.count - 1,
    }))
  }

  onSearch = event => {
    const Value = event.target.value
    this.setState({searchValue: Value})
  }

  render() {
    const {userDetailsList, showPassword, count, searchValue} = this.state
    let List = userDetailsList
    List = List.filter(each =>
      each.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
    console.log(List)

    const renderNoPasswordsImage = () => (
      <li className="no-passwords-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="image"
        />
        <p className="head">No Passwords</p>
      </li>
    )

    const renderUserDetailsItems = () => {
      if (List.length === 0) {
        return renderNoPasswordsImage()
      }
      return List.map(each => (
        <UserDetails
          key={each.id}
          Details={each}
          ShowPassword={showPassword}
          DeleteUserDetailsItem={this.DeleteUserDetailsItem}
        />
      ))
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="container top">
          <div className="img-container small">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="image"
            />
          </div>
          <form className="form-container" onSubmit={this.submitUserDetails}>
            <h1 className="head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="icon"
                alt="website"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Website"
                onChange={this.websiteInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="icon"
                alt="username"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Username"
                onChange={this.usernameInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="icon"
                alt="password"
              />
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                onChange={this.passwordInput}
              />
            </div>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="img-container large">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="image"
            />
          </div>
        </div>
        <div className="container">
          <div className="password-manager">
            <div className="password-count-container">
              <h1 className="head">Your Passwords </h1>
              <p className="password-count">{count}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="icon"
                alt="search"
              />
              <input
                className="search"
                type="search"
                placeholder="Search"
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <div className="show-password">
              <input
                id="checkbox"
                type="checkbox"
                className="checkbox"
                onChange={this.ShowUserPasswords}
              />
              <label htmlFor="checkbox" className="label">
                Show Passwords
              </label>
            </div>
          </div>
          <ul className="passwords-container">{renderUserDetailsItems()}</ul>
        </div>
      </div>
    )
  }
}

export default App
