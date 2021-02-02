import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { Check } from '../../../../components/Button/Check';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../../../translation/i18n';
import { Popconfirm } from 'antd';
import { translationPath } from '../../../../utils/getPath';
import { Undo } from '../../../../components/Button/Undo';
import { useTranslation } from 'react-i18next';
import { VariablesDescriptionIcon } from '../_styles';
import {
	ContentInline,
	Title,
	TitleQuotation,
} from "../../../../constants/globalStyles";
import {
	faInfoCircle,
	faMinusCircle,
	faPencil,
} from "@fortawesome/pro-light-svg-icons";

interface CategoryHeaderProps {
	title: string;
	value?: string;
	onRemoveSection?: () => void;
	onTitleEdit?: (newTitle: string) => void;
	draggable: boolean;
	disabled?: boolean;
}

export const CategoryHeader = (props: CategoryHeaderProps) => {
	const [editing, setEditing] = React.useState(null);
	const editingRef = React.useRef<HTMLInputElement>();
	const { t } = useTranslation();

	const enableEdit = () => {
		setEditing({
			initial: props.title,
			edited: props.title,
		});

		setTimeout(() => {
			const input = editingRef.current;
			input.focus();
			input.select();
		}, 10);
	};

	const onEdit = (newValue: string) => {
		setEditing({
			initial: editing.initial,
			edited: newValue,
		});
	};

	const saveEdit = () => {
		props.onTitleEdit(editing.edited);
		setEditing(null);
	};

	const cancelEdit = () => {
		setEditing(null);
	};

	const TitleBox = (props: { value: string; text: string }) => (
		<VariableBox
			draggable={true}
			onDragStart={(e) => {
				e.dataTransfer.setData("Text", props.value);
			}}
		>
			<TitleQuotation>
				{props.text}
				<VariablesDescriptionIcon>
					<Tooltip
						title={t(translationPath(lang.templates.dragAndDrop).path)}
						placement={"left"}
					>
						<FontAwesomeIcon icon={faInfoCircle} />
					</Tooltip>
				</VariablesDescriptionIcon>
			</TitleQuotation>
		</VariableBox>
	);

	return editing === null ? (
		<CategoryTitleContent>
			{props.draggable ? (
				<TitleBox text={props.title} value={props.value} />
			) : (
				<TitleQuotation>{props.title}</TitleQuotation>
			)}
			{props.onTitleEdit && (
				<ActionButton
					color={"#346ef1eb"}
					disabled={props.disabled}
					onClick={() => enableEdit()}
				>
					<FontAwesomeIcon icon={faPencil} color={"#346ef1eb"} />{" "}
					{t(translationPath(lang.templates.renameSection).path)}
				</ActionButton>
			)}
			{props.onRemoveSection && (
				<Popconfirm
					title={t(translationPath(lang.remove.section).path, {
						name: props.title,
					})}
					onConfirm={() => props.onRemoveSection()}
					okText={t(translationPath(lang.common.yes).path)}
					cancelText={t(translationPath(lang.common.no).path)}
				>
					<ActionButton color={"#e03838"} disabled={props.disabled}>
						<FontAwesomeIcon icon={faMinusCircle} color={"#e03838"} />{" "}
						{t(translationPath(lang.templates.removeSection).path)}
					</ActionButton>
				</Popconfirm>
			)}
		</CategoryTitleContent>
	) : (
		<CategoryTitleEditContent>
			<CategoryTitleInput
				type="text"
				ref={editingRef}
				value={editing !== null ? editing.edited : ""}
				disabled={props.disabled}
				onChange={(e) => {
					onEdit(e.target.value);
				}}
			/>
			<Check check={() => saveEdit()} />
			<Undo undo={() => cancelEdit()} />
		</CategoryTitleEditContent>
	);
};

const VariableBox = styled.div`
	margin: 0.25rem 0rem;
	padding: 0.75rem 0rem;

	border-radius: 3px;
	color: ${(props) => props.theme.colors.primary.active};
	font-size: 0.9rem;
	font-weight: 400;

	cursor: grab;
	transition: all 0.2s ease-out;

	&:hover {
		box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	}
`;

const CategoryTitleContent = styled(ContentInline)`
	height: 39px;

	align-items: center;

	${Title} {
		margin: 0 1.5rem;
		font-size: 1.1em;
	}
`;

const ActionButton = styled.button<{ color: string }>`
	background: transparent;
	border: none;
	color: ${(props) => props.color};

	cursor: pointer;

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.25rem;
	}

	& + & {
		margin-left: 1rem;
	}
`;

export const CategoryTitleEditContent = styled(ContentInline)`
	padding: 0.5rem 0;
`;

export const CategoryTitleInput = styled.input`
	margin: -0.5rem 0.5rem -0.5rem 0;
	padding: 0.5rem 1.5rem;

	box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	border: 0;
	border-radius: 3px;
	font-size: 1.2rem;
	font-weight: 600;
`;
