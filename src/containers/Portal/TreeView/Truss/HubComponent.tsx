import React, { useEffect } from 'react';
import { Hub } from 'src/constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { Truss } from './_types';
const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

export interface HubComponent {
	setLoading: (data: boolean) => void;
	token: string;
	local: boolean;
	trussHub: HubConnection;
	children: React.ReactNode;
	setTruss: (data: Truss) => void;
	getTruss: (id: string) => void;
	id: string;
}

export const HubComponent = ({
	local,
	token,
	children,
	setTruss,
	getTruss,
	id,
	setLoading,
	trussHub,
}: HubComponent) => {
	useEffect(() => {
		return () => {
			if (trussHub?.state === "Connected") {
				trussHub?.invoke(Hub.CloseTruss);
			}
		};
	}, []);

	useEffect(() => {
		const trussHandler = async () => {
			if (trussHub?.state === "Connected") {
				try {
					setLoading(true);
					trussHub?.invoke(Hub.OpenTruss, id);
				} catch (err) {
					console.log(err);
				}
			}
		};
		trussHandler();
	}, [id, trussHub]);

	return <>{children}</>;
};
