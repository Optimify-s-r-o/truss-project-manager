import React, { useEffect } from 'react';
import { Hub } from '../../../../constants/hub';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	id: string;
	projectHub: any;
	children: React.ReactNode;
	setLoading: (data: boolean) => void;
}

export const HubComponent = ({
	id,
	projectHub,
	setLoading,
	children,
}: HubComponent) => {
	useEffect(() => {
		return () => {
			if (projectHub?.state === "Connected") {
				projectHub?.invoke(Hub.CloseProject);
			}
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
