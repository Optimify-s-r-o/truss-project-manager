import { Slider } from '../containers/Portal/SidebarFilter/_types';
export const insert = (arr: any[], index: number, newItem: any) => [
	...arr.slice(0, index),

	newItem,

	...arr.slice(index),
];

export const getObject = (first: any, second: any): Slider => {
	if (first != null && second != null) {
		return {
			From: first,
			To: second,
			Active: false,
			IncludeNotSet: false,
		};
	} else {
		return { From: 0, To: 0, Active: false, IncludeNotSet: false };
	}
};
