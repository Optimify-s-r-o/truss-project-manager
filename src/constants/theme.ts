import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

export enum Colors {
	RED = "#db1d0b",
	GREEN = "#119c08",
	GRAY = "#6d6d6df2",
	YELLOW = "#a99c46",
	BLACK = "black",
}

export interface Theme {
	colors: {
		primary: {
			default: string;
			hover: string;
			active: string;
		};
		contentText: string;
		primaryText: {
			default: string;
			hover: string;
			active: string;
		};
		secondaryText: {
			default: string;
			hover: string;
			active: string;
		};
		background: {
			content: string;
			contentSecondary: string;
			menu: string;
			secondaryMenu: string;
			darker: string;
			lightGray: string;
			primary: {
				primary: string;
				hover: string;
				active: string;
			};
			table: {
				heading: string;
			};
		};
		forms: {
			border: string;
			labelBorder: string;
		};
		sectionsDivider: string;
		status: {
			NotCalculated: string;
			Failed: string;
			Succeeded: string;
			Finished: string;
			InProgress: string;
			Aborted: string;
			ArchivedAndRealized: string;
			ArchivedAndAborted: string;
			NewlyCreated: string;
			QuotationInProgress: string;
			QuotationFinished: string;
			ProductionInProgress: string;
			ProductionFinished: string;

			// Truss
			TrussNotCalculated: string;
			TrussFailed: string;
			TrussSucceeded: string;

			// Job
			JobQuotationFinished: string;
			JobQuotationInProgress: string;
			JobQuotationAborted: string;
			JobConstructionFinished: string;
			JobConstructionInProgress: string;
			JobConstructionAborted: string;

			JobTRUSS_3D: string;
			JobTRUSS_2D: string;

			// Project
			ProjectArchivedAndRealized: string;
			ProjectArchivedAndAborted: string;
			ProjectNewlyCreated: string;
			ProjectQuotationInProgress: string;
			ProjectQuotationFinished: string;
			ProjectProductionInProgress: string;
			ProjectProductionFinished: string;

			// Customer
			CustomerInEvidence: string;
			CustomerCompany: string;
			CustomerPerson: string;

			//Failed
			failed: string;
		};
	};
	margin: string;
	marginDouble: string;
	padding: string;
	boxShadow: string;
	boxShadowFine: string;
	boxShadowHalf: string;
	boxShadowSharp: string;
	boxShadowSharpHover: string;
	boxShadowSharpActive: string;
}

export const lightTheme: Theme = {
	colors: {
		primary: {
			default: "#17785e",
			hover: "#125e4a",
			active: "#0e4738",
		},
		contentText: "#000",
		primaryText: {
			default: "#333",
			hover: "#222",
			active: "#111",
		},
		secondaryText: {
			default: "#999",
			hover: "#666",
			active: "#333",
		},
		background: {
			content: "#fff",
			contentSecondary: "#fcfcfc",
			menu: "#f6f6f6",
			secondaryMenu: "#eee",
			darker: "#ccc",
			lightGray: "#e4e4e45c",
			primary: {
				primary: "#17785e",
				hover: "rgba(23, 120, 94, .12)",
				active: "rgba(23, 120, 94, .25)",
			},
			table: {
				heading: "#c5ddd7",
			},
		},
		forms: {
			border: "#b8b8b8",
			labelBorder: "#d8d8d8",
		},
		sectionsDivider: "#e6e6e6",
		status: {
			NotCalculated: Colors.GRAY,
			Failed: Colors.RED,
			Succeeded: Colors.GREEN,
			Finished: Colors.GREEN,
			InProgress: Colors.YELLOW,
			Aborted: Colors.RED,
			ArchivedAndRealized: Colors.GREEN,
			ArchivedAndAborted: Colors.RED,
			NewlyCreated: Colors.GRAY,
			QuotationInProgress: Colors.YELLOW,
			QuotationFinished: Colors.GREEN,
			ProductionInProgress: Colors.YELLOW,
			ProductionFinished: Colors.GREEN,

			// Truss
			TrussNotCalculated: Colors.GRAY,
			TrussFailed: Colors.RED,
			TrussSucceeded: Colors.GREEN,

			// Job
			JobQuotationFinished: Colors.GREEN,
			JobQuotationInProgress: Colors.GRAY,
			JobQuotationAborted: Colors.RED,
			JobConstructionFinished: Colors.GREEN,
			JobConstructionInProgress: Colors.GRAY,
			JobConstructionAborted: Colors.RED,

			JobTRUSS_3D: Colors.GRAY,
			JobTRUSS_2D: Colors.GRAY,

			// Project
			ProjectArchivedAndRealized: Colors.GREEN,
			ProjectArchivedAndAborted: Colors.RED,
			ProjectNewlyCreated: Colors.GRAY,
			ProjectQuotationInProgress: Colors.GRAY,
			ProjectQuotationFinished: Colors.GREEN,
			ProjectProductionInProgress: Colors.GRAY,
			ProjectProductionFinished: Colors.GREEN,

			// Customer
			CustomerInEvidence: "brown",
			CustomerCompany: "#bb9e00",
			CustomerPerson: "green",

			// Failed
			failed: Colors.RED,
		},
	},
	margin: "10px",
	marginDouble: "20px",
	padding: "10px",
	boxShadow: "0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.05)",
	boxShadowFine: "0 2px 8px 1px #17785e, 0px 2px 6px -1px #17785e",
	boxShadowHalf:
		"0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.05)",
	boxShadowSharp:
		"0 2px 4px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px -1px rgba(0,0,0,0.5)",
	boxShadowSharpHover:
		"0 2px 8px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px -1px rgba(0,0,0,0.5)",
	boxShadowSharpActive:
		"0 2px 16px 1px rgba(0, 0, 0, 0.2), 0px 2px 12px -1px rgba(0,0,0,0.75)",
};

export const darkTheme: Theme = {
	colors: {
		primary: {
			default: "#0c8060",
			hover: "#19FFC2",
			active: "#27a281",
		},
		contentText: "#ccc",
		primaryText: {
			default: "#ccc",
			hover: "#ddd",
			active: "#eee",
		},
		secondaryText: {
			default: "#999",
			hover: "#bbb",
			active: "#ddd",
		},
		background: {
			content: "#212121",
			contentSecondary: "#292929",
			menu: "#333",
			secondaryMenu: "#444",
			darker: "#555",
			lightGray: "#212121",
			primary: {
				primary: "#0c8060",
				hover: "rgba(23, 120, 94, .55)",
				active: "rgba(23, 120, 94, .42)",
			},
			table: {
				heading: "#1a614e",
			},
		},
		forms: {
			border: "#5d5d5d",
			labelBorder: "#484848",
		},
		sectionsDivider: "#3d3d3d",
		status: {
			NotCalculated: Colors.GRAY,
			Failed: Colors.RED,
			Succeeded: Colors.GREEN,
			Finished: Colors.GREEN,
			InProgress: Colors.YELLOW,
			Aborted: Colors.RED,
			ArchivedAndRealized: Colors.GREEN,
			ArchivedAndAborted: Colors.RED,
			NewlyCreated: Colors.GRAY,
			QuotationInProgress: Colors.YELLOW,
			QuotationFinished: Colors.GREEN,
			ProductionInProgress: Colors.YELLOW,
			ProductionFinished: Colors.GREEN,

			// Truss
			TrussNotCalculated: Colors.GRAY,
			TrussFailed: Colors.RED,
			TrussSucceeded: Colors.GREEN,

			// Job
			JobQuotationFinished: Colors.GREEN,
			JobQuotationInProgress: Colors.GRAY,
			JobQuotationAborted: Colors.RED,
			JobConstructionFinished: Colors.GREEN,
			JobConstructionInProgress: Colors.GRAY,
			JobConstructionAborted: Colors.RED,

			JobTRUSS_3D: Colors.GRAY,
			JobTRUSS_2D: Colors.GRAY,

			// Project
			ProjectArchivedAndRealized: Colors.GREEN,
			ProjectArchivedAndAborted: Colors.RED,
			ProjectNewlyCreated: Colors.GRAY,
			ProjectQuotationInProgress: Colors.GRAY,
			ProjectQuotationFinished: Colors.GREEN,
			ProjectProductionInProgress: Colors.GRAY,
			ProjectProductionFinished: Colors.GREEN,

			// Customer
			CustomerInEvidence: Colors.GRAY,
			CustomerCompany: Colors.GRAY,
			CustomerPerson: Colors.GRAY,

			// Failer
			failed: Colors.RED,
		},
	},
	margin: "10px",
	marginDouble: "20px",
	padding: "10px",
	boxShadow: "0 1px 8px 1px rgba(0, 0, 0, 0.1), 0 0 4px 2px rgba(0, 0, 0, 0.5)",
	boxShadowFine: "0 2px 8px 1px #00b987, 0px 2px 6px -1px #00b987",
	boxShadowHalf:
		"0 1px 4px 1px rgba(0, 0, 0, 0.1), 0 0 2px 1px rgba(0, 0, 0, 0.5)",
	boxShadowSharp:
		"0 2px 4px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px -1px rgba(0,0,0,.5)",
	boxShadowSharpHover:
		"0 2px 8px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px -1px rgba(0,0,0,.5)",
	boxShadowSharpActive:
		"0 2px 16px 1px rgba(0, 0, 0, 0.2), 0px 2px 12px -1px rgba(0,0,0,.75)",
};

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#17785e",
		},
		secondary: {
			main: "#000",
		},
	},
});

const breakpoints = {
	smallTo: "800px",
	mediumFrom: "801px",
	mediumTo: "1000px",
	largeFrom: "1001px",
	largeTo: "1200px",
	extraLargeFrom: "1201px",
	extraLargeTo: "1400px",
	maximumFrom: "1401px",
};

export const device = {
	small: `(max-width: ${breakpoints.smallTo})`,
	mediumOnly: `(min-width: ${breakpoints.mediumFrom}) and (max-width: ${breakpoints.mediumTo})`,
	medium: `(max-width: ${breakpoints.mediumTo})`,
	largeOnly: `(min-width: ${breakpoints.largeFrom}) and (max-width: ${breakpoints.largeTo})`,
	large: `(max-width: ${breakpoints.largeTo})`,
	extraLargeOnly: `(min-width: ${breakpoints.extraLargeFrom}) and (max-width: ${breakpoints.extraLargeTo})`,
	extraLarge: `(max-width: ${breakpoints.extraLargeTo})`,
	maximum: `(min-width: ${breakpoints.maximumFrom})`,
};

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    padding:0;
    background-color: ${(props) => props.theme.white};
  }
 `;
