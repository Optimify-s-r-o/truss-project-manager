import React, { useEffect } from 'react';
import { Hub, HubApi } from '../../constants/hub';
import { JobRootObject } from './TreeView/Job/_types';
import { Project, TreeType } from '../../types/_types';
import { Truss } from './TreeView/Truss/_types';
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
	getProject: (id: string) => void;
	setProject: (data: Project) => void;
	setJob: (data: JobRootObject) => void;
	getJobImage: (data: string) => void;
	setTruss: (data: Truss) => void;
	getTruss: (id: string) => void;
	setLoading: (data: void) => void;
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
	getProject,
	setProject,
	setJob,
	getJobImage,
	setTruss,
	getTruss,
	setLoading,
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
				connect?.on(Hub.ReceivedProject, (message) => {
					setLoading();
					const json = message && JSON.parse(message);
					if (json) {
						getProject(json.Id);
						json && json && setProject(json);
					}
				});
				connect.on(Hub.ProjectChanged, () => {
					connect.invoke(Hub.RequestProject);
				});
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
				connect.on(Hub.JobChanged, () => {
					connect.invoke(Hub.RequestJob);
				});
				connect.on(Hub.JobIdChanged, (id) => {
					connect?.invoke(Hub.OpenJob, id);
				});
				connect?.on(Hub.ReceivedJob, (message) => {
					setLoading();
					const json = message && JSON.parse(message);
					json && setJob(json);
					getJobImage(json.Id);
				});
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
				connect?.on(Hub.ReceivedTruss, (message) => {
					setLoading();
					const json = message && JSON.parse(message);
					console.log(json);
					if (!!json) {
						getTruss(json?.General.Id);
						setTruss(json);
					}
				});
				connect.on(Hub.TrussChanged, () => {
					connect.invoke(Hub.RequestTruss);
				});
			} catch (err) {
				console.log(err);
			}
			setHubTruss(connect);
		}
	};

	useEffect(() => {
		if (token) {
			createTreeHubConnection();
			createProjectHubConnection();
			createJobHubConnection();
			createTrussHubConnection();
		}
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
