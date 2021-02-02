import { Countries, Settings, SettingsProxy } from '../types/_types';
import { get } from 'lodash';
import { getPath } from './getPath';

export const getCzech = (settings: Settings): Countries => {
	let czechia: Countries = null;
	get(settings, getPath(SettingsProxy.Countries)) &&
		get(settings, getPath(SettingsProxy.Countries)).find((value) => {
			if (value.EnglishName === "Czechia") {
				czechia = value;
			}
			return null;
		});
	return czechia;
};

export const getLabel = (
	id: string,
	settings?: Settings | null
): string | null => {
	let label: string | null = null;
	get(settings, getPath(SettingsProxy.Countries)) &&
		get(settings, getPath(SettingsProxy.Countries)).find((value) => {
			if (value.Id === id) {
				label = value.EnglishName;
			}
			return null;
		});
	return label;
};

export const getValue = (object: object, name?: string) => {
	if (name && name?.includes(".")) {
		let temp: any = object;
		for (let value of name.split(".")) {
			temp = temp && temp[value];
		}
		return temp;
	} else if (name) {
		return object[name];
	}
};
