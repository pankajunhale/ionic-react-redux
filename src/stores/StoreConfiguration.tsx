import { Store, createStore, applyMiddleware } from 'redux'
import {logger} from 'redux-logger'
import {ApplicationState,createRootReducer,rootEpic,rootReducer} from './index';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';


let epicMiddleware;
let store = null;
export default function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
    epicMiddleware = createEpicMiddleware();
    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(epicMiddleware,logger))
    )
    // Don't forget to run the root saga, and return the store object.
    // sagaMiddleware.run(rootSaga)
    // run epicmiddleware - if you are using redux-observable
    epicMiddleware.run(rootEpic);
    return store;
  }