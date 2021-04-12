import React, { useEffect } from 'react';
import { Hub } from '../../../../constants/hub';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	id: string;
	jobHub: any;
	children: React.ReactNode;
	setLoading: (data: boolean) => void;
	modelsGetAction: (data: string) => void;
}

export const HubComponent = ({
	id,
	jobHub,
	setLoading,
	children,
	modelsGetAction,
}: HubComponent) => {
	useEffect(() => {
		return () => {
			if (jobHub?.state === "Connected") {
				jobHub?.invoke(Hub.CloseJob);
			}
		};
	}, []);

	useEffect(() => {
		const jobHandler = async () => {
			if (jobHub?.state === "Connected") {
				try {
					setLoading(true);
					if (id) {
						jobHub?.invoke(Hub.OpenJob, id);
					}
					modelsGetAction(id);
				} catch (err) {
					console.log(err);
				}
			}
		};
		jobHandler();
	}, [id, jobHub]);

	return <>{children}</>;
};
