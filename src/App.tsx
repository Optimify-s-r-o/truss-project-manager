import React from 'react';
import Root from './Root';
import { configuredStore, history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { GlobalStyles, lightTheme, theme } from './constants/theme';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Toast, ToastContainer } from './components/Optimify/Toast';
import { ToastProvider } from 'react-toast-notifications';
import { withRouter } from 'react-router';


const configuration = configuredStore();

export const App = () => {
	return (
		<Provider store={configuration.store}>
			<ConnectedRouter history={history} context={ReactReduxContext}>
				<MuiThemeProvider theme={theme}>
					<ThemeProvider theme={lightTheme}>
						<GlobalStyles />
						<ToastProvider
							placement="bottom-right"
							components={{ ToastContainer: ToastContainer, Toast: Toast }}
						>
							<Root />
						</ToastProvider>
					</ThemeProvider>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};
