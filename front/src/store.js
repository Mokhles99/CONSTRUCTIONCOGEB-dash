// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
import { createStore, applyMiddleware ,combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./reducers/auth";
import message from "./reducers/message";
import rootReducer from "./reducers";
// const middleware = [thunk];

import productReducer from './reducers/product.reducer';

import carttwoReducer from "./reducers/carttwo.reducer";
import userReducer from "./reducers/user.reducer";
import aboutReducer from "./reducers/about.reducer";
import catalogueReducer from "./reducers/catalogue.reducer";
import carouselReducer from "./reducers/carousel.reducer";



const reducer = combineReducers({


  product: productReducer,
  about:aboutReducer,
  catalogue:catalogueReducer,
  carousel:carouselReducer,


  carttwo:carttwoReducer,
 

    user: userReducer,



  auth:auth,
  message:message,
  


  ...rootReducer,
   
});


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

