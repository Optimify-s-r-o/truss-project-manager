import React, { useEffect } from 'react';
import { Hub, HubApi } from '../../constants/hub';
import { TreeType } from '../../types/_types';
import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	setHubConnection: React.Dispatch<React.SetStateAction<HubConnection>>;
	token: string;
	local: boolean;
	connect: HubConnection;
	setActiveTree: React.Dispatch<React.SetStateAction<TreeType>>;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveFilterContent: React.Dispatch<any>;
	children: React.ReactNode;
	setTreePending: React.Dispatch<React.SetStateAction<boolean>>;
	setHubTree: (data: any) => void;
	setHubProject: (data: any) => void;
	setHubJob: (data: any) => void;
	setHubTruss: (data: any) => void;
}

export const HubComponent = ({
	local,
	token,
	connect,
	setHubConnection,
	setActive,
	setActiveTree,
	setActiveFilterContent,
	children,
	setHubTree,
	setHubProject,
	setHubJob,
	setHubTruss,
}: HubComponent) => {
	const getUrl = () => {
		return local
			? process.env.REACT_APP_API_URL_LOCAL
			: process.env.REACT_APP_BACKEND_API;
	};
	const createTreeHubConnection = async () => {
		if (token) {
			const connect = new HubConnectionBuilder()
				.withUrl(`${getUrl()}${HubApi.Tree}`, {
					accessTokenFactory: () => token,
				})
				.withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			try {
				await connect.start();
				connect.invoke(Hub.RequestNewTree, TreeType.PROJECT, 0, 25, "");
				connect.invoke(Hub.RequestFilters);
			} catch (err) {
				console.log(err);
			}
			setHubTree(connect);
			setHubConnection(connect);
		}
	};

	const createProjectHubConnection = async () => {
		if (token) {
			const connect = new HubConnectionBuilder()
				.withUrl(`${getUrl()}${HubApi.Project}`, {
					accessTokenFactory: () => token,
				})
				.withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			try {
				await connect.start();
			} catch (err) {
				console.log(err);
			}
			setHubProject(connect);
		}
	};

	const createJobHubConnection = async () => {
		if (token) {
			const connect = new HubConnectionBuilder()
				.withUrl(`${getUrl()}${HubApi.Job}`, {
					accessTokenFactory: () => token,
				})
				.withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			try {
				await connect.start();
			} catch (err) {
				console.log(err);
			}
			setHubJob(connect);
		}
	};

	const createTrussHubConnection = async () => {
		if (token) {
			const connect = new HubConnectionBuilder()
				.withUrl(`${getUrl()}${HubApi.Truss}`, {
					accessTokenFactory: () => token,
				})
				.withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();
			try {
				await connect.start();
			} catch (err) {
				console.log(err);
			}
			setHubTruss(connect);
		}
	};

	useEffect(() => {
		createTreeHubConnection();
		createProjectHubConnection();
		createJobHubConnection();
		createTrussHubConnection();
	}, [token]);

	useEffect(() => {
		const invoke = async () => {
			if (connect) {
				try {
					connect.on(Hub.ReceivedTree, (message) => {
						if (message) {
							const json = message && JSON.parse(message);
							if (json) {
								setActiveTree(json.TreeType);
								setActive(json.IsFilterActive);
							}
						}
					});

					connect.on(Hub.FiltersChanged, (message) => {
						connect.invoke(Hub.RequestFilters);
					});

					connect.on(Hub.ReceivedFilters, (message) => {
						console.log(message);
						if (!!message) {
							const json = message && JSON.parse(message);
							if (json) {
								console.log(json);
								setActiveFilterContent(json);
							}
						}
					});
				} catch (err) {
					console.log(err);
				}
			}
		};
		if (connect) {
			invoke();
		}
	}, [connect]);

	return <>{children}</>;
};
