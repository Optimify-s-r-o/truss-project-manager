import React from 'react';
import styled from 'styled-components';
import { ContentRow, GridRow } from '../../../../constants/globalStyles';
import { faMinusCircle, faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './Input';
import { lang } from '../../../../translation/i18n';
import { Popconfirm } from 'antd';
import { PriceList, PriceListItem } from '../_types';
import { PriceListTitle } from './PriceListTitle';
import { TemplateSection } from '../../Quotations/_types';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface QuotationEditor {
	setSections: React.Dispatch<React.SetStateAction<TemplateSection[]>>;
	sections: TemplateSection[];
	type: string;

	priceListGetByIdAction: (data: string) => void;
	createEmptyPriceListPostAction: (data: PriceList) => void;
	addItemToPriceListPostAction: (data: PriceListItem) => void;
	priceListDuplicatePostAction: (data: PriceList) => void;
	priceListEditNamePutAction: (data: PriceList) => void;
	priceListEditItemPutAction: (data: PriceListItem) => void;
	priceListDeleteAction: (data: PriceList) => void;
	priceListDelteItemtAction: (data: PriceListItem) => void;
	priceList: PriceList;
}

export const PriceListEditor = ({
	priceList,
	priceListDeleteAction,
	priceListEditNamePutAction,
	priceListDuplicatePostAction,
	addItemToPriceListPostAction,
	priceListEditItemPutAction,
	priceListDelteItemtAction,
}: QuotationEditor) => {
	const { t } = useTranslation();

	const addItem = () => {
		addItemToPriceListPostAction({
			Id: priceList.Id,
		});
	};

	const updateItem = (newValue: PriceListItem) => {
		priceListEditItemPutAction({ ...newValue, PriceListId: priceList.Id });
	};

	const updateDefaultItem = (defaultItem: boolean) => {
		//priceListEditItemPutAction({ ...newValue, PriceListId: priceList.Id });
	};

	const removeItem = (item: PriceListItem) => {
		priceListDelteItemtAction({ Id: item.Id });
	};

	return (
		<>
			<GridRow columns={1}>
				<PriceListTitle
					priceList={priceList}
					priceListDuplicatePostAction={priceListDuplicatePostAction}
					priceListDeleteAction={priceListDeleteAction}
					priceListEditNamePutAction={priceListEditNamePutAction}
				/>
				<PLGrid>
					<PLTable>
						<thead>
							<PLTr>
								<PLNameHeader>
									{t(translationPath(lang.priceLists.itemName).path)}
								</PLNameHeader>
								<PLQuantityHeader>
									{t(translationPath(lang.priceLists.quantity).path)}
								</PLQuantityHeader>
								<PLPriceHeader>
									{t(translationPath(lang.priceLists.pricePerUnit).path)}
								</PLPriceHeader>
								<PLPriceHeader>
									{t(translationPath(lang.priceLists.default).path)}
								</PLPriceHeader>
								<PLActionsHeader>
									{t(translationPath(lang.priceLists.action).path)}
								</PLActionsHeader>
							</PLTr>
						</thead>
						<PLTableBody>
							{priceList?.Items?.map((i, key) => {
								return (
									<PLTr>
										<PLName>
											<Input
												value={i.Name}
												type="text"
												onChange={(newValue: string) =>
													updateItem({ ...i, Name: newValue })
												}
											/>
										</PLName>
										<PLQuantity>
											<Input
												value={i.QuantityInUnit}
												type="number"
												onChange={(newValue: number) =>
													updateItem({ ...i, QuantityInUnit: newValue })
												}
											/>
										</PLQuantity>
										<PLPrice>
											<Input
												value={i.Price}
												type="number"
												onChange={(newValue: number) =>
													updateItem({ ...i, Price: newValue })
												}
											/>
										</PLPrice>
										<PLPrice>
											<Default
												isDefault={i?.IsDefault}
												onClick={() =>
													updateItem({ ...i, IsDefault: !i.IsDefault })
												}
											/>
										</PLPrice>
										<PLActions>
											<Popconfirm
												title={t(
													translationPath(lang.remove.priceListItem).path,
													{ name: i.Name }
												)}
												onConfirm={() => removeItem(i)}
												okText={t(translationPath(lang.common.yes).path)}
												cancelText={t(translationPath(lang.common.no).path)}
											>
												<RemoveItemButton>
													<FontAwesomeIcon icon={faMinusCircle} />
													{t(translationPath(lang.priceLists.removeItem).path)}
												</RemoveItemButton>
											</Popconfirm>
										</PLActions>
									</PLTr>
								);
							})}
							<PLTr>
								<PLName></PLName>
								<PLQuantity></PLQuantity>
								<PLPrice></PLPrice>
								<PLPrice></PLPrice>
								<PLActions>
									<AddSectionButton onClick={() => addItem()}>
										<FontAwesomeIcon icon={faPlusCircle} color={"green"} />{" "}
										{t(translationPath(lang.priceLists.addItem).path)}
									</AddSectionButton>
								</PLActions>
							</PLTr>
						</PLTableBody>
					</PLTable>
				</PLGrid>
			</GridRow>
		</>
	);
};

export const PLGrid = styled.div`
	width: 90%;
`;

export const PLTable = styled.div`
	display: table;

	margin: 1em;

	border-collapse: collapse;
	font-size: 0.875rem;
`;

export const PLTableBody = styled.tbody`
	background-color: ${(props) => props.theme.colors.background.content};
	box-shadow: ${(props) => props.theme.boxShadow};
	border-radius: 3px;
`;

export const PLTr = styled(ContentRow)`
	display: table-row;

	width: 100%;
`;

export const PLHeader = styled.div`
	display: table-cell;
	position: relative;

	padding: 0.5rem 0.75rem;

	background: transparent;
	border: none;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;

export const PLCell = styled.div`
	display: table-cell;
	position: relative;

	padding: 0.75rem 0.75rem;

	border: 1px solid transparent;
	border-top-color: ${(props) => props.theme.colors.sectionsDivider};
	border-bottom-color: ${(props) => props.theme.colors.sectionsDivider};

	transition: all 0.2s ease-out;

	input {
		width: calc(100% + 1.5rem);

		margin: calc(-0.75rem - 1px);
		padding: 0.75rem;

		transition: all 0.2s ease-out;

		&:hover {
			box-shadow: inset 0 0 1px 0
					${(props) => props.theme.colors.secondaryText.default},
				0 0 0 1px ${(props) => props.theme.colors.secondaryText.default};
		}

		&:focus {
			box-shadow: inset 0 0 0 1px
					${(props) => props.theme.colors.primary.default},
				0 0 0 1px ${(props) => props.theme.colors.primary.default};
		}
	}
`;

export const PLNameHeader = styled(PLHeader)`
	width: 40%;
`;

export const PLQuantityHeader = styled(PLHeader)`
	width: 10%;
`;

export const PLPriceHeader = styled(PLHeader)`
	width: 10%;
`;

export const PLActionsHeader = styled(PLHeader)`
	width: 20%;
`;

export const PLName = styled(PLCell)`
	width: 50%;
`;

export const PLQuantity = styled(PLCell)`
	width: 10%;
`;

export const PLPrice = styled(PLCell)`
	width: 10%;
`;

export const PLActions = styled(PLCell)`
	width: 20%;
`;

const RowEnd = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RemoveItemButton = styled.button`
	margin: -0.75rem -0.75rem;
	padding: 0.75rem 0.75rem;

	background: transparent;
	border: none;
	color: ${(props) => props.theme.colors.secondaryText.default};

	cursor: pointer;
	transition: all 0.2s ease-out;

	svg {
		margin-right: 8px;
		font-size: 1.1rem;
		color: #e03838;
	}

	&:hover {
		color: #e03838;
	}
`;

const AddSectionButton = styled.button`
	background: transparent;
	border: none;
	border-radius: 3px;
	color: green;
	font-size: 0.9em;
	cursor: pointer;
	transition: all 0.2s ease-out;

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.1rem;
	}
`;

const Default = styled.div<{ isDefault?: boolean }>`
	cursor: pointer;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${(props) => (props.isDefault ? "green" : "gray")};
`;
