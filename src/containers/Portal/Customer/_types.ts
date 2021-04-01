import { Contact, Location } from '../../../types/_types';
import { createProxy } from '../../../utils/getPath';
export interface Customer {
	Id?: string;
	Company: string;
	Crn?: string;
	VatRegNo?: string;
	Forename?: string;
	Surname?: string;
	PhoneNumber?: string;
	CountryCode?: string;
	Email?: string;
	DateOfCreation?: string | Date;
	ProjectCount?: number;
	FinishedQuotationCount?: number;
	FinishedProductionCount?: number;
	Name?: string;
	Note?: string;
	Address?: Location;
	ContactPersons?: Contact[];
}

export const CustomerProxy = createProxy<Customer>();

export interface CustomerSimplified {
	Id?: string;
	Name: string;
}

export interface CreateCustomer extends Customer {
	Redirect: boolean;
}
