//SORT TODO
export enum Routes {
	HOME = "/",
	COUNTER = "/counter",
	DISPLAY = "/portal/display",
	DISPLAY_PROJECT = "/portal/display/project",
	DISPLAY_CUSTOMERS = "/portal/display/customers",
	EXPORT = "/export",
	FILTER_JOB = "/portal/filter/:type",
	FILTER_PROJECT = "/portal/filter/project",
	FILTER_TRUSS = "/portal/filter/truss",
	TOOLS = "/tools",
	TASKS = "/tasks",
	LOCAL = "/local",
	LOST_PASSWORD = "/lost-password",
	PORTAL = "/portal",
	PROJECTS = "/portal/projects",
	PROJECTS_LIST = "/portal/projects-list",
	PROJECT_NEW = "/portal/project-new",
	CUSTOMER_LIST = "/portal/customer-list/:type",
	CUSTOMER_LIST_LINK = "/portal/customer-list/",
	CUSTOMER_LEGAL = "/portal/customer-list/legal",
	CUSTOMER_PERSON = "/portal/customer-list/person",
	CUSTOMER_EVIDENCE = "/portal/customer-list/evidence",
	CUSTOMER_ALL = "/portal/customer-list/all",
	NEW_CUSTOMER = "/portal/customer/:id",
	NEW_LEGAL_CUSTOMER = "/portal/customer/legal/:id",
	NEW_NATURAL_CUSTOMER = "/portal/customer/natural/:id",
	NEW_LEGAL_CUSTOMER_UPGRADE = "/portal/customer/legal/:id/:evidence",
	NEW_NATURAL_CUSTOMER_UPGRADE = "/portal/customer/natural/:id/:evidence",
	NEW_EVIDENCE_CUSTOMER = "/portal/customer/evidence/:id",
	LINK_NEW_LEGAL_CUSTOMER = "/portal/customer/legal/",
	CREATE_CUSTOMER = "/portal/customer/create",
	EDIT_CUSTOMER = "/portal/customer/edit/:id",
	EDIT_CUSTOMER_LINK = "/portal/customer/edit/",
	LINK_NEW_NATURAL_CUSTOMER = "/portal/customer/natural/",
	LINK_NEW_EVIDENCE_CUSTOMER = "/portal/customer/evidence/",
	USERS = "/portal/users",
	CREATE_USER = "/portal/users/create/:username",
	LINK_CREATE_USER = "/portal/users/create/",
	ACCOUNTS = "/portal/accounts",
	ACCOUNTS_ACTION = "/portal/accounts/:action",
	ACCOUNTS_NEW_PASSWORD = "/portal/users/new-password/:id",
	EDIT_ACCOUNT = "/portal/accounts/edit",
	TREE_PROJECT = "/portal/tree/project/:id",
	TREE_LINK_PROJECT = "/portal/tree/project/",
	TREE_LINK_PROJECT_LOG = "/portal/tree/project/log/",
	TREE_PROJECT_LOG = "/portal/tree/project/:id/log/:type",
	TREE_PROJECT_MULTIPLE = "/portal/tree/project-multiple/:id",
	TREE_LINK_PROJECT_MULTIPLE = "/portal/tree/project-multiple/",
	TREE_PROJECT_GENERAL = "/portal/tree/project/:id/general/:type",
	TREE_PROJECT_QUOTATIONS = "/portal/tree/project/:id/quotations/:type",
	TREE_LINK_PROJECT_GENERAL = "/portal/tree/project/general/",
	TREE_PROJECT_DETAILS = "/portal/tree/project/details/:id",
	TREE_PROJECT_DOCUMENTS = "/portal/tree/project/documents/:id",
	TREE_PROJECT_COPYTO = "/portal/tree/project/copyto/:id",
	TREE_PROJECT_ = "/portal/tree/project/general/:id",
	TREE_PROJECT_CUSTOMER = "/portal/tree/project/customer/:id",
	TREE_JOB = "/portal/tree/job/:id",
	TREE_LINK_JOB = "/portal/tree/job/",
	TREE_JOB_MULTIPLE = "/portal/tree/job-multiple/:id",
	TREE_LINK_JOB_MULTIPLE = "/portal/tree/job-multiple/",
	TREE_JOB_MULTIPLE_PURE = "/portal/tree/job-multiple/:id",
	TREE_JOB_GENERAL = "/portal/tree/job/:id/general/:type",
	TREE_JOB_QUOTATIONS = "/portal/tree/job/:id/quotations/:type",
	TREE_JOB_TRUSSES = "/portal/tree/job/:id/trusses/:type",
	TREE_JOB_PROCESS = "/portal/tree/job/process",
	TREE_JOB_DETAILS = "/portal/tree/job/details",
	TREE_JOB_MATERIAL = "/portal/tree/job/:id/material/:type",
	TREE_JOB_MODEL_VIEWER = "/portal/tree/job/:id/viewer",
	TREE_MEMBER = "/portal/tree/member",
	TREE_TRUSS = "/portal/tree/truss/:id",
	TREE_LINK_TRUSS = "/portal/tree/truss/",
	TREE_TRUSS_SUMMARY = "/portal/tree/truss/:id/summary/:type",
	TREE_TRUSS_MATERIAL = "/portal/tree/truss/:id/material/:type",
	TREE_TRUSS_QUOTATIONS = "/portal/tree/truss/:id/quotations/:type",
	TREE_NAIL_PLATES = "/portal/tree/nail-plates",
	TREE_TRUSS_MULTIPLE = "/portal/tree/truss-multiple/:id",
	TREE_LINK_TRUSS_MULTIPLE = "/portal/tree/truss-multiple/",
	SEARCHED = "/portal/searched",
	SETTINGS_ABOUT_PROGRAM = "/portal/about-program",
	SETTINGS_ORGANIZATION = "/portal/organization",
	SETTINGS_TRUSS = "/portal/truss-settings",
	TEMPLATES = "/portal/templates/:type/:configuration?",
	TEMPLATES_LINK = "/portal/templates/",
	PRICE_LISTS_PLATES = "/portal/price-lists-plates",
	PRICE_LISTS_CUSTOM = "/portal/price-lists-custom",
}
