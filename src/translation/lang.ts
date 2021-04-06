import { createProxy } from '../utils/getPath';

export type Lang = Readonly<{
	table: {
		setDefault: string;
		headersEmpty: string;
	};
	customer: {
		placeholder: string;
		newCustomer: string;
		add: string;
	};
	placeholder: {
		dateInput: string;
		addressInput: string;
		customerInput: string;
	};
	filter: {
		selectedFilters: string;
		activeFilters: string;
	};
	quotations: {
		variables: {
			// Math
			If_Then: string;
			Multiple_if_then: string;
			Exponential: string;
			Square_root: string;
			Absolute: string;
			Logarithm: string;
			Round: string;
			Min: string;
			Max: string;
			Summation: string;
			Multiplication: string;
			Mean_average: string;
			Sample_variance: string;
			Standard_deviation: string;
			Pi: string;
			Eulers_number: string;
			Equality: string;
			Inequality: string;
			Lower_than: string;
			Lower_or_equal: string;
			// Trusses
			Type_NotRecognized: string;
			Type_DuoPitched: string;
			Type_MonoPitched: string;
			Type_Flat: string;
			Type_ArcShapedBasic: string;
			Type_ArcShapedWithStraightChord: string;
			Type_AtticBasic: string;
			Type_AtticWithStraightChord: string;
			Type_ContinuousOrSimpleBeam: string;
			Type_ContinuousOrSimpleRafter: string;
			Type_FrameStructure: string;
			Kind_Truss: string;
			Kind_NonStructuralTruss: string;
			Kind_Infill: string;
			Kind_NonStructuralInfill: string;
			Kind_GableLadder: string;
			Timber_Volume: string;
			Members_Quantity: string;
			Cuts_Quantity: string;
			Outer_Volume: string;
			Inner_Volume: string;
			BC_Length: string;
			STC_Length: string;
			HTC_Length: string;
			Truss_Length: string;
			Truss_Height: string;
			Truss_Weight: string;
			Truss_Quantity: string;
			Plies: string;
			Parts: string;
			Thickness: string;
			Truss_Type: string;
			Truss_Kind: string;
			Centres: string;
			Joints_Quantity: string;
			Splices: string;
			Plates_Quantity: string;
			Plates_Price: string;
			Plates_Weight: string;
			Plates_Area: string;
			Supports: string;
			// Jobs
			Pitch: string;
			Covered_Area: string;
			Roof_Area: string;
			Floor_Area: string;
			Wallplate_Length: string;
			Fascia_Length: string;
			Ridge_Duo: string;
			Ridge_Mono: string;
			Hip_Length: string;
			Valley_Length: string;
			Left_Gable: string;
			Right_Gable: string;
			Convex_Transition: string;
			Concave_Transition: string;
			Roofing_Load: string;
			Ceiling_Load: string;
			Snow_Region: string;
			Snow_Load: string;
			Wind_Region: string;
			Wind_Load: string;
		};
		description: {
			// Math
			If_Then: string;
			Multiple_if_then: string;
			Exponential: string;
			Square_root: string;
			Absolute: string;
			Logarithm: string;
			Round: string;
			Min: string;
			Max: string;
			Summation: string;
			Multiplication: string;
			Mean_average: string;
			Sample_variance: string;
			Standard_deviation: string;
			Pi: string;
			Eulers_number: string;
			Equality: string;
			Inequality: string;
			Lower_than: string;
			Lower_or_equal: string;
			// Trusses
			Type_NotRecognized: string;
			Type_DuoPitched: string;
			Type_MonoPitched: string;
			Type_Flat: string;
			Type_ArcShapedBasic: string;
			Type_ArcShapedWithStraightChord: string;
			Type_AtticBasic: string;
			Type_AtticWithStraightChord: string;
			Type_ContinuousOrSimpleBeam: string;
			Type_ContinuousOrSimpleRafter: string;
			Type_FrameStructure: string;
			Kind_Truss: string;
			Kind_NonStructuralTruss: string;
			Kind_Infill: string;
			Kind_NonStructuralInfill: string;
			Kind_GableLadder: string;
			Timber_Volume: string;
			Members_Quantity: string;
			Cuts_Quantity: string;
			Outer_Volume: string;
			Inner_Volume: string;
			BC_Length: string;
			STC_Length: string;
			HTC_Length: string;
			Truss_Length: string;
			Truss_Height: string;
			Truss_Weight: string;
			Truss_Quantity: string;
			Plies: string;
			Parts: string;
			Thickness: string;
			Truss_Type: string;
			Truss_Kind: string;
			Centres: string;
			Joints_Quantity: string;
			Splices: string;
			Plates_Quantity: string;
			Plates_Price: string;
			Plates_Weight: string;
			Plates_Area: string;
			Supports: string;
			// Jobs
			Pitch: string;
			Covered_Area: string;
			Roof_Area: string;
			Floor_Area: string;
			Wallplate_Length: string;
			Fascia_Length: string;
			Ridge_Duo: string;
			Ridge_Mono: string;
			Hip_Length: string;
			Valley_Length: string;
			Left_Gable: string;
			Right_Gable: string;
			Convex_Transition: string;
			Concave_Transition: string;
			Roofing_Load: string;
			Ceiling_Load: string;
			Snow_Region: string;
			Snow_Load: string;
			Wind_Region: string;
			Wind_Load: string;
		};
		section: {
			Math: string;
			Load: string;
			RoofInfo: string;
			Topology: string;
			Joints: string;
			Timber: string;
			Kinds: string;
			Types: string;
			ImportedTruss: string;
			ImportedJob: string;
		};
	};
	remove: {
		project: string;
		job: string;
		customer: string;
		template: string;
		section: string;
		variable: string;
		account: string;
		priceList: string;
		priceListItem: string;
		file: string;
		model: string;
		contactPerson: string;
		customerHasProject: string;
	};

	priceLists: {
		default: string;
		addItem: string;
		removeItem: string;
		itemName: string;
		quantity: string;
		pricePerUnit: string;
		action: string;
		menuTitle: string;
		priceList: string;
		plates: string;
		custom: string;
		duplicatePriceList: string;
		duplicatePriceListTitle: string;
		editPriceList: string;
		editPriceListTitle: string;
		removePriceList: string;
		removePriceListTitle: string;
		confirmRemoval: string;
		addPriceList: string;
		name: string;
		width: string;
		length: string;
		thickness: string;
		price: string;
	};
	viewer: {
		title: string;
		upload: string;
		dateOfCreation: string;
		uploadedBy: string;
		url: string;
		link: string;
	};
	organization: {
		title: string;
	};
	contextMenu: {
		openProject: string;
		newTruss2DJob: string;
		newTruss3DJob: string;
		deleteProject: string;
		openJob: string;
		unlockJob: string;
		openJobInTruss: string;
		deleteJob: string;
		openTruss: string;
		showCustomer: string;
		addToSelection: string;
		removeFromSelection: string;
		copyJob: string;
		pasteJob: string;
	};

	truss: {
		openFailed: string;
		opening: string;
		downloadingTrussFile: string;
		trussFileNotExist: string;
		exeFailedToOpen: string;
	};
	validation: {
		min: string;
		max: string;
		required: string;
		companyOrSurnameRequired: string;
		email: string;
		phone: string;
		passwordMatch: string;
	};

	carousel: {
		title1: string;
		text1: string;
		link3: string;
		linkText3: string;
		title2: string;
		text2: string;
		title3: string;
		text3: string;
		title4: string;
		text4: string;
		link4: string;
		linkText4: string;
	};

	templates: {
		exportedUnit: string;
		unitPrice: string;
		totalPrice: string;
		sectionSum: string;
		uploadQuotationTemplate: string;
		downloadQuotationTemplate: string;
		uploadQuotationTemplateTitle: string;
		downloadQuotationTemplateTitle: string;
		defaultTemplate: string;
		duplicateTemplate: string;
		duplicateTemplateTitle: string;
		editTemplate: string;
		editTemplateTitle: string;
		removeTemplate: string;
		removeTemplateTitle: string;
		confirmRemoval: string;
		addTemplate: string;
		addDefaultTemplate: string;
		warningQuotation: string;
		generateNewQuotation: string;
		generateNewQuotationFromNewData: string;
		expressionValid: string;
		expressionInvalid: string;
		priceValid: string;
		priceInvalid: string;
		template: string;
		templates: string;
		project: string;
		job: string;
		truss: string;
		default: string;
		configutarions: string;
		addVariable: string;
		addSection: string;
		customSection: string;
		defaultVariable: string;
		customVariable: string;
		Project: string;
		Job: string;
		Truss: string;
		renameSection: string;
		removeSection: string;
		saveTitle: string;
		cancelEdit: string;
		saveVariable: string;
		deleteVariable: string;
		renameVariable: string;
		variables: string;
		cleanCut: string;
		roughCut: string;
		joints: string;
		desks: string;
		dragAndDrop: string;
		quantity: string;
		unit: string;
		expression: string;
		description: string;
		pricePerUnit: string;
		price: string;
		priceList: string;
	};

	common: {
		downloadingJob: string;
		jobDownloaded: string;
		copyingJob: string;
		jobCopied: string;
		CustomerExists: string;
		statistics: string;
		designPrice: string;
		FileTooLarge: string;
		passwordResetSuccessful: string;
		productionsCount: string;
		sumOfProjects: string;
		notAdmin: string;
		period: string;
		periodFromDate: string;
		periodToDate: string;
		pricePerSquareMeter: string;
		jobList: string;
		trussList: string;
		active: string;
		CannotDeleteDefaultPriceListItem: string;
		CannotDeleteDefaultTemplate: string;
		PriceNotSet: string;
		PriceIsNaN: string;
		trussKind: string;
		project: string;
		priceWithoutTrusses: string;
		priceForTrusses: string;
		ares: string;
		FailedToCreateDirectory: string;
		FailedToMoveDirectory: string;
		CannotDeleteAdmin: string;
		NotDeleted: string;
		S3UploadFailed: string;
		IsNotOrganizationAdmin: string;
		CloudOnly: string;
		NeedToSetEmail: string;
		NewPasswordSameAsOld: string;
		TargetJobLocked: string;
		InvalidQuotationType: string;
		MissingSurnameAndCompany: string;
		TitleAlreadyExists: string;
		SomeExpressionNotValid: string;
		CannotContainVariableKeyword: string;
		CannotContainSectionKeyword: string;
		CannotContainValueCharacter: string;
		NoFinishedQuotationExists: string;
		FailedToCreateFile: string;
		PreviousSectionMissing: string;
		AtLeastOneSectionRequired: string;
		ModelAlreadyExists: string;
		ModelNotExists: string;
		ModelUploadFailed: string;
		viewer: string;
		fileStore: string;
		projectLocationChange: string;
		unlock: string;
		createJobFromTrussFile: string;
		lock: string;
		lockedByMe: string;
		saveProjectAndOpenTruss3D: string;
		saveProjectAndOpenTruss2D: string;
		leave: string;
		saveChanges: string;
		stay: string;
		closeWithoutSavingTitle: string;
		closeWithoutSavingMessage: string;
		actionWithoutSavingTitle: string;
		actionWithoutSavingMessage: string;
		editInTruss3D: string;
		editInTruss2D: string;
		confirmMessage: string;
		yes: string;
		no: string;
		changePassword: string;
		oldPassword: string;
		newPassword: string;
		verifyPassword: string;
		passwordMatch: string;
		changeRootPath: string;
		changeTruss3DPath: string;
		changeTruss2DPath: string;
		jobType: string;
		projectState: string;
		jobState: string;
		editNaturalPerson: string;
		editEvidencePerson: string;
		unavailable: string;
		JobUpdateFromTruss: string;
		UploadModelJob: string;
		itemsToShow: string;
		showingRecors: string;
		page: string;
		to: string;
		of: string;
		kinds: string;
		Truss: string;
		NonStructuralTruss: string;
		Infill: string;
		NonStructuralInfill: string;
		GableLadder: string;
		NotRecognized: string;
		DuoPitched: string;
		MonoPitched: string;
		Flat: string;
		ArcShapedBasic: string;
		ArcShapedWithStraightChord: string;
		AtticBasic: string;
		AtticWithStraightChord: string;
		ContinuousOrSimpleBeam: string;
		ContinuousOrSimpleRafter: string;
		FrameStructure: string;
		checkboxSectionGeneral: string;
		checkboxSectionDate: string;
		checkboxSectionStatistics: string;
		checkboxSectionCalculation: string;
		checkboxSectionDesignPrice: string;
		checkboxSectionDimensions: string;
		checkboxSectionLoad: string;
		checkboxSectionWeight: string;
		checkboxSectionConstruction: string;
		activeFilter: string;
		activeSelection: string;
		cancelFilter: string;
		cancelSelection: string;
		ArchivedAndRealized: string;
		ArchivedAndAborted: string;
		NewlyCreated: string;
		QuotationInProgress: string;
		QuotationFinished: string;
		ConstructionFinished: string;
		ProductionInProgress: string;
		ProductionFinished: string;
		ProductionAborted: string;
		QuotationAborted: string;
		Finished: string;
		InProgress: string;
		Aborted: string;
		Quotation: string;
		Construction: string;
		NotCalculated: string;
		Succeeded: string;
		Failed: string;
		closeAndSync: string;
		DuplicateEntity: string;
		UsernameExists: string;
		InvalidSelection: string;
		JobNameTaken: string;
		CannotDeleteCustomerInUse: string;
		InvalidJson: string;
		EntityNotFound: string;
		NameAlreadyExists: string;
		MissingName: string;
		MissingNameAndCrn: string;
		BadCustomerType: string;
		CrnAlreadyExists: string;
		MissingSurname: string;
		CrnNotFound: string;
		LocalOnlyOperation: string;
		EmptyOrWhitespaceQuery: string;
		InvalidTreeOption: string;
		FileNameExists: string;
		ErrorWhileSavingFile: string;
		FailedToReadFile: string;
		FileNotExists: string;
		DirectoryContainsMoreThanOneFile: string;
		UserUpdateFailed: string;
		MissingTrussFile: string;
		OnlyOneFileRequired: string;
		FailedToLoadFilter: string;
		FilterNameTaken: string;
		NoTreeToReset: string;
		InvalidOrMissingRole: string;
		CannotCreateUser: string;
		ConcurrencyFailure: string;
		PasswordMismatch: string;
		InvalidToken: string;
		LoginAlreadyAssociated: string;
		InvalidUserName: string;
		InvalidEmail: string;
		EmailExists: string;
		Unauthorized: string;
		IsTemporaryWithoutTrussData: string;
		InvalidRoleName: string;
		RoleNameExists: string;
		PasswordAlreadySet: string;
		UserLockoutNotEnabled: string;
		UserAlreadyInRole: string;
		UserNotInRole: string;
		PasswordTooShort: string;
		PasswordRequiresNonAlphanumeric: string;
		PasswordRequiresDigit: string;
		PasswordRequiresLower: string;
		PasswordRequiresUpper: string;
		finishedQuotationCount: string;
		finishedProductionCount: string;
		// Truss
		treeTooltipTrussNotCalculated: string;
		treeTooltipTrussFailed: string;
		treeTooltipTrussSucceeded: string;

		// Job
		treeTooltipJobQuotationFinished: string;
		treeTooltipJobQuotationInProgress: string;
		treeTooltipJobQuotationAborted: string;
		treeTooltipJobConstructionFinished: string;
		treeTooltipJobConstructionInProgress: string;
		treeTooltipJobConstructionAborted: string;

		treeTooltipJobTRUSS_3D: string;
		treeTooltipJobTRUSS_2D: string;

		// Project
		treeTooltipProjectArchivedAndRealized: string;
		treeTooltipProjectArchivedAndAborted: string;
		treeTooltipProjectNewlyCreated: string;
		treeTooltipProjectQuotationInProgress: string;
		treeTooltipProjectQuotationFinished: string;
		treeTooltipProjectProductionInProgress: string;
		treeTooltipProjectProductionFinished: string;

		// Customer
		treeTooltipCustomerInEvidence: string;
		treeTooltipCustomerCompany: string;
		treeTooltipCustomerPerson: string;

		generalInformation: string;
		descriptionEmptyValueSetTo: string;
		constructionDateEmptyValueSetTo: string;
		quotationDateEmptyValueSetTo: string;
		JobDuplicate: string;
		FileDelete: string;
		today: string;
		yesterday: string;
		thisWeek: string;
		lastWeek: string;
		daysUpToToday: string;
		daysStartingToday: string;
		CreateProject: string;
		CreateJob: string;
		JobUpdate: string;
		AssignProjectToUser: string;
		FileSavedUnderProject: string;
		AssignProjectToCustomer: string;
		ProjectUpdate: string;
		JobDelete: string;
		accepted: string;
		accounts: string;
		accountsList: string;
		actions: string;
		add: string;
		addAccount: string;
		createAccount: string;
		addTemplate: string;
		address: string;
		admin: string;
		administrator: string;
		adressModalAdd: string;
		adressModalDescription: string;
		all: string;
		altitude: string;
		appearance: string;
		assign: string;
		assignee: string;
		attachedFiles: string;
		averagePricePerProjectFilter: string;
		back: string;
		blanks: string;
		boxPrice: string;
		cancel: string;
		canceled: string;
		ceilingArea: string;
		totalCeilingArea: string;
		averageCeilingArea: string;
		ceilingLoad: string;
		averageCeilingLoad: string;
		ceilingName: string;
		centres: string;
		averageCentres: string;
		changeLanguage: string;
		cityName: string;
		close: string;
		cloud: string;
		collapse: string;
		columnSelection: string;
		companyName: string;
		complexity: string;
		Company: string;
		composition: string;
		constructionDate: string;
		contactPerson: string;
		contactPersonEdit: string;
		controlData: string;
		controlInformation: string;
		copy: string;
		clipboard: string;
		copyTo: string;
		count: string;
		countSum: string;
		countPerTruss: string;
		totalCount: string;
		counted: string;
		country: string;
		coveredArea: string;
		covering: string;
		customerDateOfCreationFilter: string;
		create: string;
		createContactPerson: string;
		createDate: string;
		createFromTruss: string;
		createFromTrussFolder: string;
		createInEvidence: string;
		editEvidence: string;
		createJobInTruss3D: string;
		createJobInTruss2D: string;
		createCustomer: string;
		editLegalPerson: string;
		createNaturalPerson: string;
		createNewFromEvidence: string;
		createNewJob: string;
		newCustomer: string;
		editCustomer: string;
		createNewLegal: string;
		createNewNatural: string;
		credit: string;
		crn: string;
		currency: string;
		custom: string;
		customer: string;
		customerPlaceholder: string;
		customerModalAdd: string;
		customerModalDescription: string;
		customers: string;
		customersList: string;
		czech: string;
		date: string;
		dateAcceptance: string;
		dateFilterPlaceholder: string;
		dateFromBuyLabel: string;
		dateFromLabel: string;
		dateFromSellLabel: string;
		dateOfCreation: string;
		jobDateOfCreation: string;
		dateOfLastUpdate: string;
		jobDateOfLastUpdate: string;
		dateOfProcessing: string;
		dateToBuyLabel: string;
		dateToLabel: string;
		dateToSellLabel: string;
		deadline: string;
		debit: string;
		delete: string;
		deleteTooltip: string;
		depth: string;
		description: string;
		deskSummary: string;
		details: string;
		dic: string;
		dimension: string;
		discardChanges: string;
		display: string;
		document: string;
		documents: string;
		done: string;
		download: string;
		duplicate: string;
		edit: string;
		editAccount: string;
		editJob: string;
		editTemplate: string;
		email: string;
		emailUsername: string;
		emptyCustomer: string;
		emptyFilter: string;
		english: string;
		error: string;
		errorMessage: string;
		errorMessage503: string;
		errorMessageProject: string;
		Evidence: string;
		evidencePerson: string;
		excelExport: string;
		export: string;
		extension: string;
		fasciaLength: string;
		files: string;
		filesText: string;
		filterApply: string;
		filter: string;
		activeFiltr: string;
		filterDate: string;
		filterGeneral: string;
		filterSubmit: string;
		filterTechnicalParametr: string;
		checkboxSectionTechnicalParameters: string;
		filterTree: string;
		find: string;
		finished: string;
		floorArea: string;
		forename: string;
		fullName: string;
		general: string;
		geography: string;
		geometry: string;
		german: string;
		greenLine: string;
		height: string;
		averageHeight: string;
		help: string;
		helpText: string;
		hide: string;
		hideDetail: string;
		hipLength: string;
		houseNumbering: string;
		changeExe: string;
		inProgress: string;
		informationAboutProject: string;
		jobName: string;
		job: string;
		jobs: string;
		last12Months: string;
		lastChange: string;
		lastEdit: string;
		lastMonth: string;
		lastYear: string;
		legalPerson: string;
		length: string;
		liaison: string;
		link: string;
		listOfProjects: string;
		listOfTasks: string;
		load: string;
		loadWidth: string;
		averageLoadWidth: string;
		loading: string;
		local: string;
		loginCloud: string;
		loginLocal: string;
		logout: string;
		log: string;
		lostPassword: string;
		lumber: string;
		main: string;
		material: string;
		max: string;
		members: string;
		membersCount: string;
		min: string;
		modalAccountDescription: string;
		modalAccountTitle: string;
		modalCustomerDescription: string;
		modalCustomerTitle: string;
		modalEditJobTitle: string;
		modalEditJobDescription: string;
		modalFileDescription: string;
		modalFileTitle: string;
		modalJobDescription: string;
		modalJobTitle: string;
		modalNewJobDescription: string;
		modalNewJobTitle: string;
		modalProjectDescription: string;
		modalProjectTitle: string;
		modalConfirm: string;
		modelCount: string;
		models: string;
		multiplicity: string;
		averageMultiplicity: string;
		nailPlates: string;
		name: string;
		naturalPerson: string;
		newAccount: string;
		newProject: string;
		next: string;
		notCounted: string;
		notes: string;
		numberInBox: string;
		numberOfLayers: string;
		numberOfModels: string;
		totalNumberOfModels: string;
		numberOfPart: string;
		totalNumberOfPart: string;
		numberOfProductionsFilter: string;
		numberOfProjectsFilter: string;
		numberOfSupports: string;
		totalNumberOfSupports: string;
		averageNumberOfSupports: string;
		numberOfQuotationsFilter: string;
		observer: string;
		open: string;
		output: string;
		owned: string;
		partOfTheTruss: string;
		parts: string;
		password: string;
		passwordRecovery: string;
		Person: string;
		person: string;
		phase: string;
		phone: string;
		pitch: string;
		averagePitch: string;
		place: string;
		placeNumber: string;
		planks: string;
		planksOnArea: string;
		planksVolume: string;
		totalPlanksVolume: string;
		averagePlanksVolume: string;
		planner: string;
		plates: string;
		platesCount: string;
		totalPlatesCount: string;
		PlateWeightOnArea: string;
		averagePlateWeightOnArea: string;
		PlatesWeighOnPlanksVolume: string;
		averagePlatesWeighOnPlanksVolume: string;
		platesWeight: string;
		totalPlatesWeight: string;
		averagePlatesWeight: string;
		ply: string;
		plyCount: string;
		postcode: string;
		price: string;
		PriceOnPlanks: string;
		priceOffer: string;
		PriceOnArea: string;
		averagePriceOnArea: string;
		priceOnPlanks: string;
		averagePriceOnPlanks: string;
		pricePerPiece: string;
		averagePricePerPiece: string;
		process: string;
		production: string;
		productionsPerQuotationsFilter: string;
		products: string;
		profile: string;
		projectList: string;
		projectName: string;
		projectNumber: string;
		projects: string;
		quality: string;
		quantity: string;
		quotation: string;
		quotationDate: string;
		region: string;
		regionName: string;
		registered: string;
		registrationNumber: string;
		rejected: string;
		reload: string;
		removeCustomerFilter: string;
		removeProjectFilter: string;
		removeJobFilter: string;
		removeTrussFilter: string;
		removeSelection: string;
		required: string;
		ridge: string;
		ridgeLength: string;
		rights: string;
		roof: string;
		roofArea: string;
		roofType: string;
		roofingArea: string;
		totalRoofingArea: string;
		averageRoofingArea: string;
		roofingLoad: string;
		averageRoofingLoad: string;
		roofingName: string;
		roofName: string;
		save: string;
		search: string;
		selectAllJobs: string;
		selectAllProjects: string;
		selectAllTrusses: string;
		sendNewPassword: string;
		settings: string;
		show: string;
		showColumns: string;
		showDetail: string;
		showFilter: string;
		hideFilter: string;
		projectFilter: string;
		jobFilter: string;
		trussFilter: string;
		customerFilter: string;
		filterTitle: string;
		filterNotSet: string;
		size: string;
		sizes: string;
		snowArea: string;
		snowLoad: string;
		averageSnowLoad: string;
		snowRegion: string;
		span: string;
		standard: string;
		state: string;
		status: string;
		street: string;
		streetName: string;
		submit: string;
		successMessage: string;
		successMessageProject: string;
		sumOfProjectPricesFilter: string;
		summary: string;
		surname: string;
		suspendedCeiling: string;
		system: string;
		terms: string;
		termsText: string;
		theme: string;
		thickness: string;
		averageThickness: string;
		thisMonth: string;
		thisYear: string;
		tilt: string;
		averageTilt: string;
		timberSummary: string;
		timeOfCreation: string;
		projectTimeOfCreation: string;
		timePeriod: string;
		totalPrice: string;
		priceTotal: string;
		averagePrice: string;
		town: string;
		transportWeight: string;
		totalTransportWeight: string;
		truss: string;
		trussCount: string;
		trussCountSum: string;
		totalTrussCountSum: string;
		trusses: string;
		trussType: string;
		trussTypesCount: string;
		trussTypesCountSum: string;
		totalTrussTypesCountSum: string;
		type: string;
		customerType: string;
		typeOfContract: string;
		typeOfTruss: string;
		unHanded: string;
		units: string;
		upload: string;
		uploadTrussJson: string;
		usefulInTheAttic: string;
		averageUsefulInTheAttic: string;
		user: string;
		userAccount: string;
		userboard: string;
		username: string;
		utilityInTheAttic: string;
		vatRegNo: string;
		PlatesOnArea: string;
		averagePlatesOnArea: string;
		wallplateLength: string;
		weight: string;
		weightOfBucklesPerPlanArea: string;
		weightOfBucklesPerVolumeOfWood: string;
		width: string;
		averageWidth: string;
		windArea: string;
		windLoad: string;
		averageWindLoad: string;
		windRegion: string;
		woodVolume: string;
		woodenElement: string;
		WindAreaNotSet: string;
		SnowAreaNotSet: string;
		wordExport: string;
		account: {
			ORGANIZATIONADMIN: string;
			DESIGNENGINEER: string;
			VIEWER: string;
			role: string;
		};
		tooltip: {
			columnSelectorDisabled: string;
			allRecords: string;
			addressFilter: string;
			projectUserFilter: string;
			projectCustomerFilter: string;
			jobQueryFilter: string;
			filtered: string;
		};
	};
	settings: {
		aboutProgram: string;
		programVersion: string;
		programName: string;
		system: string;
	};
}>;

export default createProxy<Lang>();
