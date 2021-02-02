import React, { useEffect } from 'react';
import { Hub } from '../../../../constants/hub';
import { Project } from '../../../../types/_types';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	id: string;
	projectHub: any;
	children: React.ReactNode;
	getProject: (id: string) => void;
	setProject: (data: Project) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HubComponent = ({
	id,
	projectHub,
	getProject,
	setProject,
	setLoading,
	children,
}: HubComponent) => {
	useEffect(() => {
		const createHubConnection = async () => {
			if (id) {
				try {
					console.log(projectHub);
					if (projectHub?.state === "Connected") {
						projectHub?.on(Hub.ReceivedProject, (message) => {
							setLoading(false);
							const json = message && JSON.parse(message);
							if (json) {
								getProject(json.Id);
								json && json && setProject(json);
							}
						});
						projectHub.on(Hub.ProjectChanged, () => {
							projectHub.invoke(Hub.RequestProject);
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		};
		createHubConnection();
		return () => {
			projectHub?.invoke(Hub.CloseProject);
		};
	}, []);

	useEffect(() => {
		const projectHandler = async () => {
			if (projectHub?.state === "Connected") {
				try {
					setLoading(true);
					projectHub?.invoke(Hub.OpenProject, id);
				} catch (err) {
					console.log(err);
				}
			}
		};
		projectHandler();
	}, [id, projectHub]);

	return <>{children}</>;
};
