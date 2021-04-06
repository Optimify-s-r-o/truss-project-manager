import * as React from 'react';
import CheckBox from '../../../../components/Optimify/Form/CheckBox';
import Collapsible from 'react-collapsible';
import { Checkbox } from '../Jobs/Component';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootStateType } from '../../../../reducers/index';
import { translationPath } from '../../../../utils/getPath';
import { TreeType } from '../../../../types/_types';
import { useSelector } from 'react-redux';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	ColumnSelectorActive,
	ColumnSelectorButton,
	ColumnSelectorCheckboxes,
	ColumnSelectorContent,
	ColumnSelectorHeader,
	ColumnSelectorWrapper,
	SetDefault,
} from "./_styles";

interface OwnProps {
	checkboxes: Checkbox[];
	checked: Checkbox[];
	changeChecked: (newItem: Checkbox) => void;
	resetHeaderSettings: (data: string) => void;
	type: TreeType;
}

const ColumnSelector = ({
	checkboxes,
	checked,
	changeChecked,
	resetHeaderSettings,
	type,
}: OwnProps & WithTranslation) => {
	const [visible, setVisible] = React.useState(false);
	const [openSections, setOpenSections] = React.useState<Array<string>>([]);
	const state = useSelector((state: RootStateType) => state);
	const ref = React.useRef(null);

	React.useEffect(() => {
		function handleClickOutside(e) {
			if (visible && ref.current && !ref.current.contains(e.target))
				setVisible(false);
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [visible]);

	const isChecked = (it: Checkbox) => {
		const present = checked.find((item) => item.name === it.name);
		if (present) {
			return true;
		}
		return false;
	};

	const handleChange = (newItem: Checkbox) => (
		_event: React.ChangeEvent<HTMLInputElement>
	) => {
		changeChecked(newItem);
	};

	let sections = {};
	checkboxes.forEach((checkbox: Checkbox) => {
		if (!sections.hasOwnProperty(checkbox.section)) {
			sections[checkbox.section] = [];
		}

		sections[checkbox.section].push(checkbox);
	});

	const resetHeaders = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		resetHeaderSettings(type);
	};

	return (
		<ColumnSelectorWrapper ref={ref}>
			<ColumnSelectorButton
				onClick={() => {
					setVisible(!visible);
				}}
				open={visible}
			>
				{t(translationPath(lang.common.columnSelection))}
			</ColumnSelectorButton>
			<ColumnSelectorCheckboxes visible={visible}>
				<SetDefault onClick={resetHeaders}>
					{t(translationPath(lang.table.setDefault))}
				</SetDefault>
				{Object.keys(sections).map((sectionKey, key) => {
					const checkboxesInSection = Object.keys(sections[sectionKey]).length;

					let activeCheckboxes = 0;
					sections[sectionKey].forEach((checkbox) => {
						if (isChecked(checkbox)) activeCheckboxes++;
					});

					return (
						<Collapsible
							key={key}
							onOpening={() => setOpenSections([...openSections, sectionKey])}
							onClosing={() =>
								setOpenSections(
									openSections.filter((section) => section !== sectionKey)
								)
							}
							easing={"ease-out"}
							overflowWhenOpen={"visible"}
							transitionTime={200}
							trigger={
								<ColumnSelectorHeader
									isOpen={openSections.includes(sectionKey)}
								>
									<span>
										{t(
											translationPath(
												lang.common["checkboxSection" + sectionKey]
											)
										)}
										<FontAwesomeIcon icon={faChevronDown} />
									</span>
									<ColumnSelectorActive isActive={activeCheckboxes > 0}>
										{activeCheckboxes} / {checkboxesInSection}
									</ColumnSelectorActive>
								</ColumnSelectorHeader>
							}
						>
							<ColumnSelectorContent>
								{sections[sectionKey].map(
									(checkbox: Checkbox, index: number) => {
										return (
											<CheckBox
												checked={isChecked(checkbox)}
												handleChange={handleChange(checkbox)}
												label={checkbox.title}
												name=""
												key={index}
												disabled={state.HeaderSettingsReducer.disabled?.includes(
													checkbox.name
												)}
											/>
										);
									}
								)}
							</ColumnSelectorContent>
						</Collapsible>
					);
				})}
			</ColumnSelectorCheckboxes>
		</ColumnSelectorWrapper>
	);
};

export default withTranslation()(ColumnSelector);
