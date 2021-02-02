import * as rdrLocales from 'react-date-range/dist/locale';
import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import styled from 'styled-components';
import { Button } from '../../../../components/Optimify/Button';
import { DateRange, DateRangePicker } from 'react-date-range';
import { defaultInputRanges, defaultStaticRanges } from './defaultRanges';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PlainButton } from '../../../../components/Optimify/Button/index';
import { translationPath } from '../../../../utils/getPath';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
	ButtonsRow,
	ContentRow,
	ContentSpaceBetween,
	MainContent,
} from "../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
interface OwnProps {
	formik: any;
	name: any;
	title?: string;
}
const Index = (props: WithTranslation & OwnProps) => {
	const { formik, name, title } = props;
	const [isOpen, setOpen] = React.useState(false);

	const onToggle = () => {
		setOpen(!isOpen);
	};

	const getDate = (date: any) => {
		return date ? moment(date).format("D. MM. YYYY") : "x";
	};

	return (
		<>
			<div>
				<PlainButton level={3} type="button" noLeftMargin onClick={onToggle}>
					<FontAwesomeIcon icon={faCalendarAlt as IconProp} />
					&nbsp;&nbsp;
					{get(formik.values, name)?.From || get(formik.values, name)?.To
						? getDate(get(formik.values, name)?.From) +
						  " - " +
						  getDate(get(formik.values, name)?.To)
						: t(translationPath(lang.common.dateFilterPlaceholder))}
				</PlainButton>
			</div>
			{isOpen && (
				<ModalWindow
					formik={formik}
					close={onToggle}
					open={isOpen}
					name={name}
					title={title}
				/>
			)}
		</>
	);
};
export default withTranslation()(React.memo(Index));

interface IModalWindow {
	open: boolean;
	close: () => void;
	formik: any;
	name: string;
	title: string;
}

enum FilterDateRange {
	RANGE,
	FROM,
	TO,
}
export const ModalWindow = (props: IModalWindow) => {
	const [activeFilterType, setActiveFilter] = useState<FilterDateRange>(
		FilterDateRange.RANGE
	);
	const { formik, name, close, open, title } = props;
	const [selectionRange, setSelectionRange] = React.useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const onSelect = (value) => {
		setSelectionRange({
			startDate: value.selection.startDate,
			endDate: value.selection.endDate,
			key: "selection",
		});
	};
	const handleClose = () => {
		formik.setFieldValue(name, {
			From: selectionRange.startDate
				? moment(selectionRange.startDate).utc(true)
				: null,
			To: selectionRange.endDate
				? moment(selectionRange.endDate).utc(true)
				: null,
			IncludeNotSet: true,
			Active: true,
		});
		close();
	};

	const onDateRangeFromChange = (item: any) => {
		setSelectionRange({
			startDate: item.selection?.startDate,
			endDate: null,
			key: "selection",
		});
	};

	const onDateRangeToChange = (item: any) => {
		setSelectionRange({
			startDate: null,
			endDate: item.selection?.endDate,
			key: "selection",
		});
	};

	return (
		<Dialog
			fullWidth={true}
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<MainContent>
				<DialogTitle id="form-dialog-title">
					<ContentSpaceBetween>
						<Title>{title}</Title>
						<Close onClick={handleClose}>
							<CloseIcon />
						</Close>
					</ContentSpaceBetween>
				</DialogTitle>

				<RowOption>
					<Option
						active={activeFilterType === FilterDateRange.RANGE}
						onClick={() => {
							setActiveFilter(FilterDateRange.RANGE);
							setSelectionRange({
								startDate: new Date(),
								endDate: new Date(),
								key: "selection",
							});
						}}
					>
						{t(translationPath(lang.common.period))}
					</Option>
					<Option
						active={activeFilterType === FilterDateRange.FROM}
						onClick={() => {
							setActiveFilter(FilterDateRange.FROM);
							setSelectionRange({
								startDate: new Date(),
								endDate: null,
								key: "selection",
							});
						}}
					>
						{t(translationPath(lang.common.periodFromDate))}
					</Option>
					<Option
						active={activeFilterType === FilterDateRange.TO}
						onClick={() => {
							setActiveFilter(FilterDateRange.TO);
							setSelectionRange({
								startDate: null,
								endDate: new Date(),
								key: "selection",
							});
						}}
					>
						{t(translationPath(lang.common.periodToDate))}
					</Option>
				</RowOption>
				<SDialogContent>
					{activeFilterType === FilterDateRange.FROM && (
						<DateRange
							editableDateInputs={true}
							onChange={onDateRangeFromChange}
							moveRangeOnFirstSelection={false}
							ranges={[selectionRange]}
							rangeColors={["#17785e", "#17785e"]}
						/>
					)}
					{activeFilterType === FilterDateRange.TO && (
						<DateRange
							editableDateInputs={true}
							onChange={onDateRangeToChange}
							moveRangeOnFirstSelection={false}
							ranges={[selectionRange]}
							rangeColors={["#17785e", "#17785e"]}
						/>
					)}
					{activeFilterType === FilterDateRange.RANGE && (
						<DateRangePicker
							ranges={[selectionRange]}
							onChange={onSelect}
							locale={rdrLocales.cs}
							showSelectionPreview={true}
							moveRangeOnFirstSelection={false}
							months={2}
							direction="horizontal"
							rangeColors={["#17785e", "#17785e"]}
							staticRanges={defaultStaticRanges}
							inputRanges={defaultInputRanges}
						/>
					)}
				</SDialogContent>
				<ButtonsRow>
					<Button level={3} onClick={handleClose} type="button">
						{t(translationPath(lang.common.dateFilterPlaceholder))}
					</Button>
				</ButtonsRow>
			</MainContent>
		</Dialog>
	);
};

export const Close = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-right: 10px;
`;

const Option = styled.span<{ active: boolean }>`
	padding: 0.3em 0.8em;
	font-size: 0.94em;
	margin-left: 10px;
	cursor: pointer;
	background-color: ${(props) =>
		props.active
			? props.theme.colors.primary.default
			: props.theme.colors.background.content};
	color: ${(props) =>
		props.active
			? props.theme.colors.background.content
			: props.theme.colors.primary.default};
	border: 1px solid
		${(props) =>
			props.active
				? props.theme.colors.background.content
				: props.theme.colors.primary.default};
	border-radius: 4px;
	font-weight: 100;
`;

const Title = styled.span`
	font-size: 1.25rem;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 500;
	line-height: 1.6;
	letter-spacing: 0.0075em;
	min-width: 225px;
`;

const Row = styled(ContentRow)`
	width: 100%;
	justify-content: center;
`;

const RowOption = styled(ContentRow)`
	width: 100%;
	padding: 1em;
	justify-content: center;
`;

const SDialogContent = styled(DialogContent)`
	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 10px;
`;
