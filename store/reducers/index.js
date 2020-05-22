import { combineReducers } from 'redux'

import menus from './menus'
import experiments from './experiments'
import challenges from './experimentChallenges'
import configs from './configs'
import user from './users'
import image from './image'
import themes from './themes'
import stages from './stages'
import blog from './blog'
import library from './library'
import texts from './texts'

export default combineReducers({
  menus,
  experiments,
  challenges,
  configs,
  user,
  image,
  themes,
  stages,
  blog,
  library,
  texts
})
