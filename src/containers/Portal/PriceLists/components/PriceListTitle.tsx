import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ActionButton } from '../../../../components/Quotations/index';
import { Check } from '../../../../components/Button/Check';
import { Checkbox } from 'antd';
import { CircleRemove, PencilEdit } from '../../../../components/Button';
import { ContentInline, ContentRow } from '../../../../constants/globalStyles';
import { lang } from '../../../../translation/i18n';
import { PriceList } from '../_types';
import { translationPath } from '../../../../utils/getPath';
import { Undo } from '../../../../components/Button/Undo';
import { useTranslation } from 'react-i18next';

interface PriceListTitle {
	priceList: PriceList;
	priceListDuplicatePostAction: (data: PriceList) => void;
	priceListEditNamePutAction: (data: PriceList) => void;
	priceListDeleteAction: (data: PriceList) => void;
}

export const PriceListTitle = ({
	priceList,
	priceListDuplicatePostAction,
	priceListEditNamePutAction,
	priceListDeleteAction,
}: PriceListTitle) => {
	const { t } = useTranslation();
	const [editing, setEditing] = React.useState(null);
	const editingRef = React.useRef<HTMLInputElement>();

	useEffect(() => {
		editing &&
			setEditing({ initial: priceList?.Name, edited: priceList?.Name });
	}, [priceList]);

	const removeQuotationTemplate = () => {
		priceListDeleteAction({ Id: priceList?.Id });
	};
	const duplicatePriceList = () => {
		priceListDuplicatePostAction({ Id: priceList?.Id });
	};

	const enableEdit = () => {
		setEditing({
			initial: priceList?.Name,
			edited: priceList?.Name,
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
		priceListEditNamePutAction({
			...priceList,
			Name: editing.edited,
		});
		setEditing(null);
	};

	const cancelEdit = () => {
		setEditing(null);
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
					<Check check={() => saveEdit()} />
					<Undo undo={() => cancelEdit()} />
				</CategoryTitleEditContent>
			) : (
				<>
					<TitleQuotation>{priceList?.Name}</TitleQuotation>
					<ActionButton>
						<PencilEdit
							edit={() => enableEdit()}
							title={t(translationPath(lang.priceLists.editPriceList).path)}
							tooltipTitle={t(
								translationPath(lang.priceLists.editPriceListTitle).path,
								{ title: priceList?.Name }
							)}
						/>
					</ActionButton>
					<ActionButton>
						<CircleRemove
							remove={removeQuotationTemplate}
							title={t(translationPath(lang.priceLists.removePriceList).path)}
							popTitle={t(translationPath(lang.remove.priceList).path, {
								name: priceList?.Name,
							})}
							tooltipTitle={t(
								translationPath(lang.priceLists.removePriceListTitle).path,
								{ title: priceList?.Name }
							)}
						/>
					</ActionButton>
				</>
			)}
		</ContentRow>
	);
};

export const TitleQuotation = styled.div`
	color: ${(props) => props.theme.colors.quotation.title};
	font-size: 1.2rem;
	font-weight: 600;

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
