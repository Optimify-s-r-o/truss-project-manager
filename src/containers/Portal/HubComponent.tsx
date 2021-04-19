import React, { useEffect } from 'react';
import { ApiURL } from '../../constants/api';
import { Fetch, Project, TreeType } from '../../types/_types';
import { Hub, HubApi } from '../../constants/hub';
import { JobRootObject } from './TreeView/Job/_types';
import { Method } from '../../constants/enum';
import { RootStateType } from '../../reducers/index';
import { settingsFilter } from './_actions';
import { Truss } from './TreeView/Truss/_types';
import { useSelector } from 'react-redux';
import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	setHubConnection: React.Dispatch<React.SetStateAction<HubConnection>>;
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
	setLoading: (data: boolean) => void;
	filterSettingsCall: (data: Fetch) => void;
	setHubSettings: (data: any) => void;
}

export const HubComponent = ({
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
	filterSettingsCall,
	setHubSettings,
}: HubComponent) => {
	const state = useSelector((state: RootStateType) => state);
	const token = state.AuthReducer.token;
	const settings = state.HubReducer.settings;
	const tree = state.HubReducer.tree;
	const job = state.HubReducer.job;
	const truss = state.HubReducer.truss;
	const project = state.HubReducer.project;
	const getUrl = () => {
		return process.env.REACT_APP_BACKEND_API;
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
				if (connect?.state === "Connected") {
					connect.invoke(Hub.RequestTree);
					connect.invoke(Hub.RequestFilters);
				}
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
					setLoading(false);
					const json = message && JSON.parse(message);
					if (json) {
						getProject(json.Id);
						json && json && setProject(json);
					}
				});
				connect?.on(Hub.ProjectChanged, () => {
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
				connect?.on(Hub.UpdateFilters, () => {
					filterSettingsCall({
						action: settingsFilter,
						method: Method.GET,
						url: ApiURL.SETTINGS_FILTER,
					});
				});
				connect?.on(Hub.JobChanged, () => {
					connect.invoke(Hub.RequestJob);
				});
				connect?.on(Hub.JobIdChanged, (id) => {
					if (id) {
						connect?.invoke(Hub.OpenJob, id);
					}
				});
				connect?.on(Hub.ReceivedJob, (message) => {
					setLoading(false);
					const json = message && JSON.parse(message);
					json && setJob(json);
					console.log(json);
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
					setLoading(false);
					const json = message && JSON.parse(message);
					console.log(json);
					if (!!json) {
						getTruss(json?.Id);
						setTruss(json);
					}
				});
				connect?.on(Hub.TrussChanged, () => {
					connect.invoke(Hub.RequestTruss);
				});
			} catch (err) {
				console.log(err);
			}
			setHubTruss(connect);
		}
	};

	const createSettingsHubConnection = async () => {
		if (token) {
			const connect = new HubConnectionBuilder()
				.withUrl(`${getUrl()}${HubApi.Settings}`, {
					accessTokenFactory: () => token,
				})
				.withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();
			try {
				await connect.start();
				setHubSettings(connect);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		if (token) {
			createTreeHubConnection();
			createProjectHubConnection();
			createJobHubConnection();
			createTrussHubConnection();
			createSettingsHubConnection();
		}

		return () => {
			if (token) {
				settings?.state === "Connected" && settings?.stop();
				job?.state === "Connected" && job?.stop();
				truss?.state === "Connected" && truss?.stop();
				project?.state === "Connected" && project?.stop();
				tree?.state === "Connected" && tree?.stop();
			}
		};
	}, [token]);

	useEffect(() => {
		const invoke = async () => {
			if (connect) {
				try {
					connect?.on(Hub.ReceivedTree, (message) => {
						if (message) {
							const json = message && JSON.parse(message);
							if (json) {
								setActiveTree(json.TreeType);
								setActive(json.IsFilterActive);
							}
						}
					});

					connect?.on(Hub.FiltersChanged, (message) => {
						connect.invoke(Hub.RequestFilters);
					});

					connect?.on(Hub.ReceivedFilters, (message) => {
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
