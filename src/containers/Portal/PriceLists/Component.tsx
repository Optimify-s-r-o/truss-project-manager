import * as _ from 'lodash';
import Navigation from './components/Navigation';
import React, { useEffect, useState } from 'react';
import { ContentTemplate, TemplateContent } from '../Quotations/_styles';
import { EmptyTemplate } from './components/EmpyTemplate';
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { Main } from '../SidebarFilter/Jobs/_styles';
import { PriceList, PriceListItem } from './_types';
import { PriceListEditor } from './components/PriceListEditor';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { TemplateSection } from '../Quotations/_types';
import { translationPath } from '../../../utils/getPath';
import { TreeContent } from '../_styles';
import {
	ContentInline,
	PageHeader,
	PageTitle,
} from "../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";

export interface StateProps {
	priceLists: PriceList[];
	priceList: PriceList;
}

export interface DispatchProps {
	priceListsGetAction: (data: void) => void;
	priceListGetByIdAction: (data: string) => void;
	createEmptyPriceListPostAction: (data: PriceList) => void;
	addItemToPriceListPostAction: (data: PriceListItem) => void;
	priceListDuplicatePostAction: (data: PriceList) => void;
	priceListEditNamePutAction: (data: PriceList) => void;
	priceListEditItemPutAction: (data: PriceListItem) => void;
	priceListDeleteAction: (data: PriceList) => void;
	priceListDelteItemtAction: (data: PriceListItem) => void;
}

const Index = ({
	priceListsGetAction,
	priceListGetByIdAction,
	createEmptyPriceListPostAction,
	addItemToPriceListPostAction,
	priceListDuplicatePostAction,
	priceListEditNamePutAction,
	priceListEditItemPutAction,
	priceListDeleteAction,
	priceListDelteItemtAction,
	priceLists,
	priceList,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { type } = useParams<{ type: string }>();
	const [sections, setSections] = useState<Array<TemplateSection>>([]);
	const [selected, setSelected] = useState<string>(null);
	useEffect(() => {
		priceListsGetAction();
	}, []);

	useEffect(() => {
		if (priceLists) {
			const firstPriceList = selected ? selected : _.first(priceLists)?.Id;
			priceListGetByIdAction(firstPriceList);
		}
	}, [priceLists]);

	const addPriceList = () => {
		createEmptyPriceListPostAction({});
	};

	const handlePriceListChange = (id: string) => {
		priceListGetByIdAction(id);
	};
	const list = priceLists
		? priceLists.map((q) => {
				return {
					id: q.Id,
					text: q.Name,
					onClick: () => handlePriceListChange(q.Id),
				};
		  })
		: [];
	const navigationTitles = list && [
		...list,
		...[
			{
				id: null,
				text: t(translationPath(lang.priceLists.addPriceList)),
				onClick: () => addPriceList(),
				icon: faPlusCircle,
				isAction: true,
			},
		],
	];
	return (
		<ContentInline>
			<Main>
				<ContentTemplate>
					<PageHeader>
						<PageTitle>
							{t(translationPath(lang.priceLists.priceList))}:{" "}
							{t(translationPath(lang.priceLists.custom))}
						</PageTitle>
						<Navigation
							title={t(translationPath(lang.templates.configutarions))}
							items={navigationTitles}
							priceLists={priceLists}
							priceList={priceList}
							selected={selected}
							setSelected={setSelected}
						/>
					</PageHeader>

					<TemplateContent>
						<TreeContent>
							{priceLists?.length == 0 ? (
								<EmptyTemplate addPriceList={addPriceList} />
							) : (
								<PriceListEditor
									priceListDuplicatePostAction={priceListDuplicatePostAction}
									priceListEditNamePutAction={priceListEditNamePutAction}
									priceListEditItemPutAction={priceListEditItemPutAction}
									priceListDeleteAction={priceListDeleteAction}
									priceListDelteItemtAction={priceListDelteItemtAction}
									priceListGetByIdAction={priceListGetByIdAction}
									createEmptyPriceListPostAction={
										createEmptyPriceListPostAction
									}
									addItemToPriceListPostAction={addItemToPriceListPostAction}
									priceList={priceList}
									setSections={setSections}
									sections={sections}
									type={type}
								/>
							)}
						</TreeContent>
					</TemplateContent>
				</ContentTemplate>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(Index);
