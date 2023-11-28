const totalCount = (state = {cart: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {cart: state.cart + 1}

    case 'DECREMENT':
      return {cart: state.cart > 0 ? state.cart - 1 : state.cart}

    default:
      return state
  }
}

export default totalCount
