import React, { useEffect } from 'react';
import { Hub } from '../../../../constants/hub';
import { JobRootObject } from './_types';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	id: string;
	jobHub: any;
	children: React.ReactNode;
	setJob: (data: JobRootObject) => void;
	getJobImage: (data: string) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HubComponent = ({
	id,
	jobHub,
	setJob,
	setLoading,
	children,
	getJobImage,
}: HubComponent) => {
	useEffect(() => {
		const createHubConnection = async () => {
			if (id) {
				try {
					if (jobHub?.state === "Connected") {
						jobHub.on(Hub.JobChanged, () => {
							jobHub.invoke(Hub.RequestJob);
						});
						jobHub.on(Hub.JobIdChanged, (id) => {
							jobHub?.invoke(Hub.OpenJob, id);
						});
						jobHub?.on(Hub.ReceivedJob, (message) => {
							setLoading(false);
							const json = message && JSON.parse(message);
							json && setJob(json);
							getJobImage(json.Id);
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		};
		createHubConnection();
		return () => {
			jobHub?.invoke(Hub.CloseJob);
		};
	}, []);

	useEffect(() => {
		const jobHandler = async () => {
			if (jobHub?.state === "Connected") {
				try {
					setLoading(true);
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
