import createRootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
import { combineSagas, rootSaga } from './sagas';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
// defaults to localStorage for web

export const history = createHashHistory();

const rootReducer = createRootReducer(history);

export const configuredStore = (initialState?: any) => {
	// Redux Configuration
	const middleware = [];
	const enhancers = [];

	// Thunk Middleware
	middleware.push(thunk);

	//Sagas Middleware
	const sagaMiddleware = createSagaMiddleware();
	middleware.push(sagaMiddleware);

	// Logging Middleware
	const logger = createLogger({
		level: "info",
		collapsed: true,
	});

	// Skip redux logs in console during the tests
	if (process.env.NODE_ENV !== "test") {
		middleware.push(logger);
	}

	// Router Middleware
	const router = routerMiddleware(history);
	middleware.push(router);

	// If Redux DevTools Extension is installed use it, otherwise use Redux compose
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Options: http://extension.remotedev.io/docs/API/Arguments.html
		  })
		: compose;
	/* eslint-enable no-underscore-dangle */

	// Apply Middleware & Compose Enhancers
	enhancers.push(applyMiddleware(...middleware));
	const enhancer = composeEnhancers(...enhancers, autoRehydrate());

	// Create Store
	const store = createStore(rootReducer, initialState, enhancer);
	//run Root Saga
	sagaMiddleware.run(combineSagas([...rootSaga]));

	return { store };
};
export type Store = ReturnType<typeof configuredStore>;
