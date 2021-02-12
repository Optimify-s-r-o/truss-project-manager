import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ActionButton } from '../../../../components/Quotations/index';
import { Check } from '../../../../components/Button/Check';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ContentInline, ContentRow } from '../../../../constants/globalStyles';
import { File } from './File';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { Undo } from '../../../../components/Button/Undo';
import { useTranslation } from 'react-i18next';
import {
	CircleRemove,
	DownloadPure,
	Duplicate,
	PencilEdit,
} from "../../../../components/Button";
import {
	QuotationFileImport,
	QuotationList,
	QuotationParam,
	Quotations,
	QuotationTemplatePut,
} from "../_types";

interface QuotationTitle {
	quotations: Quotations;
	quotationTemplatePutAction: (data: QuotationTemplatePut) => void;
	quotationTemplateDeleteAction: (data: QuotationParam) => void;
	quotationTemplateDuplicatePutAction: (data: QuotationParam) => void;
	quotationTemplateImportPostAction: (data: QuotationFileImport) => void;
	quotationTemplateExportGetAction: (data: string) => void;
	quotationList: QuotationList;
	type: string;
	activeConfiguration: string;
}

export const QuotationTitle = ({
	activeConfiguration,
	quotations,
	quotationTemplatePutAction,
	quotationTemplateDeleteAction,
	quotationTemplateDuplicatePutAction,
	quotationList,
	type,
	quotationTemplateImportPostAction,
	quotationTemplateExportGetAction,
}: QuotationTitle) => {
	const { t } = useTranslation();
	const [editing, setEditing] = React.useState(null);
	const [defaultTemplate, setDefault] = React.useState(false);
	const editingRef = React.useRef<HTMLInputElement>();

	useEffect(() => {
		const template = quotationList?.Quotations?.find(
			(f) => f.Id === quotations?.Id
		);
		template && setDefault(template.IsDefault);
		editing &&
			setEditing({ initial: quotations?.Title, edited: quotations?.Title });
	}, [quotationList, quotations]);

	const removeQuotationTemplate = () => {
		quotationTemplateDeleteAction({ Id: quotations?.Id, Type: type });
	};
	const duplicateQuotaionTemplate = () => {
		quotationTemplateDuplicatePutAction({
			Id: quotations?.Id,
			ActiveConfiguration: activeConfiguration,
			Type: type,
		});
	};

	const enableEdit = () => {
		setEditing({
			initial: quotations?.Title,
			edited: quotations?.Title,
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
		quotationTemplatePutAction({
			ActiveConfiguration: activeConfiguration,
			id: quotations?.Id,
			isDefault: defaultTemplate,
			title: editing.edited,
			type: type,
		});
		setEditing(null);
	};

	const cancelEdit = () => {
		setEditing(null);
	};

	const onChange = (e: CheckboxChangeEvent) => {
		setDefault(e.target.checked);
	};

	return (
		<ContentRow>
			{editing ? (
				<CategoryTitleEditContent>
					<CategoryTitleInput
						type="text"
						ref={editingRef}
						value={editing !== null ? editing.edited : ""}
						onChange={(e) => {
							onEdit(e.target.value);
						}}
					/>
					<SCheckbox onChange={onChange} checked={defaultTemplate}>
						{t(translationPath(lang.templates.defaultTemplate).path)}
					</SCheckbox>
					<Check check={() => saveEdit()} />
					<Undo undo={() => cancelEdit()} />
				</CategoryTitleEditContent>
			) : (
				<>
					<TitleQuotation>{quotations?.Title}</TitleQuotation>
					<ActionButton>
						<PencilEdit
							edit={() => enableEdit()}
							title={t(translationPath(lang.templates.editTemplate).path)}
							tooltipTitle={t(
								translationPath(lang.templates.editTemplateTitle).path,
								{ title: quotations?.Title }
							)}
						/>
					</ActionButton>
					<ActionButton>
						<Duplicate
							duplicate={duplicateQuotaionTemplate}
							title={t(translationPath(lang.templates.duplicateTemplate).path)}
							tooltipTitle={t(
								translationPath(lang.templates.duplicateTemplateTitle).path,
								{ title: quotations?.Title }
							)}
						/>
					</ActionButton>
					<ActionButton>
						<File
							id={quotations?.Id}
							title={quotations?.Title}
							uploadFile={quotationTemplateImportPostAction}
							type={type}
						/>
					</ActionButton>
					<ActionButton>
						<DownloadPure
							download={() => quotationTemplateExportGetAction(quotations?.Id)}
							tooltipTitle={t(
								translationPath(lang.templates.downloadQuotationTemplateTitle)
									.path,
								{ title: quotations?.Title }
							)}
							title={t(
								translationPath(lang.templates.downloadQuotationTemplate).path
							)}
						/>
					</ActionButton>
					<ActionButton>
						<CircleRemove
							remove={removeQuotationTemplate}
							title={t(translationPath(lang.templates.removeTemplate).path)}
							popTitle={t(translationPath(lang.remove.template).path, {
								name: quotations?.Title,
							})}
							tooltipTitle={t(
								translationPath(lang.templates.removeTemplateTitle).path,
								{ title: quotations?.Title }
							)}
						/>
					</ActionButton>
				</>
			)}
		</ContentRow>
	);
};

export const TitleQuotation = styled.div`
	color: #292929;
	font-size: 1.2rem;
	font-weight: 600;
	color: ${(props) => props.theme.colors.quotation.title};
	&:first-child {
		margin: 10px 14px 10px;
	}
`;

export const CategoryTitleEditContent = styled(ContentInline)`
	padding: 0.5rem 0;
`;

export const CategoryTitleInput = styled.input`
	margin: -0.5rem 0.5rem -0.5rem 0;
	padding: 0.5rem 1.5rem;
	background-color: ${(props) => props.theme.colors.forms.select};
	box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	border: 0;
	border-radius: 3px;
	font-size: 1.2rem;
	font-weight: 600;
`;

export const SCheckbox = styled(Checkbox)`
	padding-top: 5px;
	padding-left: 5px;
`;
