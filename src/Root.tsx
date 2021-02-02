import Home from './containers/Home/Container';
import LazyPortal from './containers/Portal/Container';
import ProtectedRoute from './components/ProtectedRoute';
import React, { Suspense } from 'react';
import { AuthReducer } from './containers/Home/_reducers';
import { configuredStore } from './store';
import { connect } from 'react-redux';
import { RootStateType } from './reducers';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './constants/routes';

const configuration = configuredStore();

interface IApp {
	token: string;
}

const Root = ({ token }: IApp) => {
	return (
		<Suspense fallback={<h1>Loading profile...</h1>}>
			<Switch>
				<ProtectedRoute
					path={Routes.PORTAL}
					component={LazyPortal}
					token={token}
				/>
				<Route path={Routes.PORTAL} component={LazyPortal} />
				<Route path={Routes.HOME} component={Home} />
			</Switch>
		</Suspense>
	);
};

const mapStateToProps = (state: RootStateType) => ({
	token: state.AuthReducer.token,
});

export default connect(mapStateToProps, null)(Root);
