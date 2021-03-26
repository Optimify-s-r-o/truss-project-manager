import Cookies from 'universal-cookie';
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
}

const Component = (props: OwnProps) => {
	const { exact, component, path } = props;
	const token = new Cookies().get("token");
	console.log(token);
	if (process.env.NODE_ENV != "development") {
		return <Redirect to={Routes.HOME} />;
	}

	return <Route path={path} component={component} exact={exact} />;
};

export default Component;
