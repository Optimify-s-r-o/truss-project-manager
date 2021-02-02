import { Customer, CustomerProxy } from '../types/_types';
import { get } from 'lodash';
import { getPath, translationPath } from './getPath';
import { lang, t } from '../translation/i18n';
import { Routes } from '../constants/routes';

export const getValue = (customer: Customer, name = "string") => {
	if (get(customer, getPath(CustomerProxy.Company.Id))) {
		return get(customer, getPath(CustomerProxy.Company[name]));
	} else if (get(customer, getPath(CustomerProxy.Person.Id))) {
		return get(customer, getPath(CustomerProxy.Person[name]));
	} else if (get(customer, getPath(CustomerProxy.Evidence.Id))) {
		return get(customer, getPath(CustomerProxy.Evidence[name]));
	}
};

export const getRoute = (customer: Customer): Routes => {
	if (get(customer, getPath(CustomerProxy.Company.Id))) {
		return Routes.NEW_LEGAL_CUSTOMER;
	} else if (get(customer, getPath(CustomerProxy.Person.Id))) {
		return Routes.NEW_NATURAL_CUSTOMER;
	} else if (get(customer, getPath(CustomerProxy.Evidence.Id))) {
		return Routes.NEW_EVIDENCE_CUSTOMER;
	}
};

export const getName = (customer: Customer) => {
	if (get(customer, getPath(CustomerProxy.Company.Id))) {
		return get(customer, getPath(CustomerProxy.Company.Name));
	} else if (get(customer, getPath(CustomerProxy.Person.Id))) {
		return get(customer, getPath(CustomerProxy.Person.Forename));
	} else if (get(customer, getPath(CustomerProxy.Evidence.Id))) {
		return get(customer, getPath(CustomerProxy.Evidence.Name));
	}
};

export const getCustomerType = (customer: Customer) => {
	if (get(customer, getPath(CustomerProxy.Company.Id))) {
		return t(translationPath(lang.common.legalPerson));
	} else if (get(customer, getPath(CustomerProxy.Person.Id))) {
		return t(translationPath(lang.common.naturalPerson));
	} else if (get(customer, getPath(CustomerProxy.Evidence.Id))) {
		return t(translationPath(lang.common.evidencePerson));
	}
};

export const isPresent = (arr: string[], customer: Customer) => {
	if (get(customer, getPath(CustomerProxy.Company.Id)) && arr.includes("2")) {
		return true;
	} else if (
		get(customer, getPath(CustomerProxy.Person.Id)) &&
		arr.includes("1")
	) {
		return true;
	} else if (
		get(customer, getPath(CustomerProxy.Evidence.Id)) &&
		arr.includes("0")
	) {
		return true;
	}
	return false;
};
