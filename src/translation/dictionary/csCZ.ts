import { Lang } from '../lang';

const dictionary: Lang = {
	customer: {
		placeholder: "Hledat zákazníka",
		newCustomer: "Nový zákazník",
		add: "Přidat",
	},
	placeholder: {
		dateInput: "Vyberte datum",
		addressInput: "Zadejte adresu",
		customerInput: "Vyberte zákazníka",
	},
	filter: {
		selectedFilters: "Vybrané filtry",
		activeFilters: "Aktivní filtry",
	},
	quotations: {
		variables: {
			// Math
			If_Then: "Podmínka KDYŽ",
			Multiple_if_then: "Řada podmínek KDYŽ",
			Exponential: "Na druhou",
			Square_root: "Odmocmina",
			Absolute: "Absolutní hodnota",
			Logarithm: "Logaritmus",
			Round: "Zaokrouhlení",
			Min: "Minimum",
			Max: "Maximum",
			Summation: "Suma",
			Multiplication: "Produkt",
			Mean_average: "Průměr",
			Sample_variance: "Rozptyl",
			Standard_deviation: "Směrodatná odchylka",
			Pi: "Konstanta Pi",
			Eulers_number: "Konstanta e",
			Equality: "Test rovnosti",
			Inequality: "Test nerovnosti",
			Lower_than: "Menší než",
			Lower_or_equal: "Menší nebo rovno",
			// Trusses
			Type_NotRecognized: "Nerozpoznaný",
			Type_DuoPitched: "Základní trojúhelníkový",
			Type_MonoPitched: "Jednostranný trojúhelníkový",
			Type_Flat: "Přímopásový",
			Type_ArcShapedBasic: "Obloukový základní",
			Type_ArcShapedWithStraightChord: "Obloukový s přímým pasem",
			Type_AtticBasic: "Základní hambalkový",
			Type_AtticWithStraightChord: "Hambalkový s přímým pasem",
			Type_ContinuousOrSimpleBeam: "Spojitý nebo prostý nosník",
			Type_ContinuousOrSimpleRafter: "Spojitá nebo prostá krokev",
			Type_FrameStructure: "Rámová konstrukce",
			Kind_Truss: "Nosný vazník",
			Kind_NonStructuralTruss: "Nenosný vazník",
			Kind_Infill: "Nosný dílec",
			Kind_NonStructuralInfill: "Konstrukční dílec",
			Kind_GableLadder: "Štítová výměna",
			Timber_Volume: "Čistý objem dřeva",
			Members_Quantity: "Počet dřevěných prvků",
			Cuts_Quantity: "Počet řezů",
			Outer_Volume: "Vnější objem",
			Inner_Volume: "Vnitřní objem",
			BC_Length: "BC Length",
			STC_Length: "STC Length",
			HTC_Length: "HTC Length",
			Truss_Length: "Délka",
			Truss_Height: "Šířka",
			Truss_Weight: "Váha",
			Truss_Quantity: "Počet vazníků",
			Plies: "Počet vrstev",
			Parts: "Počet částí",
			Thickness: "Tloušťka",
			Truss_Type: "Typ vazníku",
			Truss_Kind: "Účel vazníku",
			Centres: "Osová vzdálenost",
			Joints_Quantity: "Počet styčníků",
			Splices: "Splices",
			Plates_Quantity: "Počet desek",
			Plates_Price: "Cena desek",
			Plates_Weight: "Váha desek",
			Plates_Area: "Plocha desek",
			Supports: "Počet podpor",
			// Jobs
			Pitch: "Převládající sklon",
			Covered_Area: "Plocha půdorysu",
			Roof_Area: "Plocha střešní krytiny",
			Floor_Area: "Plocha podlahy",
			Wallplate_Length: "Délka pozednice",
			Fascia_Length: "Délka okapu",
			Ridge_Duo: "Ridge Duo",
			Ridge_Mono: "Ridge Mono",
			Hip_Length: "Délka nároží",
			Valley_Length: "Délka úžlabí",
			Left_Gable: "Levý štít",
			Right_Gable: "Pravý štít",
			Convex_Transition: "Convex Transition",
			Concave_Transition: "Concave Transition",
			Roofing_Load: "Krytina",
			Ceiling_Load: "Podhled",
			Snow_Region: "Sněhová oblast",
			Snow_Load: "Sníh",
			Wind_Region: "Větrná oblast",
			Wind_Load: "Vítr",
		},
		description: {
			// Math
			If_Then: "Použití: if(PODMÍNKA, JE PRAVDA, NENÍ PRAVDA)",
			Multiple_if_then:
				"Použití: iff(PODMÍNKA1, PODMÍNKA1 JE PRAVDA, PODMÍNKA2, PODMÍNKA2 JE PRAVDA, ...)",
			Exponential: "Použití: exp(ČÍSLO)",
			Square_root: "Použití: sqrt(ČÍSLO)",
			Absolute: "Použití: abs(ČÍSLO)",
			Logarithm: "Použití: log(ČÍSLO, ZÁKLAD)",
			Round: "Použití: round(ČÍSLO, POČET DESETINNÝCH MÍST)",
			Min: "Použití: min(ČÍSLO)",
			Max: "Použití: max(ČÍSLO)",
			Summation: "Použití: add(ČÍSLO1, ČÍSLO2...)",
			Multiplication: "Použití: multi(ČÍSLO1, ČÍSLO2...)",
			Mean_average: "Použití: mean(ČÍSLO1, ČÍSLO2...)",
			Sample_variance: "Použití: var(ČÍSLO1, ČÍSLO2...)",
			Standard_deviation: "Použití: std(ČÍSLO1, ČÍSLO2...)",
			Pi: "Pi",
			Eulers_number: "Eulerovo číslo",
			Equality: "=",
			Inequality: "!=",
			Lower_than: "<",
			Lower_or_equal: "<=",
			// Trusses
			Type_NotRecognized: "Nerozpoznaný",
			Type_DuoPitched: "Základní trojúhelníkový",
			Type_MonoPitched: "Jednostranný trojúhelníkový",
			Type_Flat: "Přímopásový",
			Type_ArcShapedBasic: "Obloukový základní",
			Type_ArcShapedWithStraightChord: "Obloukový s přímým pasem",
			Type_AtticBasic: "Základní hambalkový",
			Type_AtticWithStraightChord: "Hambalkový s přímým pasem",
			Type_ContinuousOrSimpleBeam: "Spojitý nebo prostý nosník",
			Type_ContinuousOrSimpleRafter: "Spojitá nebo prostá krokev",
			Type_FrameStructure: "Rámová konstrukce",
			Kind_Truss: "Nosný vazník",
			Kind_NonStructuralTruss: "Nenosný vazník",
			Kind_Infill: "Nosný dílec",
			Kind_NonStructuralInfill: "Konstrukční dílec",
			Kind_GableLadder: "Štítová výměna",
			Timber_Volume: "Čistý objem dřeva",
			Members_Quantity: "Počet dřevěných prvků",
			Cuts_Quantity: "Počet řezů",
			Outer_Volume: "Vnější objem",
			Inner_Volume: "Vnitřní objem",
			BC_Length: "BC Length",
			STC_Length: "STC Length",
			HTC_Length: "HTC Length",
			Truss_Length: "Délka vazníku",
			Truss_Height: "Šířka vazníku",
			Truss_Weight: "Váha vazníku",
			Truss_Quantity: "Počet vazníků daného typu",
			Plies: "Počet vrstev vazníku",
			Parts: "Počet částí děleného vazníku (1 pro nedělený)",
			Thickness: "Tloušťka vazníku",
			Truss_Type: "Typ vazníku (lze porovnávat s proměnnými v sekci Typy)",
			Truss_Kind: "Účel vazníku (lze porovnávat s proměnnými v sekci Účel)",
			Centres: "Osová vzdálenost vazníků",
			Joints_Quantity: "Počet styčníků",
			Splices: "Splices",
			Plates_Quantity: "Počet desek ve vazníku",
			Plates_Price: "Cena desek (vypočtena na základě ceníku v Truss3D)",
			Plates_Weight: "Váha styčníkových desek",
			Plates_Area: "Plocha styčníkových desek",
			Supports: "Počet podpor",
			// Jobs
			Pitch: "Převládající sklon střechy",
			Covered_Area: "Plocha půdorysu",
			Roof_Area: "Plocha střešní krytiny",
			Floor_Area: "Plocha podlahy",
			Wallplate_Length: "Délka pozednice",
			Fascia_Length: "Délka okapu",
			Ridge_Duo: "Ridge Duo",
			Ridge_Mono: "Ridge Mono",
			Hip_Length: "Délka nároží",
			Valley_Length: "Valley Length",
			Left_Gable: "Left Gable",
			Right_Gable: "Right Gable",
			Convex_Transition: "Convex Transition",
			Concave_Transition: "Concave Transition",
			Roofing_Load: "Zatížení krytiny",
			Ceiling_Load: "Zatížení podhledu",
			Snow_Region: "Sněhová oblast",
			Snow_Load: "Sníh",
			Wind_Region: "Větrná oblast",
			Wind_Load: "Vítr",
		},
		section: {
			Math: "Matematické operace",
			Load: "Zatížení střechy",
			RoofInfo: "Vlastnosti střechy",
			Topology: "Topologie",
			Joints: "Styčníky",
			Timber: "Řezivo",
			Kinds: "Účel",
			Types: "Typy",
			ImportedTruss: "Proměnné z vazníků",
			ImportedJob: "Proměnné z úloh",
		},
	},
	remove: {
		project: 'Opravdu chcete odebrat projekt "{{name}}" ?',
		job: 'Opravdu chcete odebrat úlohu "{{name}}" ?',
		customer: 'Opravdu chcete odebrat zákazníka "{{name}}" ?',
		template: 'Opravdu chcete odebrat šablonu "{{name}}" ?',
		section: 'Opravdu chcete odebrat sekci "{{name}}" ?',
		variable: 'Opravdu chcete odebrat proměnou "{{name}}" ?',
		account: 'Opravdu chcete odebrat účet "{{name}}" ?',
		priceList: 'Opravdu chcete odebrat ceník "{{name}}" ?',
		priceListItem: 'Opravdu chcete odebrat položku "{{name}}" ?',
		file: 'Opravdu chcete odebrat soubor "{{name}}" ?',
		model: "Opravdu chcete odebrat 3d model ?",
		contactPerson: 'Opravdu chcete odebrat kontaktni osobu "{{name}}" ?',
		customerHasProject:
			'Zákazník "{{name}}" je přiřazen projektu. Nelze odstranit.',
	},
	priceLists: {
		default: "Defaultní",
		addItem: "Přidat položku",
		removeItem: "Odebrat položku",
		itemName: "Název položky",
		quantity: "Počet v jednotce",
		pricePerUnit: "Cena za kus",
		action: "Operace",
		menuTitle: "Ceníky",
		priceList: "Ceník",
		plates: "Desky",
		custom: "Seznam ceníků",
		duplicatePriceList: "Duplikovat ceník",
		duplicatePriceListTitle: "Duplikovat ceník {{title}}",
		editPriceList: "Přejmenovat ceník",
		editPriceListTitle: "Přejmenovat ceník {{title}}",
		removePriceList: "Odebrat ceník",
		removePriceListTitle: "Odebrat ceník {{title}}",
		confirmRemoval: "Opravdu chcete smazat ceník?",
		addPriceList: "Přidat ceník",
		name: "Název",
		width: "Šířka",
		length: "Délka",
		thickness: "Tloušťka",
		price: "Cena",
	},
	viewer: {
		title: "3D Model Viewer",
		upload: "Nahrát 3D model",
		dateOfCreation: "Datum nahrání",
		uploadedBy: "Nahráno",
		url: "URL 3d modelu",
		link: "odkaz",
	},
	organization: {
		title: "Organizace",
	},
	contextMenu: {
		openProject: "Přejít na projekt",
		newTruss2DJob: "Nová Truss2D úloha",
		newTruss3DJob: "Nová Truss3D úloha",
		deleteProject: "Odebrat projekt",
		openJob: "Přejít na úlohu",
		unlockJob: "Odemknout úlohu",
		openJobInTruss: "Přejít na úlohu v Truss3D",
		deleteJob: "Odebrat úlohu",
		openTruss: "Přejít na vazník",
		showCustomer: "Zobrazit zákazníka",
		addToSelection: "Skrýt ostatní",
		removeFromSelection: "Skrýt vybrané",
		copyJob: "Kopírovat úlohu",
		pasteJob: "Vložit zkopírovanou úlohu",
	},
	truss: {
		openFailed: "Úholu nebylo možné spustit.",
		opening: "Úloha se spouští.",
		downloadingTrussFile: "Úloha se právě stahuje.",
		trussFileNotExist:
			"Cesta k programu Truss3D nevede na spustitelný soubor. Nastavte cestu v sekci nastavení.",
		exeFailedToOpen: "Otevírání Truss3D selhalo.",
	},
	carousel: {
		title1: "Model Viewer",
		text1:
			"Zobrazení .3ds a .dxf ve webovém prohlížeči. Kótování, výběry, pokročilá práce s kamerou a mnohé další.",
		title3: "Software Truss 4",
		text3:
			"Styčníkové desky s prolisovanými trny a široký sortiment spojovacích a kotevních prvků pro dřevěné tesařské konstrukce.",
		title4: "Novinky v TRUSS4 verze 16",
		text4:
			"Aktivní pracovní plocha s místními nabídkami. Nové grafické výběry. Trasování objektů při zadávání.",
		link3: "https://www.fine.cz/stresni-konstrukce/",
		linkText3: "Odkaz",
		title2: "Novinky v aktuální verzi",
		text2:
			"Tvorba cenových kalkulací a generování dokumentace. Sdílení 3D modelů. Práce s více úlohami naráz. Vylepšené možnosti práce více uživatelů zároveň.",
		link4: "https://www.fine.cz/data/files/Truss_v16_CS.pdf",
		linkText4: "Odkaz",
	},

	templates: {
		totalPrice: "Celková cena",
		exportedUnit: "Jednotka",
		unitPrice: "Jednotková cena",
		sectionSum: "Součet sekce",
		uploadQuotationTemplate: "Importovat šablonu",
		downloadQuotationTemplate: "Export šablony",
		uploadQuotationTemplateTitle: "Importovat šablonu {{title}}",
		downloadQuotationTemplateTitle: "Export šablony {{title}}",
		defaultTemplate: "Defaultní",
		duplicateTemplate: "Duplikovat šablonu",
		duplicateTemplateTitle: "Duplikovat šablonu {{title}}",
		editTemplate: "Přejmenovat šablonu",
		editTemplateTitle: "Přejmenovat šablonu {{title}}",
		removeTemplate: "Odebrat šablonu",
		removeTemplateTitle: "Odebrat šablonu {{title}}",
		confirmRemoval: "Opravdu chcete smazat šablonu?",
		addTemplate: "Přidat šablonu",
		addDefaultTemplate: "Přidat defaultní šablonu",
		generateNewQuotation: "Přepočítat",
		generateNewQuotationFromNewData: "Vytvořit novou cenovou nabídku",
		warningQuotation: "Celá cenová nabídka bude přepočítána.",
		expressionValid: "Vzorec je validní",
		expressionInvalid: "Vzorec není validní",
		priceValid: "Cena je validní",
		priceInvalid: "Cena není validní",
		template: "Kalkulace:",
		templates: "Kalkulace",
		project: "Projekty",
		job: "Úlohy",
		truss: "Vazníky",
		default: "Výchozí",
		configutarions: "Šablona:",
		addVariable: "Přidat proměnnou",
		addSection: "Přidat sekci",
		customSection: "Vlastní sekce",
		defaultVariable: "Výchozí proměnná",
		customVariable: "Vlastní proměnná",
		Project: "Projekty",
		Job: "Úlohy",
		Truss: "Vazníky",
		renameSection: "Přejmenovat sekci",
		removeSection: "Odebrat sekci",
		saveTitle: "Uložit název",
		cancelEdit: "Zrušit změnu",
		saveVariable: "Uložit proměnnou",
		deleteVariable: "Odebrat proměnnou",
		renameVariable: "Přejmenovat proměnnou",
		variables: "Proměnné",
		cleanCut: "Řezivo čisté",
		roughCut: "Řezivo hrubé",
		joints: "Styčníky",
		desks: "Desky",
		dragAndDrop: "Přetáhněte proměnnou do vstupu pro rovnice.",
		quantity: "Množství",
		unit: "Jednotky",
		expression: "Vzorec",
		description: "Popis",
		pricePerUnit: "Cena za jednotku",
		price: "Cena",
		priceList: "Ceník",
	},

	validation: {
		min: "Pole musí obsahovat minimálně {{count}} znaků.",
		max: "Pole může obsahovat maximálně {{count}} znaků.",
		required: "Povinné pole.",
		companyOrSurnameRequired: "Zadejte název firmy nebo příjmení.",
		email: "Zadejte platný e-mail",
		phone: "Zadejte platné telefonní číclo",
		passwordMatch: "Zadaná hesla se neshodují",
	},
	common: {
		downloadingJob: "Úloha se právě stahuje.",
		jobDownloaded: "Úloha byla úspěšně stažena.",
		copyingJob: "Úloha se právě kopíruje.",
		jobCopied: "Úloha byla úspěšně zkopírována.",
		CustomerExists: "Zákazník již existuje.",
		statistics: "Statistika",
		designPrice: "Cena dle návrhu",
		FileTooLarge: "Velikost souboru přesahuje 100 MB",
		passwordResetSuccessful:
			"Požadavek na reset hesla byl úspěšný. Na Vaši e-mailovou adresu Vám během chvíle dorazí odkaz pro reset hesla.",
		productionsCount: "Počet výrob",
		sumOfProjects: "Hodnota projektů",
		notAdmin:
			"Pouze administrátor organizace může editovat údaje o organizaci.",
		periodFromDate: "Období od data",
		periodToDate: "Období do data",
		period: "Období",
		pricePerSquareMeter: "Cena za m2",
		jobList: "Seznam úloh",
		trussList: "Seznam vazníků",
		active: "Aktivní filtry {{active}} z {{size}}",
		CannotDeleteDefaultPriceListItem: "Není možné smazat defaultní položku.",
		CannotDeleteDefaultTemplate: "Není možné smazat defaultní šablonu.",
		PriceNotSet: "Dosud nespočítán",
		PriceIsNaN: "Chyba výpočtu",
		trussKind: "Druh",
		project: "Projekt",
		priceWithoutTrusses: "Cena bez vazníků",
		priceForTrusses: "Cena za vazníky",
		ares: "Načíst z ARES",
		FailedToCreateDirectory: "Adresář se nepovedlo vytvořit.",
		FailedToMoveDirectory: "Adresář nebylo možné přesunout.",
		CannotDeleteAdmin: "Není možné smazat Admin účet",
		NotDeleted: "Nebylo možné smazat.",
		S3UploadFailed: "Nahrání souboru selhalo.",
		IsNotOrganizationAdmin:
			"Akci se nepovedlo provést. Nemáte administrátorské opravnění.",
		CloudOnly: "Pouze pro cloud verzi.",
		NeedToSetEmail: "E-mail je povinný.",
		NewPasswordSameAsOld: "Nové heslo musí být oslišné od původního hesla.",
		TargetJobLocked: "Úloha uzamčena.",
		InvalidQuotationType: "Nevalidní typ cennové nabídky",
		MissingSurnameAndCompany: "Název firmy nebo příjmení je povinnné.",
		TitleAlreadyExists: "Název již existuje.",
		SomeExpressionNotValid: "Některé výrazy nejsou validní.",
		CannotContainVariableKeyword: "Nesmí obsahovat slovo variable.",
		CannotContainSectionKeyword: "Nesmí obsahovat slovo section.",
		CannotContainValueCharacter: "Nesmí obsahovat následující znaky: (,),$",
		NoFinishedQuotationExists:
			"Alespoň jedna úloha musí mít dokončenou cenovou nabídku.",
		JobNameTaken: "Projekt úlohu s tímto jménem již obsahuje",
		CannotDeleteCustomerInUse:
			"Nelze odstranit zákazníka s přiřazenými projekty",
		FailedToCreateFile: "Soubor se nepovedlo vytvořit.",
		PreviousSectionMissing: "Předešlá sekce chybí.",
		AtLeastOneSectionRequired: "Zadejte alespoň jednu sekci.",
		ModelAlreadyExists: "Model již existuje.",
		ModelNotExists: "Model neexistuje.",
		ModelUploadFailed: "3D model se nepovedlo nahrát.",
		viewer: "3D Viewer",
		fileStore: "Nastavení adresářů",
		projectLocationChange: "Adresa byla změněna.",
		unlock: "Odemknout úlohu",
		createJobFromTrussFile: "Importovat úlohu pomocí Truss souboru",
		lock: "Úloha uzamčená uživatelem {{lock}}",
		lockedByMe: "Vámi uzamknutá úloha",
		saveProjectAndOpenTruss3D: "Vytvořit projekt a spustit Truss3D",
		saveProjectAndOpenTruss2D: "Vytvořit projekt a spustit Truss2",
		closeWithoutSavingTitle: "Opravdu chcete opustit stránku bez uložení?",
		closeWithoutSavingMessage:
			"Na stránce jsou neuložené změny. Pro uložení změn zůstaňte na stránce a uložte změny.",
		actionWithoutSavingTitle: "Máte neuložené změny.",
		actionWithoutSavingMessage:
			"Před provedením akce uložte Vaše změny tlačítkem uložit.",
		confirmMessage: "Jste si jisti, že chcete smazat tuto položku?",
		leave: "Zrušit a odejít",
		saveChanges: "Uložit",
		stay: "Zůstat na stránce",
		yes: "Ano",
		no: "Ne",
		changePassword: "Změna hesla",
		oldPassword: "Staré heslo",
		newPassword: "Nové heslo",
		verifyPassword: "Znovu nové heslo",
		passwordMatch: "Hesla se musí shodovat",
		changeRootPath: "Změnit uložiště souborů",
		changeTruss3DPath: "Změnit cestu k Truss3D",
		changeTruss2DPath: "Změnit cestu k Truss2D",
		jobType: "Typ úlohy",
		projectState: "Stav projektu",
		jobState: "Stav úlohy",
		editNaturalPerson: "Editace fyzické osoby",
		editEvidencePerson: "Editace evidence",
		unavailable: "Nedostupné",
		JobUpdateFromTruss: "Aktualizoval úlohu z Truss3D",
		UploadModelJob: "Přidal 3d model",
		itemsToShow: "Položek k zobrazení",
		showingRecors: " Zobrazuji záznamy",
		page: "Stránka",
		to: "až",
		of: "z",
		kinds: "Účel",
		Truss: "Nosný",
		NonStructuralTruss: "Nenosný",
		Infill: "Nosný dílec",
		NonStructuralInfill: "Konstrukční dílec",
		GableLadder: "Štítová výměna",
		NotRecognized: "Nerozpoznaný",
		DuoPitched: "Základní trojúhelníkový",
		MonoPitched: "Jednostranný trojúhelníkový",
		Flat: "Přímopásový",
		ArcShapedBasic: "Obloukový základní",
		ArcShapedWithStraightChord: "Obloukový s přímým pásem",
		AtticBasic: "Základní hambalkový",
		AtticWithStraightChord: "Hambalkový s přímým pásem",
		ContinuousOrSimpleBeam: "Spojitý nebo prostý nosník",
		ContinuousOrSimpleRafter: "Spojitá nebo prostá krokev",
		FrameStructure: "Rámová konstrukce",
		checkboxSectionGeneral: "Obecné",
		checkboxSectionDate: "Datumy",
		checkboxSectionStatistics: "Statistika",
		checkboxSectionCalculation: "Kalkulace",
		checkboxSectionDimensions: "Rozměry",
		checkboxSectionLoad: "Zatížení",
		checkboxSectionWeight: "Hmotnost",
		checkboxSectionConstruction: "Stavba",
		checkboxSectionTechnicalParameters: "Technická specifikace",
		activeFilter: "Filtry jsou aktivní",
		activeSelection: "Skryté prvky:",
		cancelFilter: "Zrušit filtry",
		cancelSelection: "Zrušit výběry",
		ArchivedAndRealized: "Realizován",
		ArchivedAndAborted: "Nerealizován",
		NewlyCreated: "Nový",
		QuotationInProgress: "Rozpracovaná cenová nabídka",
		QuotationFinished: "Cenová nabídka dokončena",
		ConstructionFinished: "Konstrukce dodána",
		ProductionInProgress: "Rozpracovaná výroba",
		ProductionFinished: "Dokončená výroba",
		Finished: "Dokončená",
		InProgress: "Rozpracovaná",
		Aborted: "Zrušená",
		Quotation: "Cena nabízená",
		Construction: "Výroba",
		NotCalculated: "Neposouzeno",
		Succeeded: "Vyhovuje",
		Failed: "Nevyhovuje",
		closeAndSync: "Zavřít a aktualizovat",
		DuplicateEntity: "Nelze vytvořit - daný objekt se v databázi již nachází",
		UsernameExists: "Uživatelské jméno obsazeno",
		InvalidSelection: "Neplatný výběr.",
		InvalidJson: "Nelze přečíst úlohu - formát neodpovídá",
		EntityNotFound: "Objekt se nenachází v databázi (pravděpodobně byl smazán)",
		MissingName: "Název musí být vyplněn",
		MissingNameAndCrn: "Je třeba vyplnit jméno nebo IČ",
		BadCustomerType:
			"Typ zákazníka neodpovídá zákazníkovi v databázi (pravděpodobně byl změněn)",
		CrnAlreadyExists: "Zadané IČ se v databázi již nachází",
		MissingSurname: "Je třeba vyplnit příjimení",
		CrnNotFound: "Zadané IČ nenalezeno",
		LocalOnlyOperation: "Operace povolena pouze v lokálním režimu",
		EmptyOrWhitespaceQuery: "Hledání nesmí být prázdné",
		InvalidTreeOption: "Typ stromu neexistuje",
		FileNameExists: "Soubor s tímto jménem již existuje",
		ErrorWhileSavingFile: "Soubor se nepodařilo uložit",
		FailedToReadFile: "Zadaný soubor se nepodařilo přečíst",
		FileNotExists: "Zadaný soubor neexistuje (pravděpodobně byl smazán)",
		DirectoryContainsMoreThanOneFile:
			"V daném adresáři se nachází více než jeden soubor. Aby bylo možné pokračovat, je třeba ponechat v adresáři pouze požadovaný Truss soubor a ostatní přesunout jinam.",
		UserUpdateFailed: "Nepodařilo se aktualizovat uživatele",
		MissingTrussFile: "Truss soubor nenalezen. Pravděpodobně byl ručně smazán.",
		OnlyOneFileRequired: "K úloze smí být nahrán pouze jeden Truss soubor",
		FailedToLoadFilter: "Nepodařilo se načíst filtr",
		FilterNameTaken: "Filtr se zadaným jménem již existuje",
		NoTreeToReset: "Reset stromu se nezdařil (žádný filtr není používán)",
		NameAlreadyExists: "Název již existuje",
		InvalidOrMissingRole: "Chybějící role.",
		CannotCreateUser: "Nebylo možné vytvořit uživatele.",
		ConcurrencyFailure: "Objekt je právě upravován jiným uživatelem.",
		PasswordMismatch: "Hesla se neshodují.",
		Unauthorized: "Chybně zadané heslo nebo uživatelské jméno",
		InvalidToken: "Nevalidní token.",
		LoginAlreadyAssociated: "Zadaný uživatel je již přihlášen.",
		InvalidUserName: "Vaše uživatelské jméno není ve validním formátu.",
		InvalidEmail: "Váš e-mail není va validním formátu.",
		EmailExists: "Zadaný e-mail již existuje.",
		InvalidRoleName: "Chybný název role.",
		IsTemporaryWithoutTrussData: "Úloha neobsahuje Truss soubor.",
		RoleNameExists: "Tato role již existuje.",
		PasswordAlreadySet: "Heslo bylo již zadáno.",
		UserLockoutNotEnabled: "Nelze zamknout uživatele.",
		UserAlreadyInRole: "Role je uživateli již přiřazena.",
		UserNotInRole: "Uživatel nemá zadanou roli.",
		PasswordTooShort: "Heslo je příliš krátké.",
		PasswordRequiresNonAlphanumeric: "Heslo nesmí obsahovat číselné znaky.",
		PasswordRequiresDigit: "Heslo vyžaduje alespoň jeden číselný znak.",
		PasswordRequiresLower: "Heslo vyžaduje alespoň jedno malé písmeno.",
		PasswordRequiresUpper: "Heslo vyžaduje alespoň jedno velké písmeno",
		finishedQuotationCount: "Počet dokončených cenových nabídek",
		finishedProductionCount: "Počet dokončených výrob",
		treeTooltipTrussNotCalculated: "Nespočítán",
		treeTooltipTrussFailed: "Nevyhověl",
		treeTooltipTrussSucceeded: "Vyhověl",
		treeTooltipJobQuotationFinished: "Dokončená CN",
		treeTooltipJobQuotationInProgress: "Rozpracovaná CN",
		treeTooltipJobQuotationAborted: "Zrušená CN",
		treeTooltipJobConstructionFinished: "Dokončená výroba",
		treeTooltipJobConstructionInProgress: "Rozpracovaná výroba",
		treeTooltipJobConstructionAborted: "Zrušená výroba",
		treeTooltipJobTRUSS_3D: "Truss3D",
		treeTooltipJobTRUSS_2D: "Truss2D",
		treeTooltipProjectArchivedAndRealized: "Realizován",
		treeTooltipProjectArchivedAndAborted: "Nerealizován",
		treeTooltipProjectNewlyCreated: "Nově vytvořen",
		treeTooltipProjectQuotationInProgress: "Rozpracovaná CN",
		treeTooltipProjectQuotationFinished: "Dokončená CN",
		treeTooltipProjectProductionInProgress: "Rozpracovaná výroba",
		treeTooltipProjectProductionFinished: "Dokončená výroba",
		treeTooltipCustomerInEvidence: "Evidence",
		treeTooltipCustomerCompany: "Právnická osoba",
		treeTooltipCustomerPerson: "Fyzická osoba",
		generalInformation: "Obecné",
		descriptionEmptyValueSetTo: "Popis nastaven na",
		constructionDateEmptyValueSetTo: "Datum dodání konstrukce nastaveno na",
		quotationDateEmptyValueSetTo: "Datum podání cenové nabídky nastaveno na",
		JobDuplicate: "Provedl duplikaci úlohy",
		FileDelete: "Odstranil soubor",
		today: "Dnes",
		yesterday: "Včera",
		thisWeek: "Tento týden",
		lastWeek: "Minulý týden",
		daysUpToToday: "Dny do dneška",
		daysStartingToday: "Dny ode dneška",
		CreateProject: "Přidal projekt",
		CreateJob: "Vytvořil úlohu",
		JobUpdate: "Aktualizoval úlohu",
		AssignProjectToUser: "Přiřadil projekt uživateli",
		FileSavedUnderProject: "Přiřadil soubor",
		AssignProjectToCustomer: "Přiřadil projekt zákazníkovi",
		ProjectUpdate: "Upravil následující vlastnosti projektu: ",
		JobDelete: "Odstranil úlohu",
		accepted: "Přijat",
		accounts: "Uživatelé",
		accountsList: "Seznam uživatelů",
		actions: "Akce",
		add: "Přidat",
		addAccount: "Přidat uživatele",
		createAccount: "Vytvořit uživatele",
		addTemplate: "Přidat šablonu",
		address: "Adresa",
		admin: "Admin",
		administrator: "Administrátor",
		adressModalAdd: "Přidat adresu",
		adressModalDescription: "Zadejte adresu projektu",
		all: "Všechny",
		altitude: "Nadmořská výška",
		appearance: "Vzhled",
		assign: "Nový zákazník",
		assignee: "Vyřizuje",
		attachedFiles: "Sem přetáhněte soubory, které chcete uložit.",
		averagePricePerProjectFilter: "Průměrná cena za projekt",
		back: "Zpět",
		blanks: "Přířezy",
		boxPrice: "Cena krabice",
		cancel: "Zrušit",
		canceled: "Zrušená",
		ceilingArea: "Zastavěná plocha",
		totalCeilingArea: "Celková zastavěná plocha",
		averageCeilingArea: "Průměrná zastavěná plocha",
		ceilingLoad: "Podhled",
		averageCeilingLoad: "Průměrný podhled",
		ceilingName: "Zateplení",
		centres: "Rozteč vazníků",
		averageCentres: "Průměrná osová vzdálenost vazníků",
		changeLanguage: "Jazyk",
		cityName: "Město",
		close: "Zavřít",
		cloud: "Cloudové prostředí",
		collapse: "Sbalit strom",
		columnSelection: "Výběr sloupců",
		Company: "Právnická osoba",
		companyName: "Firma",
		complexity: "Složitost",
		composition: "Skladba",
		constructionDate: "Termín dodání konstrukce",
		contactPerson: "Kontaktní osoba",
		contactPersonEdit: "Editace kontaktní osoby",
		controlData: "Kontrolní údaje",
		controlInformation: "Kontrolní údaje",
		copy: "Kopírovat do",
		clipboard: "Kopírovat URL",
		copyTo: "Kopírovat do ...",
		count: "Počet",
		countSum: "Počet celkem",
		countPerTruss: "Počet v jednom vazníku",
		totalCount: "Celkový počet",
		counted: "Spočítán",
		country: "Země",
		coveredArea: "Plocha půdorysu",
		covering: "Krytina",
		create: "Vytvořit projekt",
		createContactPerson: "Přidat kontaktní osobu",
		createDate: "Datum vytvoření",
		createFromTruss: "Zodpovědný uživatel",
		createFromTrussFolder: "Vytvořit z Truss souboru",
		createInEvidence: "Vytvořit do evidence",
		editEvidence: "Editace evidence",
		createJobInTruss3D: "Vytvořit novou úlohu v Truss3D",
		createJobInTruss2D: "Vytvořit novou úlohu v Truss2D",
		createCustomer: "Vytvořit zákazníka",
		newCustomer: "Nový zákazník",
		editLegalPerson: "Editace právnická osoby",
		createNaturalPerson: "Nová fyzická osoba",
		createNewFromEvidence: "Vytvořit z evidence",
		createNewJob: "Vytvořit",
		createNewLegal: "Vytvořit novou právnickou osobu",
		createNewNatural: "Vytvořit novou fyzickou osobu",
		credit: "Kreditní",
		crn: "IČ",
		currency: "Měna",
		custom: "Vlastní",
		customer: "Zákazník",
		customerPlaceholder: "IČ, Název, Jméno ... ",
		customerModalAdd: "Přidat zákazníka do projektu",
		customerModalDescription: "Přidat",
		customers: "Zákazníci",
		customersList: "Seznam zákazníků",
		customerDateOfCreationFilter: "Datum založení zákazníka",
		czech: "Čeština",
		date: "Datum",
		dateAcceptance: "Datum přijetí",
		dateFilterPlaceholder: "Nastavit časové období",
		dateFromBuyLabel: "Datum vytvoření od",
		dateFromLabel: "Datum od",
		dateFromSellLabel: "Datum vypořádání od",
		dateOfCreation: "Datum vytvoření",
		jobDateOfCreation: "Datum založení úlohy",
		dateOfLastUpdate: "Datum poslední změny",
		jobDateOfLastUpdate: "Datum poslední změny úlohy",
		dateOfProcessing: "Datumy",
		dateToBuyLabel: "Datum vytvoření do",
		dateToLabel: "Datum do",
		dateToSellLabel: "Datum vypořádání do",
		deadline: "Datum realizace",
		debit: "Debetní",
		delete: "Odebrat",
		deleteTooltip: "Záznam bude po stisknutí tlačítka odebrán.",
		depth: "Hloubka",
		description: "Popis",
		deskSummary: "Sumář desek",
		details: "Detaily",
		dic: "DIČ",
		dimension: "Rozměr",
		discardChanges: "Zrušit změny",
		display: "Zobrazení stromu",
		document: "Dokumenty",
		documents: "Dokumenty",
		done: "Dokončená",
		download: "Stáhnout",
		duplicate: "Duplikovat úlohu",
		edit: "Editovat",
		editAccount: "Editovat účet",
		editJob: "Upravit úlohu",
		editTemplate: "Upravit šablonu",
		email: "E-mail",
		emailUsername: "E-mail (přihlašovací jméno)",
		emptyCustomer: "Zákazník beze jména",
		emptyFilter: "Filtr nedostupný z důvodu nedostatku dat",
		english: "Angličtina",
		error: "Chyba při počítání",
		errorMessage: "Váš požadavek nebylo možné zpracovat.",
		errorMessage503: "Server není dostupný. Právě probíhá práce na serverech.",
		errorMessageProject: "Projekt nebylo možné vytvořit.",
		Evidence: "Evidence",
		evidencePerson: "Evidence",
		excelExport: "Excel export",
		export: "Export",
		extension: "Přípona",
		fasciaLength: "Délka okapu",
		files: "Přílohy",
		filesText: "Sem přetáhněte soubory nebo klikněte na záložku",
		filterApply: "Filtrovat",
		filter: "Filtr",
		activeFiltr: "Aktivní filtr",
		filterDate: "Časové intervaly",
		filterGeneral: "Obecné",
		filterSubmit: "Filtrovat",
		filterTechnicalParametr: "Technická specifikace",
		filterTree: "Filtrovat strom",
		find: "Hledat",
		finished: "Hotov",
		floorArea: "Podlaha podkrovi",
		forename: "Jméno",
		fullName: "Celé jméno",
		general: "Shrnutí",
		geography: "Geografie",
		geometry: "Geometrie",
		german: "Němčina",
		greenLine: "Infolinka",
		height: "Výška",
		averageHeight: "Průměrná výška",
		help: "Nápověda",
		helpText: "Text napovědy",
		hide: "Skrýt",
		hideDetail: "Skrýt detaily",
		hipLength: "Délky nároží",
		houseNumbering: "ČP",
		changeExe: "Vybrat Truss",
		inProgress: "Rozpracovaná",
		informationAboutProject: "Informace o projektu",
		jobName: "Název úlohy",
		job: "Úloha",
		jobs: "Úlohy",
		last12Months: "Posledních 12 měsíců",
		lastChange: "Poslední úprava",
		lastEdit: "Datum poslední změny",
		lastMonth: "Minulý měsíc",
		lastYear: "Předchozí rok",
		legalPerson: "Právnická osoba",
		length: "Délka",
		liaison: "Styčník",
		link: "Přejít na úlohu",
		listOfProjects: "Seznam projektů",
		listOfTasks: "Seznam úkolů",
		load: "Zatížení",
		loadWidth: "Zatěžovací šířka",
		averageLoadWidth: "Průměrná zatěžovací šířka",
		loading: "Načítám",
		local: "Lokální prostředí",
		loginCloud: "Přihlášení do cloudového řešení",
		loginLocal: "Přihlášení do lokálního prostředí",
		logout: "Odhlásit se",
		log: "Log",
		lostPassword: "Zapomenuté heslo",
		lumber: "Přířez",
		main: "Hlavní strana",
		material: "Materiály",
		max: "Pole může obsahovat maximálně {{count}} znaků.",
		members: "Prvky",
		membersCount: "Počet dílců",
		min: "Pole musí obsahovat minimálně {{count}} znaků.",
		modalAccountDescription: "Pro potvrzení akce stiskněte tlačítko Ano.",
		modalAccountTitle: "Opravdu chcete tento účet smazat?",
		modalCustomerDescription: "Pro potvrzení akce stiskněte tlačítko Ano.",
		modalCustomerTitle: "Opravdu chcete tohoto zákazníka smazat?",
		modalEditJobTitle: "Editovat úlohu",
		editInTruss3D: "Editovat v Truss3D",
		editInTruss2D: "Editovat v Truss2D",
		modalEditJobDescription:
			"Vyberte spustitelný Truss a otevřete úlohu k editaci. Po skončení práce v Truss toto okno zavřete.",
		modalFileDescription: "Pro potvrzení akce stiskněte tlačítko Ano.",
		modalFileTitle: "Opravdu chcete tento soubor smazat?",
		modalJobDescription: "Pro potvrzení akce stiskněte tlačítko Ano.",
		modalJobTitle: "Opravdu chcete tuto úlohu smazat?",
		modalNewJobDescription:
			"Pojmenujte Vaši novou úlohu a otevřete v Trussu. Po skončení práce v Truss toto okno zavřete.",
		modalNewJobTitle: "Vytvoření nové úlohy.",
		modalProjectDescription: "Pro potvrzení akce stiskněte tlačítko Ano.",
		modalProjectTitle: "Opravdu chcete tento projekt smazat?",
		modalConfirm: "Ano",
		modelCount: "Počet modelů",
		models: "Modely",
		multiplicity: "Násobnost",
		averageMultiplicity: "Průměrná násobnost",
		nailPlates: "Styčníkové desky",
		name: "Název",
		naturalPerson: "Fyzická osoba",
		newAccount: "Přidat účet",
		editCustomer: "Editace zákazníka",
		newProject: "Nový projekt",
		next: "Další",
		notCounted: "Nespočítán",
		notes: "Poznámka",
		numberInBox: "Počet v krabici",
		numberOfLayers: "Počet vrstev",
		numberOfModels: "Počet modelů",
		totalNumberOfModels: "Celkový počet dílců",
		numberOfPart: "Počet dílců/styčníků",
		totalNumberOfPart: "Celkový počet dílců/styčníků",
		numberOfProductionsFilter: "Počet realizovaných projektů",
		numberOfProjectsFilter: "Počet projektů",
		numberOfSupports: "Počet podpor",
		totalNumberOfSupports: "Celkový počet podpor",
		averageNumberOfSupports: "Průměrný počet podpor",
		numberOfQuotationsFilter: "Počet cenových nabídek",
		observer: "Pozorovatel",
		open: "Otevřít",
		output: "Výroba",
		owned: "Vlastní",
		partOfTheTruss: "Část vazníku",
		parts: "Části",
		password: "Heslo",
		passwordRecovery: "Zapomněli jste heslo?",
		Person: "Fyzická osoba",
		person: "Vyřizující osoba",
		phase: "Fáze",
		phone: "Telefon",
		pitch: "Převládající sklon",
		averagePitch: "Průměrný převládající sklon",
		place: "Místo",
		placeNumber: "ČP",
		planks: "Skladové délky",
		planksOnArea: "Objem dřeva na zastřešenou plochu",
		planksVolume: "Objem dřeva",
		totalPlanksVolume: "Celkový objem dřeva",
		averagePlanksVolume: "Průměrný objem dřeva",
		planner: "Projektant",
		plates: "Desky",
		platesCount: "Počet desek",
		totalPlatesCount: "Celkový počet desek",
		PlateWeightOnArea: "Hmotnost desek na plochu půdorysu",
		averagePlateWeightOnArea: "Průměrná hmotnost desek na plochu půdorysu",
		PlatesWeighOnPlanksVolume: "Hmotnost desek na objem dřeva",
		averagePlatesWeighOnPlanksVolume: "Průměrná hmotnost desek na objem dřeva",
		platesWeight: "Hmotnost styčníkových desek",
		totalPlatesWeight: "Celková hmotnost desek",
		averagePlatesWeight: "Průměrná hmotnost desek",
		ply: "Vrstva",
		plyCount: "Počet vrstev",
		postcode: "PSČ",
		price: "Cena",
		PriceOnPlanks: "Cena vazníku na objem dřeva",
		PriceOnArea: "Cena vazníku na plochu půdorysu",
		averagePriceOnArea: "Průměrná cena vazníku na plochu půdorysu",
		priceOffer: "Cenová nabídka",
		priceOnPlanks: "Cena vazníku na objem dřeva",
		averagePriceOnPlanks: "Průměrná cena vazníku na objem dřeva",
		pricePerPiece: "Cena ks",
		averagePricePerPiece: "Průměrná cena ks",
		process: "Průběh",
		production: "Cena výroby",
		productionsPerQuotationsFilter:
			"Poměr realizovaných a nerealizovaných projektů",
		products: "Produkty Fine",
		profile: "Profil",
		projectList: "Seznam projektů",
		projectName: "Název projektu",
		projectNumber: "Počet projektů",
		projects: "Projekty",
		quality: "Kvalita",
		quantity: "Množství",
		quotation: "Cena nabízená",
		quotationDate: "Termín podání cenové nabídky",
		region: "Kraj",
		regionName: "Region",
		registered: "Evidované osoby",
		registrationNumber: "Evidenční číslo",
		rejected: "Zamítnut",
		reload: "Znovu načíst",
		removeCustomerFilter: "Odstranit filtr zákazníků",
		removeProjectFilter: "Odstranit filtr projektů",
		removeJobFilter: "Odstranit filtr úloh",
		removeTrussFilter: "Odstranit filtr vazníků",
		removeSelection: "Odstranit výběr",
		required: "Povinné pole.",
		ridge: "Délka hřebenu",
		ridgeLength: "Délky úžlabí",
		rights: "Nastavení práv",
		roof: "Údaje o zastřešení",
		roofArea: "Plocha střešní krytiny",
		roofType: "Typ střechy",
		roofingArea: "Zastřešená plocha",
		totalRoofingArea: "Celková zastřešená plocha",
		averageRoofingArea: "Průměrná zastřešená plocha",
		roofingLoad: "Krytina",
		averageRoofingLoad: "Průměrná krytina",
		roofingName: "Název krytiny",
		roofName: "Střecha",
		save: "Uložit změny",
		search: "Hledat ...",
		selectAllJobs: "Vybrat všechny úlohy",
		selectAllProjects: "Vybrat všechny projekty",
		selectAllTrusses: "Vybrat všechny vazníky",
		sendNewPassword: "Zaslat nové heslo",
		settings: "Nastavení",
		show: "Zobrazit",
		showColumns: "Zobrazení sloupců",
		showDetail: "Detaily",
		showFilter: "Zobrazit filtry",
		filterTitle: "Filtrace",
		filterNotSet: "Žádné aktivní filtry",
		hideFilter: "Skrýt filtry",
		projectFilter: "Filtr projektů",
		jobFilter: "Filtr úloh",
		trussFilter: "Filtr vazníků",
		customerFilter: "Filtr zákazníků",
		size: "Rozměr",
		sizes: "Rozměry",
		snowArea: "Sněhová oblast",
		snowLoad: "Sníh",
		averageSnowLoad: "Průměrné zatížení sněhem",
		snowRegion: "Sněhová oblast",
		span: "Rozpon",
		standard: "Standard",
		state: "Stav",
		status: "Status",
		street: "Ulice",
		streetName: "Ulice",
		submit: "Přihlásit se",
		successMessage: "Všechna data byla úspěšně zpracována.",
		successMessageProject: "Projekt byl úspěšně vytvořen.",
		sumOfProjectPricesFilter: "Celková cena projektů",
		summary: "Shrnutí",
		surname: "Příjmení",
		suspendedCeiling: "Podhled",
		system: "Systém",
		terms: " Smluvní podmínky",
		termsText: "text smluvních podmínek",
		theme: "Změna barvy",
		thickness: "Tloušťka",
		averageThickness: "Průměrná tloušťka",
		thisMonth: "Tento měsíc",
		thisYear: "Tento rok",
		tilt: "Sklon",
		averageTilt: "Průměrný sklon",
		timberSummary: "Sumář řeziva",
		timeOfCreation: "Datum založení",
		projectTimeOfCreation: "Datum založení projektu",
		timePeriod: "Časové období",
		totalPrice: "Cena celkem",
		priceTotal: "Celková cena",
		averagePrice: "Průměrná cena",
		town: "Město",
		transportWeight: "Transportní hmotnost",
		totalTransportWeight: "Celková transportní hmotnost",
		truss: "Název vazníku",
		trussCount: "Počet vazníků",
		trussCountSum: "Celkem počet vazníků",
		totalTrussCountSum: "Celkový počet vazníků",
		trusses: "Vazníky",
		trussType: "Typ vazníku",
		trussTypesCount: "Počet typů vazníků",
		trussTypesCountSum: "Celkem počet typů vazníků",
		totalTrussTypesCountSum: "Ceklový počet typů vazníků",
		type: "Typ",
		customerType: "Typ zákazníka",
		typeOfContract: "Druh zakázky",
		typeOfTruss: "Druh vazníku",
		unHanded: "Nepodána",
		units: "Jednotky",
		upload: "Nahrát soubor",
		uploadTrussJson: "Nahrát úlohu",
		usefulInTheAttic: "Užitné podkroví",
		averageUsefulInTheAttic: "Průměrné užitné v podkroví",
		user: "Zodpovědná osoba",
		userAccount: "Uživatelský účet",
		userboard: "Uživatelská deska",
		username: "Přihlašovací jméno",
		utilityInTheAttic: "Užitné podkroví",
		vatRegNo: "DIČ",
		PlatesOnArea: "Objem dřeva na plochu půdorysu",
		averagePlatesOnArea: "Průmerný objem dřeva na plochu půdorysu",
		wallplateLength: "Délka pozednice",
		weight: "Hmotnost desek",
		weightOfBucklesPerPlanArea: "Hmotnost desek na plochu půdorysu",
		weightOfBucklesPerVolumeOfWood: "Hmotnost desek na objem dřeva",
		width: "Rozpon",
		averageWidth: "Průměrný rozpon",
		windArea: "Větrná oblast",
		windLoad: "Vítr",
		averageWindLoad: "Průměrné zatížení větrem",
		windRegion: "Větrná oblast",
		woodVolume: "Objem dřeva",
		woodenElement: "Dřevěný prvek",
		wordExport: "Word export",
		WindAreaNotSet: "Zahrnout bez větrné oblasti",
		SnowAreaNotSet: "Zahrnout bez sněhové oblasti",
		account: {
			ORGANIZATIONADMIN: "Admin",
			DESIGNENGINEER: "Projektant",
			VIEWER: "Host",
			role: "Role",
		},
		tooltip: {
			columnSelectorDisabled:
				"Sloupec není možné odebrat kvůli aplikaci řazení.",
			allRecords: "Všechny záznamy",
			addressFilter: "Pouze bez zadané adresy",
			projectUserFilter: "Pouze bez zodpovědné osoby",
			projectCustomerFilter: "Pouze bez zakazníka",
			jobQueryFilter: "Pouze bez zákazníka",
			filtered:
				"Filtry jsou aktivní - vyhovuje {{totalRecords}} z {{recordsBeforeFilter}} záznamů.",
		},
	},
	settings: {
		aboutProgram: "O programu",
		programVersion: "Verze programu",
		programName: "Název programu",
		system: "Systém",
	},
};

export default dictionary;
