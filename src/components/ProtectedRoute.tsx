import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { RootStateType } from '../reducers/index';
import { Route } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { useSelector } from 'react-redux';
interface OwnProps {
	path: Routes;
	component:
		| React.ComponentType<RouteComponentProps<any>>
		| React.ComponentType<any>;
	exact?: boolean;
}

const Component = (props: OwnProps) => {
	const { exact, component, path } = props;
	const token = useSelector((state: RootStateType) => state.AuthReducer.token);

	if (!token) {
		return <Redirect to={Routes.HOME} />;
	}

	return <Route path={path} component={component} exact={exact} />;
};

export default Component;
