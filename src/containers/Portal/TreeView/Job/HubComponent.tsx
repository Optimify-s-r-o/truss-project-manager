import React, { useEffect } from 'react';
import { Hub } from '../../../../constants/hub';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	id: string;
	jobHub: any;
	children: React.ReactNode;
	setLoading: (data: void) => void;
}

export const HubComponent = ({
	id,
	jobHub,
	setLoading,
	children,
}: HubComponent) => {
	useEffect(() => {
		return () => {
			jobHub?.invoke(Hub.CloseJob);
		};
	}, []);

	useEffect(() => {
		const jobHandler = async () => {
			if (jobHub?.state === "Connected") {
				try {
					setLoading();
					jobHub?.invoke(Hub.OpenJob, id);
				} catch (err) {
					console.log(err);
				}
			}
		};
		jobHandler();
	}, [id, jobHub]);

	return <>{children}</>;
};
