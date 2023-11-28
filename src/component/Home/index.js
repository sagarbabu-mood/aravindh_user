import {Component} from 'react'
import Header from '../Header'
import './index.css'

const loadingProgress = {
  INITIAL: 'initial',
  ISLOADING: 'isloading',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

class Home extends Component {
  state = {apiData: [], displayStatus: loadingProgress.INITIAL}

  componentDidMount() {
    this.getApi()
  }

  dishes = data => ({
    dishAvailability: data.dish_Availability,
    dishType: data.dish_Type,
    dishCalories: data.dish_calories,
    dishCurrency: data.dish_currency,
    dishDescription: data.dish_description,
    dishId: data.dish_id,
    dishImage: data.dish_image,
    dishName: data.dish_name,
    dishPrice: data.dish_price,
    nexturl: data.nexturl,
    addonCat: data.addonCat,
  })

  menuList = data => ({
    menuCategory: data.menu_category,
    menuCategoryId: data.menu_category_id,
    menuCategoryImage: data.menu_category_image,
    nextUrl: data.nexturl,
    categoryDishes: data.category_dishes.map(each => this.dishes(each)),
  })

  changingToCamelCase = data => ({
    branchName: data.branch_name,
    nextUrl: data.nexturl,
    restaurantId: data.restaurant_id,
    restaurantImage: data.restaurant_image,
    restaurantName: data.restaurant_name,
    tableId: data.table_id,
    tableName: data.table_name,
    tableMenuList: data.table_menu_list.map(each => this.menuList(each)),
  })

  getApi = async () => {
    this.setState({displayStatus: loadingProgress.ISLOADING})

    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.map(each => this.changingToCamelCase(each))
      console.log(updatedData)
      this.setState({
        apiData: updatedData,
        displayStatus: loadingProgress.SUCCESS,
      })
    } else {
      this.setState({displayStatus: loadingProgress.FAILURE})
    }
  }

  //   displayItems = () => {
  //     const {apiData} = this.state

  //     this.setState({currentItem: apiData})
  //   }

  render() {
    const {apiData} = this.state
    console.log(apiData[0])

    return (
      <div>
        {apiData.map(each => (
          <Header
            key={each.tableId}
            name={each.restaurantName}
            menu={each.tableMenuList}
          />
        ))}
      </div>
    )
  }
}

export default Home
