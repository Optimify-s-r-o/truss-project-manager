export const fixed = (value: string | number, digits: number) => {
	if (value !== undefined && value !== null) {
		return Number(value).toFixed(digits) + " "; //TODO round
	}
	return value;
};

export const uppercase = (value: string | undefined | null): string => {
	if (value !== undefined && value !== null && value) {
		return value.toUpperCase();
	}
	return "";
};

export const getAddress = (location) => {
	let address = "";
	if (location.StreetName) {
		address += location.StreetName;
	}

	if (location.PlaceNumber) {
		address += " " + location.PlaceNumber;
	}

	if (location.Zip && location.CityName) {
		address +=
			(!!location.StreetName ? ", " : "") +
			location.Zip +
			" " +
			location.CityName;
	} else if (location.CityName) {
		address += (!!location.StreetName ? ", " : "") + location.CityName;
	}

	if (location.RegionName) {
		address +=
			(location.StreetName ||
			location.PlaceNumber ||
			location.CityName ||
			location.Zip
				? ", "
				: "") + location.RegionName;
	}

	if (location.Country) {
		address +=
			(location.StreetName ||
			location.PlaceNumber ||
			location.CityName ||
			location.Zip ||
			location.RegionName
				? ", "
				: "") + location.Country;
	}
	return address;
};
