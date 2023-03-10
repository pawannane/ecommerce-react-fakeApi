import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/cart.png'
import Icon from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather'

const Navbar = ({ user, totalProducts, handleSearch }) => {

  const handleLogout = () => {
   
  }

  return (
        <div className='navbar'>
          <div className="leftside">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div>
            <input type="text" name="search" className="search" placeholder='Search Product name' onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <div className="rightside">
            {!user && <>
              <div><Link className="navlink" to="/signup">SIGN UP</Link></div>
              <div><Link className="navlink" to="/login">LOGIN</Link></div>
            </>}
            {
              user && <>
                <div><Link className="navlink" to='/'>{user}</Link></div>
                <div className="cart-menu-btn">
                  <Link className="navlink" to='/cart'>
                    <Icon icon={shoppingCart} size={20} />
                  </Link>
                  <span className="cart-indicator">{totalProducts}</span>
                </div>
                <div className="btn btn-danger btn-md" onClick={handleLogout}>LOGOUT</div>
              </>
            }
          </div>
        </div>
  )



}

export default Navbar