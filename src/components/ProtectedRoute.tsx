import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../constants/routes';

interface OwnProps {
	path: Routes;
	component:
		| React.ComponentType<RouteComponentProps<any>>
		| React.ComponentType<any>;
	exact?: boolean;
	token: string;
}

const Component = (props: OwnProps) => {
	const { exact, component, path, token } = props;

	if (!token && process.env.NODE_ENV != "development") {
		return <Redirect to={Routes.HOME} />;
	}

	return <Route path={path} component={component} exact={exact} />;
};

export default Component;
