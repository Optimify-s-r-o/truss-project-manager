import { Lang } from '../lang';

const dictionary: Lang = {
	placeholder: {
		dateInput: "Select Date",
		addressInput: "Enter address",
		customerInput: "Select customer",
	},
	filter: {
		selectedFilters: "Selected filters",
		activeFilters: "Active filters",
	},
	quotations: {
		variables: {
			// Math
			If_Then: "If-Then",
			Multiple_if_then: "Multiple If-Then",
			Exponential: "Exponential",
			Square_root: "Square Root",
			Absolute: "Absolute",
			Logarithm: "Logarithm",
			Round: "Round",
			Min: "Min",
			Max: "Max",
			Summation: "Sum",
			Multiplication: "Product",
			Mean_average: "Mean Average",
			Sample_variance: "Sample Variance",
			Standard_deviation: "Standard Deviation",
			Pi: "Pi Constant",
			Eulers_number: "Euler Number",
			Equality: "Equal",
			Inequality: "Not Equal",
			Lower_than: "Less Then",
			Lower_or_equal: "Less Then or Equal",
			// Trusses
			Type_NotRecognized: "NotRecognized",
			Type_DuoPitched: "Duo Pitched",
			Type_MonoPitched: "Mono Pitched",
			Type_Flat: "Flat",
			Type_ArcShapedBasic: "Arc Shaped Basic",
			Type_ArcShapedWithStraightChord: "Arc Shaped With Straight Chord",
			Type_AtticBasic: "Attic Basic",
			Type_AtticWithStraightChord: "Attic With Straight Chord",
			Type_ContinuousOrSimpleBeam: "Continuous Or Simple Beam",
			Type_ContinuousOrSimpleRafter: "Continuous Or Simple Rafter",
			Type_FrameStructure: "Frame Structure",
			Kind_Truss: "Truss",
			Kind_NonStructuralTruss: "Non Structural Truss",
			Kind_Infill: "Infill",
			Kind_NonStructuralInfill: "Non Structural Infill",
			Kind_GableLadder: "Gable Ladder",
			Timber_Volume: "Čistý objem dřeva",
			Members_Quantity: "Members Quantity",
			Cuts_Quantity: "Cuts Quantity",
			Outer_Volume: "Outer Volume",
			Inner_Volume: "Inner Volume",
			BC_Length: "BC Length",
			STC_Length: "STC Length",
			HTC_Length: "HTC Length",
			Truss_Length: "Length",
			Truss_Height: "Height",
			Truss_Weight: "Weight",
			Truss_Quantity: "Truss Quantity",
			Plies: "Plies Count",
			Parts: "Parts Count",
			Thickness: "Tloušťka",
			Truss_Type: "Truss Type",
			Truss_Kind: "Truss Kind",
			Centres: "Centres",
			Joints_Quantity: "Joints Quantity",
			Splices: "Splices",
			Plates_Quantity: "Plates Quantity",
			Plates_Price: "Plates Price",
			Plates_Weight: "Plates Weight",
			Plates_Area: "Plates Area",
			Supports: "Supports Count",
			// Jobs
			Pitch: "Pitch",
			Covered_Area: "Covered Area",
			Roof_Area: "Roof Area",
			Floor_Area: "Floor Area",
			Wallplate_Length: "Wallplate Length",
			Fascia_Length: "Fascia Length",
			Ridge_Duo: "Ridge Duo",
			Ridge_Mono: "Ridge Mono",
			Hip_Length: "Hip Length",
			Valley_Length: "Valley Length",
			Left_Gable: "Left Gable",
			Right_Gable: "Right Gable",
			Convex_Transition: "Convex Transition",
			Concave_Transition: "Concave Transition",
			Roofing_Load: "Roofing Load",
			Ceiling_Load: "Ceiling Load",
			Snow_Region: "Snow Region",
			Snow_Load: "Snow Load",
			Wind_Region: "Wind Region",
			Wind_Load: "Wind Load",
		},
		description: {
			// Math
			If_Then: "If-Then",
			Multiple_if_then: "Multiple If-Then",
			Exponential: "Exponential",
			Square_root: "Square Root",
			Absolute: "Absolute",
			Logarithm: "Logarithm",
			Round: "Round",
			Min: "Min",
			Max: "Max",
			Summation: "Sum",
			Multiplication: "Product",
			Mean_average: "Mean Average",
			Sample_variance: "Sample Variance",
			Standard_deviation: "Standard Deviation",
			Pi: "Pi Constant",
			Eulers_number: "Euler Number",
			Equality: "Equal",
			Inequality: "Not Equal",
			Lower_than: "Less Then",
			Lower_or_equal: "Less Then or Equal",
			// Trusses
			Type_NotRecognized: "NotRecognized",
			Type_DuoPitched: "Duo Pitched",
			Type_MonoPitched: "Mono Pitched",
			Type_Flat: "Flat",
			Type_ArcShapedBasic: "Arc Shaped Basic",
			Type_ArcShapedWithStraightChord: "Arc Shaped With Straight Chord",
			Type_AtticBasic: "Attic Basic",
			Type_AtticWithStraightChord: "Attic With Straight Chord",
			Type_ContinuousOrSimpleBeam: "Continuous Or Simple Beam",
			Type_ContinuousOrSimpleRafter: "Continuous Or Simple Rafter",
			Type_FrameStructure: "Frame Structure",
			Kind_Truss: "Truss",
			Kind_NonStructuralTruss: "Non Structural Truss",
			Kind_Infill: "Infill",
			Kind_NonStructuralInfill: "Non Structural Infill",
			Kind_GableLadder: "Gable Ladder",
			Timber_Volume: "Čistý objem dřeva",
			Members_Quantity: "Members Quantity",
			Cuts_Quantity: "Cuts Quantity",
			Outer_Volume: "Outer Volume",
			Inner_Volume: "Inner Volume",
			BC_Length: "BC Length",
			STC_Length: "STC Length",
			HTC_Length: "HTC Length",
			Truss_Length: "Length",
			Truss_Height: "Height",
			Truss_Weight: "Weight",
			Truss_Quantity: "Truss Quantity",
			Plies: "Plies Count",
			Parts: "Parts Count",
			Thickness: "Tloušťka",
			Truss_Type: "Truss Type",
			Truss_Kind: "Truss Kind",
			Centres: "Centres",
			Joints_Quantity: "Joints Quantity",
			Splices: "Splices",
			Plates_Quantity: "Plates Quantity",
			Plates_Price: "Plates Price",
			Plates_Weight: "Plates Weight",
			Plates_Area: "Plates Area",
			Supports: "Supports Count",
			// Jobs
			Pitch: "Pitch",
			Covered_Area: "Covered Area",
			Roof_Area: "Roof Area",
			Floor_Area: "Floor Area",
			Wallplate_Length: "Wallplate Length",
			Fascia_Length: "Fascia Length",
			Ridge_Duo: "Ridge Duo",
			Ridge_Mono: "Ridge Mono",
			Hip_Length: "Hip Length",
			Valley_Length: "Valley Length",
			Left_Gable: "Left Gable",
			Right_Gable: "Right Gable",
			Convex_Transition: "Convex Transition",
			Concave_Transition: "Concave Transition",
			Roofing_Load: "Roofing Load",
			Ceiling_Load: "Ceiling Load",
			Snow_Region: "Snow Region",
			Snow_Load: "Snow Load",
			Wind_Region: "Wind Region",
			Wind_Load: "Wind Load",
		},
		section: {
			Math: "Math Formulas",
			Load: ":Roof Load",
			RoofInfo: "Roof Info",
			Topology: "Topology",
			Joints: "Joints",
			Timber: "Timber",
			Kinds: "Kinds",
			Types: "Types",
			ImportedTruss: "Truss Variables",
			ImportedJob: "Jobs Variables",
		},
	},
	remove: {
		project: "Are you sure you want to remove project {{name}} ?",
		job: "Are you sure you want to remove job {{name}} ?",
		customer: "Are you sure you want to remove customer {{name}} ?",
		template: "Are you sure you want to remove the template {{name}} ?",
		section: "Are you sure you want to remove section {{name}} ?",
		variable: "Are you sure you want to remove {{name}} ?",
		account: "Are you sure you want to remove account {{name}} ?",
		priceList: "Are you sure you want to remove the price list {{name}} ?",
		priceListItem: "Are you sure you want to remove {{name}} ?",
		file: 'Are you sure you want to remove file {{name}}" ?',
		model: "Are you sure you want to remove the 3d model ?",
		contactPerson: "Are you sure you want to remove contact person {{name}}",
	},
	priceLists: {
		default: "Default",
		addItem: "Add item",
		removeItem: "Remove item",
		itemName: "Item name",
		quantity: "Quantity in unit",
		pricePerUnit: "Price per uniy",
		action: "Actions",
		menuTitle: "Price lists",
		priceList: "Price list",
		plates: "Plates",
		custom: "Custom",
		duplicatePriceList: "Clone price list",
		duplicatePriceListTitle: "Clone price list {{title}}",
		editPriceList: "Rename price list",
		editPriceListTitle: "Rename price list {{title}}",
		removePriceList: "Remove price list",
		removePriceListTitle: "Remove price list {{title}}",
		confirmRemoval: "Are you sure you want to delete price list?",
		addPriceList: "Add price list",
		name: "Name",
		width: "Width",
		length: "Length",
		thickness: "Thickness",
		price: "Price",
	},
	viewer: {
		title: "3D Model Viewer",
		upload: "Upload 3D model",
		dateOfCreation: "Date of creation",
		uploadedBy: "Uploaded by",
		url: "URL of 3d model",
		link: "Link",
	},
	organization: {
		title: "Organization",
	},
	contextMenu: {
		openProject: "Open project",
		newTruss2DJob: "Create Truss2D job",
		newTruss3DJob: "Create Truss3D job",
		deleteProject: "Delete project",
		openJob: "Open job",
		unlockJob: "Unlock job",
		openJobInTruss: "Open job in Truss2D/3D",
		deleteJob: "Delete job",
		openTruss: "Open truss",
		showCustomer: "Show customer",
		addToSelection: "Add to active selection",
		removeFromSelection: "Remove from active selection",
	},
	truss: {
		openFailed: "Truss could not be started",
		opening: "Truss starts",
		downloadingTrussFile: "The truss file is being downloaded",
		trussFileNotExist:
			"The path to Truss3D does not lead to an executable file. Set the path in the settings section.",
		exeFailedToOpen: "Truss3D opening failed.",
	},
	carousel: {
		title1: "Model Viewer",
		text1:
			"View .3ds and .dxf in a web browser. Dimensioning, selections, advanced camera work and much more.",
		title3: "Software Truss 4",
		text3:
			"Joint plates with pressed-in mandrels and a wide range of connecting and anchoring elements for wooden carpentry structures.",
		title4: "What's new in TRUSS4 version 16",
		text4:
			"Active desktop with local menus. New graphic selections. Trace objects as you type.",
		link3: "https://www.fine.cz/stresni-konstrukce/",
		linkText3: "Link",
		title2: "News in the current version",
		text2:
			"Creating price calculations and generating documentation. Sharing 3D models. Work with multiple tasks at once. Improved multi-user capabilities.",
		link4: "https://www.fine.cz/data/files/Truss_v16_CS.pdf",
		linkText4: "Link",
	},
	templates: {
		totalPrice: "Total price",
		exportedUnit: "Unit",
		unitPrice: "Price per unit",
		sectionSum: "Section sum",
		uploadQuotationTemplate: "Import template",
		downloadQuotationTemplate: "Export template",
		uploadQuotationTemplateTitle: "Import template {{title}}",
		downloadQuotationTemplateTitle: "Export template {{title}}",
		defaultTemplate: "Default",
		duplicateTemplate: "Clone template",
		duplicateTemplateTitle: "Clone template {{title}}",
		editTemplate: "Rename template",
		editTemplateTitle: "Rename template {{title}}",
		removeTemplate: "Remove template",
		removeTemplateTitle: "Remove template {{title}}",
		confirmRemoval: "Are you sure you want to delete the template?",
		addTemplate: "Add template",
		addDefaultTemplate: "Add default template",
		generateNewQuotation: "Recalculation",
		generateNewQuotationFromNewData: "Create new quotation",
		warningQuotation: "Quotation will be overwritten.",
		expressionValid: "The formula is valid",
		expressionInvalid: "The formula is not valid",
		priceValid: "The price is valid",
		priceInvalid: "The price is not valid",
		template: "Template:",
		templates: "Templates",
		project: "Projects",
		job: "Job",
		truss: "Trusses",
		default: "Default",
		configutarions: "Configuration:",
		addVariable: "Add a variable",
		addSection: "Add a section",
		customSection: "Custom sections",
		defaultVariable: "Default variable",
		customVariable: "Custom variable",
		Project: "Projects",
		Job: "Job",
		Truss: "Trusses",
		renameSection: "Rename the section",
		removeSection: "Remove section",
		saveTitle: "Save the name",
		cancelEdit: "Cancel change",
		saveVariable: "Save variable",
		deleteVariable: "Delete variable",
		renameVariable: "Rename variable",
		variables: "Variables",
		cleanCut: "Lumber clean",
		roughCut: "Coarse lumber",
		joints: "Joints",
		desks: "Desks",
		dragAndDrop: "Drag a variable to the equation input.",
		quantity: "Quoantity",
		unit: "Unit",
		expression: "Expression",
		description: "Description",
		pricePerUnit: "Price per unit",
		price: "Price",
		priceList: "Price list",
	},
	validation: {
		min: "The field must contain at least {{count}} characters.",
		max: "The field can contain a maximum of {{count}} characters.",
		required: "Required field.",
		email: "Please enter a valid email",
		phone: "Please enter a valid phone number",
		passwordMatch: "The passwords you entered did not match.",
	},
	common: {
		FileTooLarge: "File size exceeds 100 MB",
		passwordResetSuccessful:
			"Password reset request successful. A password reset link will be sent to your email address shortly.",
		productionsCount: "Number of productions",
		sumOfProjects: "Sum of projects",
		notAdmin:
			"Only the organization administrator can edit the organization information.",
		periodFromDate: "Period from date",
		periodToDate: "Period to date",
		period: "Period",
		pricePerSquareMeter: "Price per square meter",
		jobList: "Job list",
		trussList: "Truss list",
		active: "Active filters {{active}} of {{size}}",
		CannotDeleteDefaultPriceListItem:
			"It is not possible to delete the default item.",
		CannotDeleteDefaultTemplate:
			"It is not possible to delete the default template.",
		PriceNotSet: "Not counted yet",
		PriceIsNaN: "Calculation error",
		trussKind: "Kind",
		project: "Project",
		priceWithoutTrusses: "Price without trusses",
		priceForTrusses: "Price for trusses",
		ares: "Load from ARES",
		FailedToCreateDirectory: "Failed to create directory.",
		FailedToMoveDirectory: "The directory could not be moved.",
		CannotDeleteAdmin: "It is not possible to delete the Admin account.",
		NotDeleted: "Could not be deleted.",
		S3UploadFailed: "File upload failed.",
		IsNotOrganizationAdmin:
			"The action failed. You do not have administrator privileges.",
		CloudOnly: "Cloud version only.",
		NeedToSetEmail: "Email is required.",
		NewPasswordSameAsOld:
			"The new password must be different from the original password.",
		TargetJobLocked: "The job is locked by another user.",
		InvalidQuotationType: "Invalid type of quotation.",
		TitleAlreadyExists: "Name already exists.",
		SomeExpressionNotValid: "Some expressions are not valid.",
		CannotContainVariableKeyword: "Must not contain the word variable.",
		CannotContainSectionKeyword: "Must not contain the word section.",
		CannotContainValueCharacter:
			"Must not contain the following characters: (,), $",
		NoFinishedQuotationExists: "At least one job must have a completed quote",
		FailedToCreateFile: "The file could not be created.",
		PreviousSectionMissing: "The previous section is missing.",
		AtLeastOneSectionRequired: "Enter at least one section.",
		ModelAlreadyExists: "The model already exists.",
		ModelNotExists: "The model does not exist.",
		ModelUploadFailed: "The 3D model could not be uploaded.",
		viewer: "3D Viewer",
		fileStore: "Directory settings",
		projectLocationChange: "The address has been changed.",
		unlock: "Unlock the job",
		createJobFromTrussFile: "Import the job using a Truss file",
		lock: "Job locked by user {{lock}}",
		lockedByMe: "Your locked job",
		saveProjectAndOpenTruss3D: "Create a project and run Truss3D",
		saveProjectAndOpenTruss2D: "Create a project and run Truss2",
		closeWithoutSavingTitle:
			"Are you sure you want to leave the page without saving?",
		closeWithoutSavingMessage:
			"There are unsaved changes on the page. Stay on the page and save your changes.",
		confirmMessage: "Are you sure you want to delete this item?",
		leave: "Discard changes and leave",
		saveChanges: "Save changes and exit",
		stay: "Stay on the page",
		yes: "Yes",
		no: "No",
		changePassword: "Change your password",
		oldPassword: "Old password",
		newPassword: "New password",
		verifyPassword: "Verify your password",
		passwordMatch: "Passwords must match",
		changeRootPath: "Change the file path",
		changeTruss3DPath: "Change the path to Truss3D",
		changeTruss2DPath: "Change the path to Truss2D",
		jobType: "Job type",
		projectState: "Project status",
		editNaturalPerson: "Natural Person edit",
		editEvidencePerson: "Records edit",
		unavailable: "Not available",
		JobUpdateFromTruss: "Updated job from Truss3D",
		UploadModelJob: "3D Model was added",
		itemsToShow: "Items to show",
		showingRecors: " Showing records",
		page: "Page",
		to: "to",
		of: "of",
		kinds: "Kinds",
		Truss: "Truss",
		NonStructuralTruss: "Non-structural Truss",
		Infill: "Infill",
		NonStructuralInfill: "Non-structural Infill",
		GableLadder: "Gable ladder",
		NotRecognized: "Not recognized",
		DuoPitched: "Duo Pitched",
		MonoPitched: "Monopitched",
		Flat: "Flat",
		ArcShapedBasic: "Arc shaped basic",
		ArcShapedWithStraightChord: "Arc shaped with straight chord",
		AtticBasic: "Attic Basic",
		AtticWithStraightChord: "Attic with straight chord",
		ContinuousOrSimpleBeam: "Continuous or simple beam",
		ContinuousOrSimpleRafter: "Continuous or simple rafter",
		FrameStructure: "Frame Structure",
		checkboxSectionGeneral: "General",
		checkboxSectionCalculation: "Calculation",
		checkboxSectionDimensions: "Dimensions",
		checkboxSectionLoad: "Load",
		checkboxSectionWeight: "Weight",
		checkboxSectionConstruction: "Construction",
		activeFilter: "Active filter",
		activeSelection: "Active selection",
		cancelFilter: "Cancel filter",
		cancelSelection: "Cancel selection",
		ArchivedAndRealized: "Implemented",
		ArchivedAndAborted: "Not implemented",
		NewlyCreated: "New",
		QuotationInProgress: "Quotation in progress",
		QuotationFinished: "Quotation finished",
		ConstructionFinished: "Construction finished",
		ProductionInProgress: "Production in Progress",
		ProductionFinished: "Production Finished",
		Finished: "Finished",
		InProgress: "Work in progress",
		Aborted: "Canceled",
		Quotation: "Quotation",
		Construction: "Construction",
		NotCalculated: "Unassessed",
		Succeeded: "Suitable",
		Failed: "Not suitable",
		closeAndSync: "Close and update",
		DuplicateEntity: "Unable to create - the object is already in the database",
		UsernameExists: "Username is already taken",
		InvalidJson: "Unable to read job - unknown format",
		EntityNotFound: "Object is not in the database (It may have been deleted)",
		MissingName: "The name must be filled in",
		MissingNameAndCrn: "It is necessary to fill in the name or ID",
		BadCustomerType:
			"Customer type does not match customer in database (It may have been changed)",
		CrnAlreadyExists: "The entered ID is already in the database",
		MissingSurname: "The surname must be filled in",
		CrnNotFound: "The specified ID was not found",
		LocalOnlyOperation: "Operation allowed only in local mode",
		EmptyOrWhitespaceQuery: "Search must not be blank",
		InvalidTreeOption: "Tree type does not exist",
		FileNameExists: "A file with this name already exists",
		ErrorWhileSavingFile: "Failed to save file",
		FailedToReadFile: "The specified file could not be read",
		FileNotExists:
			"The specified file does not exist (It may have been deleted)",
		DirectoryContainsMoreThanOneFile:
			"There is more than one file in a directory. To continue, you only need to leave the required Truss file in the directory and move the others elsewhere.",
		UserUpdateFailed: "User update failed",
		MissingTrussFile:
			"Truss file not found. (It may have been deleted manually)",
		OnlyOneFileRequired: "Only one Truss file can be uploaded to the job",
		FailedToLoadFilter: "Filter loading failed",
		FilterNameTaken: "A filter with the specified name already exists",
		NoTreeToReset: "Tree reset failed (No filter is used)",
		NameAlreadyExists: "Name already exists",
		InvalidOrMissingRole: "Missing roles.",
		CannotCreateUser: "Could not create user.",
		ConcurrencyFailure: "The object is being edited by another user.",
		PasswordMismatch: "Passwords do not match.",
		Unauthorized: "Incorrect password or username",
		InvalidToken: "Invalid token.",
		LoginAlreadyAssociated: "The specified user is already logged in.",
		InvalidUserName: "Your username is not in a valid format.",
		InvalidEmail: "Your email is not in a valid format.",
		EmailExists: "The email you entered already exists.",
		InvalidRoleName: "Wrong role name.",
		IsTemporaryWithoutTrussData:
			"Unable to open job. It is probably being edited by another user.",
		RoleNameExists: "This role already exists.",
		PasswordAlreadySet: "The password has already been entered.",
		UserLockoutNotEnabled: "Unable to lock user.",
		UserAlreadyInRole: "The role is already assigned to the user.",
		UserNotInRole: "The user does not have a specified role.",
		PasswordTooShort: "Password is too short.",
		PasswordRequiresNonAlphanumeric:
			"Password cannot contain numeric characters.",
		PasswordRequiresDigit:
			"The password requires at least one numeric character.",
		PasswordRequiresLower: "Password requires at least one lowercase letter.",
		PasswordRequiresUpper: "Password requires at least one uppercase letter",
		treeTooltipTrussNotCalculated: "Not calculated",
		treeTooltipTrussFailed: "Declined",
		treeTooltipTrussSucceeded: "Accepted",
		treeTooltipJobQuotationFinished: "Completed quotation",
		treeTooltipJobQuotationInProgress: "Quotation in progress",
		treeTooltipJobQuotationAborted: "Canceled quotation",
		treeTooltipJobConstructionFinished: "Finished production",
		treeTooltipJobConstructionInProgress: "Work in progress",
		treeTooltipJobConstructionAborted: "Proudction aborted",
		treeTooltipJobTRUSS_3D: "Truss3D",
		treeTooltipJobTRUSS_2D: "Truss2D",
		treeTooltipProjectArchivedAndRealized: "Implemented",
		treeTooltipProjectArchivedAndAborted: "Not implemented",
		treeTooltipProjectNewlyCreated: "Newly created",
		treeTooltipProjectQuotationInProgress: "Quotation in progress",
		treeTooltipProjectQuotationFinished: "Completed quotation",
		treeTooltipProjectProductionInProgress: "Work in progress",
		treeTooltipProjectProductionFinished: "Finished production",
		treeTooltipCustomerInEvidence: "Evidence",
		treeTooltipCustomerCompany: "Natural person",
		treeTooltipCustomerPerson: "Company",
		generalInformation: "General",
		descriptionEmptyValueSetTo: "Description set to",
		constructionDateEmptyValueSetTo: "Design delivery date set to",
		quotationDateEmptyValueSetTo: "Quatation submission date set to",
		JobDuplicate: "Job duplicated",
		FileDelete: "Deleted file",
		today: "Today",
		yesterday: "Yesterday",
		thisWeek: "This week",
		lastWeek: "Last week",
		daysUpToToday: "Days up to today",
		daysStartingToday: "Days starting today",
		CreateProject: "Project added",
		CreateJob: "Job crated",
		JobUpdate: "Job updated",
		AssignProjectToUser: "Project assigned to the user",
		FileSavedUnderProject: "File assingned",
		AssignProjectToCustomer: "Project assigned to the customer",
		ProjectUpdate: "Following project properties modified:",
		JobDelete: "Job deleted",
		accepted: "Accepted",
		accounts: "Accounts",
		accountsList: "Accounts list",
		actions: "Action",
		add: "Add",
		addAccount: "Add Account",
		createAccount: "Create Account",
		addTemplate: "Add a template",
		address: "Address",
		admin: "Admin",
		administrator: "Administrator",
		adressModalAdd: "Add an address",
		adressModalDescription: "Enter the project address",
		all: "All",
		altitude: "Altitude",
		appearance: "Appearance",
		assign: "New customer",
		assignee: "Assignee",
		attachedFiles: "Drag the files you want to upload.",
		averagePricePerProjectFilter: "Average price per project filter",
		back: "Back",
		blanks: "Blanks",
		boxPrice: "Box price",
		cancel: "Cancel",
		canceled: "Canceled",
		ceilingArea: "Ceiling area",
		totalCeilingArea: "Total ceiling area",
		averageCeilingArea: "Average ceiling area",
		ceilingLoad: "Ceiling load",
		averageCeilingLoad: "Average ceiling",
		ceilingName: "Insulation",
		centres: "Average centres",
		averageCentres: "Average axial distance of trusses",
		changeLanguage: "Language",
		cityName: "City",
		close: "Close",
		cloud: "Cloud",
		collapse: "Collapse",
		columnSelection: "Column selection",
		Company: "Company",
		companyName: "Name of the company",
		complexity: "Complexity",
		composition: "Composition",
		constructionDate: "Construction date",
		contactPerson: "Contact person",
		contactPersonEdit: "Edit Contact person",
		controlData: "Data control",
		controlInformation: "Data control",
		copy: "Copy to",
		clipboard: "Copy URL",
		copyTo: "Copy to ...",
		count: "Quantity",
		totalCount: "Total count",
		counted: "Calculated",
		country: "Country",
		coveredArea: "Covered area",
		covering: "Covering",
		create: "Create a project",
		createContactPerson: "Add a contact person",
		createDate: "Create date",
		createFromTruss: "Responsible user",
		createFromTrussFolder: "Create from a Truss file",
		createInEvidence: "Create in the register",
		editEvidence: "Edit evidence",
		createJobInTruss3D: "Create a new job in Truss3D",
		createJobInTruss2D: "Create a new job in Truss2D",
		createLegalPerson: "New legal person",
		editLegalPerson: "Edit a legal person",
		createNaturalPerson: "New natural person",
		createNewFromEvidence: "Create from evidence",
		createNewJob: "Create",
		createNewLegal: "Create a new legal person",
		createNewNatural: "Create a new  natural person",
		credit: "Credit",
		crn: "CRN",
		currency: "Currency",
		custom: "Custom",
		customer: "Customer",
		customerPlaceholder: "ID, Company name, Name ...",
		customerModalAdd: "Add a customer to the project",
		customerModalDescription: "Add",
		customers: "Customers",
		customersList: "Customers list",
		customerDateOfCreationFilter: "Customer creation date",
		czech: "Czech",
		date: "Date",
		dateAcceptance: "Acceptance date",
		dateFilterPlaceholder: "Set the time period",
		dateFromBuyLabel: "Date created from",
		dateFromLabel: "Date from",
		dateFromSellLabel: "Settlement date from",
		dateOfCreation: "Creation date",
		dateOfLastUpdate: "Last update",
		dateOfProcessing: "Processing date",
		dateToBuyLabel: "Date created by",
		dateToLabel: "Date to",
		dateToSellLabel: "Settlement date by",
		deadline: "Implementation date",
		debit: "Debit",
		delete: "Delete",
		deleteTooltip: "The record will be deleted when the button is pressed.",
		depth: "Depth",
		description: "Description",
		deskSummary: "Desk summary",
		details: "Details",
		dic: "VAT number",
		dimension: "Dimension",
		discardChanges: "Discard changes",
		display: "Tree view",
		document: "Documents",
		documents: "Documents",
		done: "Finished",
		download: "Download",
		duplicate: "Duplicate the job",
		edit: "Edit",
		editAccount: "Edit account",
		editJob: "Edit the job",
		editTemplate: "Edit the template",
		email: "E-mail",
		emailUsername: "Email (Username)",
		emptyCustomer: "Empty customer",
		emptyFilter: "Filter is unavailable due to lack of data",
		english: "English",
		error: "Counting error",
		errorMessage: "Your request could not be processed.",
		errorMessage503: "The service unavailable.",
		errorMessageProject: "The project could not be created.",
		Evidence: "Evidence",
		evidencePerson: "Evidence",
		excelExport: "Excel export",
		export: "Export",
		extension: "Extension",
		fasciaLength: "Fascial length",
		files: "Files",
		filesText: "Drag files here or click on a bookmark",
		filterApply: "Apply filter",
		filter: "Filter",
		activeFiltr: "Active filter",
		filterDate: "Time intervals",
		filterGeneral: "General information",
		filterSubmit: "Apply filter",
		filterTechnicalParametr: "Technical parameter",
		filterTree: "Filter the tree",
		find: "Search",
		finished: "Done",
		floorArea: "Floor area",
		forename: "Name",
		fullName: "Full name",
		general: "Summary",
		geography: "Geography",
		geometry: "geometry",
		german: "German",
		greenLine: "Infoline",
		height: "Height",
		averageHeight: "Average height",
		help: "Help",
		helpText: "Help text",
		hide: "Hide",
		hideDetail: "Hide details",
		hipLength: "Hip lengths",
		houseNumbering: "House number",
		changeExe: "Select Truss",
		inProgress: "In progress",
		informationAboutProject: "Project information",
		jobName: "Name",
		job: "The job",
		jobs: "Jobs",
		last12Months: "The last 12 months",
		lastChange: "Last modified",
		lastEdit: "Last edit date",
		lastMonth: "Last month",
		lastYear: "Previous year",
		legalPerson: "Legal person",
		length: "Length",
		liaison: "Liaison",
		link: "Open the job",
		listOfProjects: "List of projects",
		listOfTasks: "Job list",
		load: "Load",
		loadWidth: "Load width",
		averageLoadWidth: "Average load width",
		loading: "Loading",
		local: "Local environment",
		loginCloud: "Login to the cloud solution",
		loginLocal: "Login to the local environment",
		logout: "Log out",
		log: "Log",
		lostPassword: "Forgotten password",
		lumber: "Blank",
		main: "Main page",
		material: "Materials",
		max: "The field can contain a maximum of {{count}} characters.",
		members: "Elements",
		membersCount: "Number of parts",
		min: "The field must contain at least {{count}} characters.",
		modalAccountDescription: "Press the Yes button to confirm the action.",
		modalAccountTitle: "Are you sure you want to delete this account?",
		modalCustomerDescription: "Press the Yes button to confirm the action.",
		modalCustomerTitle: "Are you sure you want to delete this customer?",
		modalEditJobTitle: "Edit job",
		editInTruss3D: "Edit in Truss3D",
		editInTruss2D: "Edit in Truss2D",
		modalEditJobDescription:
			"Select the Truss executable and open the job for edit. When you have finished working in Truss, close this window.",
		modalFileDescription: "Press the Yes button to confirm the action.",
		modalFileTitle: "Are you sure you want to delete this file?",
		modalJobDescription: "Press the Yes button to confirm the action.",
		modalJobTitle: "Are you sure you want to delete this job?",
		modalNewJobDescription:
			"Name your new job and open it in Truss. When you have finished working in Truss, close this window.",
		modalNewJobTitle: "Create a new job.",
		modalProjectDescription: "Press the Yes button to confirm the action.",
		modalProjectTitle: "Are you sure you want to delete this project?",
		modalConfirm: "Yes",
		modelCount: "Number of models",
		models: "Models",
		multiplicity: "Multiplicity",
		averageMultiplicity: "Average multiplicity",
		nailPlates: "Nail plates",
		name: "Name",
		naturalPerson: "Individual",
		newAccount: "Add Account",
		newCustomers: "Create a customer",
		newProject: "New project",
		next: "Next",
		notCounted: "Not counted",
		notes: "Note",
		numberInBox: "Number in the box",
		numberOfLayers: "Number of layers",
		numberOfModels: "Number of models",
		totalNumberOfModels: "Total number of models",
		numberOfPart: "Number of parts / joints",
		totalNumberOfPart: "Total number of parts / joints",
		numberOfProductionsFilter: "Number of implemented projects",
		numberOfProjectsFilter: "Number of projects",
		numberOfSupports: "Number of supports",
		totalNumberOfSupports: "Total number of supports",
		averageNumberOfSupports: "Average number of supports",
		numberOfQuotationsFilter: "Number of quatations",
		observer: "Observer",
		open: "Open",
		output: "Production",
		owned: "Owned",
		partOfTheTruss: "Part of a truss",
		parts: "Parts",
		password: "Password",
		passwordRecovery: "Forgot your password?",
		Person: "Natural person",
		person: "Handling person",
		phase: "Phase",
		phone: "Telephone",
		pitch: "Pitch",
		averagePitch: "Average predominant slope",
		place: "Place",
		placeNumber: "House number",
		planks: "Stock lengths",
		planksOnArea: "The volume of planks on the roofed area",
		planksVolume: "The volume of planks",
		totalPlanksVolume: "Total volume of planks",
		averagePlanksVolume: "Average volume of planks",
		planner: "Planner",
		plates: "Plates",
		platesCount: "Plates count",
		totalPlatesCount: "Total number of plates",
		PlateWeightOnArea: "Weight of plates per floor plan area",
		averagePlateWeightOnArea: "Average weight of boards per floor plan area",
		PlatesWeighOnPlanksVolume: "Weight of plates per volume of planks",
		averagePlatesWeighOnPlanksVolume:
			"Average weight of plates per volume of planks",
		platesWeight: "Plate weight",
		totalPlatesWeight: "Total weight of plates",
		averagePlatesWeight: "Average weight of plates",
		ply: "Ply",
		plyCount: "Ply count",
		postcode: "Postcode",
		price: "Price",
		PriceOnPlanks: "Price of the truss on the volume of planks",
		PriceOnArea: "Price of the truss on the floor plan area",
		averagePriceOnArea: "The average price of a truss per floor plan area",
		priceOffer: "Price offer",
		priceOnPlanks: "Price of truss on the volume of planks",
		averagePriceOnPlanks: "The average price of a truss per volume of planks",
		pricePerPiece: "Unit price",
		averagePricePerPiece: "Average unit price",
		process: "Process",
		production: "Production price",
		productionsPerQuotationsFilter:
			"Ratio of implemented and unrealized projects",
		products: "Fine products",
		profile: "Profile",
		projectList: "List of projects",
		projectName: "Project name",
		projectNumber: "Number of projects",
		projects: "Projects",
		quality: "Quality",
		quantity: "Quantity",
		quotation: "Quotation",
		quotationDate: "Quotation date",
		region: "Region",
		regionName: "Region",
		registered: "Registered persons",
		registrationNumber: "Registration number",
		rejected: "Rejected",
		reload: "Reload",
		removeCustomerFilter: "Remove customer Filter",
		removeProjectFilter: "Remove project Filter",
		removeJobFilter: "Remove task Filter",
		removeTrussFilter: "Remove truss Filter",
		removeSelection: "Delete selection",
		required: "Required field.",
		ridge: "Ridge lenghts",
		ridgeLength: "Groove lengths",
		rights: "Rights settings",
		roof: "Roofing data",
		roofArea: "Roof area",
		roofType: "Roof type",
		roofingArea: "Roofing area",
		totalRoofingArea: "Total roofing area",
		averageRoofingArea: "Average roofing area",
		roofingLoad: "Roofing load",
		averageRoofingLoad: "Average roofing",
		roofingName: "Roofing name",
		roofName: "Roof",
		save: "Save Changes",
		search: "Search ...",
		selectAllJobs: "Select all jobs",
		selectAllProjects: "Select all projects",
		selectAllTrusses: "Select all trusses",
		sendNewPassword: "Submit new password",
		settings: "Settings",
		show: "Display",
		showColumns: "Column display",
		showDetail: "Details",
		showFilter: "Show filters",
		hideFilter: "Hide filters",
		filterTitle: "Filtration",
		filterNotSet: "Not set",
		projectFilter: "Project filter",
		jobFilter: "Job filter",
		trussFilter: "Truss filter",
		customerFilter: "Customer filter",
		size: "Dimension",
		sizes: "Dimensions",
		snowArea: "Snow areas",
		snowLoad: "Snow load",
		averageSnowLoad: "Average snow load",
		snowRegion: "Snow area",
		span: "Span",
		standard: "Standard",
		state: "State",
		status: "Status",
		street: "Street",
		streetName: "Street",
		submit: "Log in",
		successMessage: "All data was processed successfully.",
		successMessageProject: "The project was created successfully.",
		sumOfProjectPricesFilter: "Sum of project prices",
		summary: "Summary",
		surname: "Surname",
		suspendedCeiling: "Ceiling",
		system: "System",
		terms: " Terms and conditions",
		termsText: "|The text of the terms and conditions",
		theme: "Color change",
		thickness: "Thickness",
		averageThickness: "Average thickness",
		thisMonth: "This month",
		thisYear: "This year",
		tilt: "Tilt",
		averageTilt: "Average tilt",
		timberSummary: "Timber summary",
		timeOfCreation: "Founding date",
		timePeriod: "Time period",
		title: "Account management",
		totalPrice: "Total price",
		priceTotal: "Total price",
		averagePrice: "Average price",
		town: "City",
		transportWeight: "Transport weight",
		totalTransportWeight: "Total transport weight",
		truss: "Truss",
		trussCount: "Number of trusses",
		trussCountSum: "Total number of trusses",
		totalTrussCountSum: "Total number of truss types",
		trusses: "Trusses",
		trussType: "Truss type",
		trussTypesCount: "Number of truss types",
		trussTypesCountSum: "Total number of truss types",
		totalTrussTypesCountSum: "Total number of truss types",
		type: "Type",
		customerType: "Customer type",
		typeOfContract: "Type of contract",
		typeOfTruss: "Truss type",
		unHanded: "Unhanded",
		units: "Units",
		upload: "Upload a file",
		uploadTrussJson: "Upload a job",
		usefulInTheAttic: "Useful in the attic",
		averageUsefulInTheAttic: "Average utility in the attic",
		user: "Responsible person",
		userAccount: "User account",
		userboard: "User board",
		username: "Username",
		utilityInTheAttic: "Useful in the attic",
		vatRegNo: "VAT number",
		PlatesOnArea: "The volume of wood per floor plan area",
		averagePlatesOnArea: "Average volume of wood per floor plan area",
		wallplateLength: "The length of the masonry",
		weight: "Plates weight",
		weightOfBucklesPerPlanArea: "Weight of plates per floor plan area",
		weightOfBucklesPerVolumeOfWood: "Weight of plates per volume of wood",
		width: "Width",
		averageWidth: "Average span",
		windArea: "Windy areas",
		windLoad: "Wind load",
		averageWindLoad: "Average wind load",
		windRegion: "Wind area",
		woodVolume: "The volume of wood",
		woodenElement: "Wooden element",
		WindAreaNotSet: "Only without wind area",
		SnowAreaNotSet: "Only without snow area",
		wordExport: "Word export",
		account: {
			ORGANIZATIONADMIN: "Admin",
			DESIGNENGINEER: "Design engineer",
			VIEWER: "Host",
			role: "Role",
		},
		tooltip: {
			allRecords: "All records",
			addressFilter: "Only without the address entered",
			projectUserFilter: "Only without a responsible person",
			projectCustomerFilter: "Pouze bez zakazníka",
			jobQueryFilter: "Only without customer",
			filtered:
				"Filters are active - matches {{totalRecords}} of {{recordsBeforeFilter}} records.",
		},
	},
	settings: {
		aboutProgram: "About program",
		programVersion: "Program version",
		programName: "Program name",
		system: "System",
	},
};

export default dictionary;
