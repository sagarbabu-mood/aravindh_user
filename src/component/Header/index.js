import {useState} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {name, menu} = props

  const [menuDisplay, setMenuDisplay] = useState(menu[0])
  console.log(menu)
  console.log(menuDisplay)

  const onChangeMenu = m => {
    const res = menu.filter(each => each.menuCategoryId === m)
    setMenuDisplay(res[0])
  }
  const addingToCart = () => (
    <div className="cartButton">
      <button className="button-style sub" type="button">
        -
      </button>
      <p className="cartCount">0</p>
      <button className="button-style sub" type="button">
        +
      </button>
    </div>
  )

  const menuList = () => {
    const x = '0'

    return (
      <div>
        <ul className="list-unstyled p-2">
          {menuDisplay?.categoryDishes?.map(each => (
            <li key={each.menuCategoryId} className="menuList m-1">
              <div>
                <BiFoodTag
                  size="25px"
                  color={each.dishType === 2 ? 'green' : 'red'}
                />
                <p className="dishNameStyle">{each.dishName}</p>
                <div className="d-flex flex-row">
                  <p className="m-1">{each.dishCurrency}</p>
                  <p className="m-1">{each.dishPrice}</p>
                </div>
                <div>
                  <p>{each.dishDescription}</p>
                </div>
                <div>
                  {each.dishAvailability ? (
                    addingToCart()
                  ) : (
                    <p className="text-danger">No Available</p>
                  )}
                </div>
                <div>
                  {each.addonCat.length >= 1 ? (
                    <p className="text-primary p-1">Customizations available</p>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between w-25">
                <p className="cal">{each.dishCalories} calories</p>
                <img className="dishImg" src={each.dishImage} alt="dishImg" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-between p-2">
        <h1>{name}</h1>
        <div className="d-flex flex-row justify-content-center">
          <p className="carts">My Orders</p>
          <p className="d-flex flex-row">
            <AiOutlineShoppingCart size="30px" className="cart-icon" />
            <div className="cart-count">
              <p>0</p>
            </div>
          </p>
        </div>
      </div>

      <div>
        <ul className="list-unstyled menuDisplay menu">
          {menu.map(each => (
            <li key={each.menuCategoryId}>
              <button
                type="button"
                onClick={() => onChangeMenu(each.menuCategoryId)}
                className={`button-style ${
                  menuDisplay.menuCategory === each.menuCategory
                    ? 'text-danger'
                    : null
                }`}
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{menuList()}</div>
    </div>
  )
}

export default Header
