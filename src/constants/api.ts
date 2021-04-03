export enum ApiURL {
	//Viewer
	VIEWER = "/api/v1/models/job",
	FILTER = "/api/v1/filter",
	//Clients
	CLIENTS_PUT = "/api/v1/clients/client-admin",
	CLIENT_GET = "/api/v1/clients/organization",
	//Quotations
	QUOTATIONS = "/api/quotations",
	QUOTATIONS_IMPORT = "/api/v1/quotations/import",
	QUOTATIONS_DUPLICATE = "/api/quotations/duplicate",
	QUOTATIONS_SECTIONS = "/api/quotations/sections",
	QUOTATIONS_EXPORT = "/api/quotations/export",
	QUOTATIONS_SUMMARY = "/api/quotations/summary",
	QUOTATIONS_VARIABLES = "/api/quotations/variables",
	QUOTATIONS_SELECTION_DELETE_VARIABLES = "/api/quotations/calculated/variables",
	QUOTATIONS_SELECTION_DELETE_SECTION = "/api/quotations/calculated/section",
	QUOTATIONS_TRUSS = "/api/v1/trusses/quotation",
	QUOTATIONS_JOB = "/api/v1/jobs/quotation",
	QUOTATIONS_GET_SELECTION = "/api/v1/quotations/calculated",
	QUOTATIONS_PROJECT_SUMMARY = "/api/v1/projects/quotation/summary",
	QUOTATIONS_SUMMARY_PUT = "/api/v1/quotations/calculated/summary",
	QUOTATIONS_VARIABLE_PUT = "/api/v1/quotations/calculated/variables",
	PROJECT_QUOTATIONS_CALCULATE = "/api/v1/projects/quotations/calculate",
	JOB_QUOTATIONS_CALCULATE = "/api/v1/jobs/quotations/calculate",
	JOB_TRUSSES = "/api/v1/jobs/trusses",
	TRUSS_QUOTATIONS_CALCULATE = "/api/v1/trusses/quotations/calculate",
	// Customers
	CUSTOMERS = "/api/customers",
	CUSTOMERS_EVIDENCE = "/api/customers/evidence",
	CUSTOMERS_LEGAL = "/api/customers/company",
	CUSTOMERS_PERSON = "/api/customers/person",
	CUSTOMERS_ALL = "/api/customers/all",
	CUSTOMERS_FILTER_COMPANY = "/api/customers/filter/company",
	CUSTOMERS_FILTER_EVIDENCE = "/api/customers/filter/evidence",
	CUSTOMERS_FILTER_PERSON = "/api/customers/filter/person",
	CUSTOMERS_FILTER = "/api/customers/filter",
	//ARES
	ARES = "/api/ares/crn",
	//FILE
	FILES = "/api/files",
	FILES_CHANGE_ROOTPATH = "/api/v1/files/rootpath",
	//Jobs
	JOBS = "/api/jobs",
	JOB_COPY = "/api/jobs/copy",
	JOB_FILTER = "/api/jobs/filter",
	JOB_DUPLICATE = "/api/jobs/duplicate",
	JOB_FILE = "/api/jobs/trussfile",
	JOB_DOWNLOAD_LINK = "/api/jobs/download-link",
	JOB_IMAGE = "/api/jobs/schema",
	//Projects
	PROJECTS = "/api/projects",
	PROJECT = "/api/project",
	PROJECT_JSON = "/api/projects/json",
	PROJECT_JOB = "/api/projects/job",
	PROJECT_AUTOCOMPLETE = "/api/projects/autocomplete",
	PROJECT_FILTER = "/api/projects/filter",
	PROJECT_FILE = "/api/projects/files",
	PROJECT_LOG = "/api/projects/logs",
	//Selection
	JOB = "/api/selections/job",
	JOBS_SELECTION = "/api/selections/jobs",
	PROJECT_SELECTION = "/api/selections/project",
	PROJECTS_SELECTION = "/api/selections/projects",
	TRUSSES_SELECTION = "/api/selections/trusses",
	QUICK_SEARCH = "/api/selections/quicksearch",
	//Settings
	SETTINGS_FILTER = "/api/settings/filters",
	SETTINGS_HEADERS = "/api/settings/header",
	SETTINGS = "/api/settings",
	//TREE
	CUSTOMER_TREE = "/api/trees/customer",
	PROJECT_TREE = "/api/trees/project",
	JOB_TREE = "/api/trees/job",
	TRUSS_TREE = "/api/trees/truss",
	TREE_RESET = "/api/trees/reset",
	// Truss
	TRUSS_FILTER = "/api/trusses/filter",
	TRUSSES = "/api/trusses",
	TRUSS_IMAGE = "/api/trusses/schema",
	//User
	USERS_LOCAL = "/api/users/local",
	USER_LOGIN = "/api/users/login",
	USERS = "/api/users",
	USER_NEW_PASSWORD = "/api/users/local/password",
	USER_RESET = "/api/users/reset",
	//Price List
	PRICE_LIST = "/api/v1/pricelists",
	PRICE_LIST_ITEM = "/api/v1/pricelists/item",
	PRICE_LIST_ITEMS = "/api/v1/pricelists/items",
	PRICE_LIST_DUPLICATE = "/api/v1/pricelists/duplicate",
	PRICE_LIST_PLATES = "/api/v1/plates",
	SELECTION_ADD = "/api/v1/selections/add",
	SELECTION_REMOVE = "/api/v1/selections/remove",
	SELECTION_RESET = "/api/v1/selections/reset",
}
