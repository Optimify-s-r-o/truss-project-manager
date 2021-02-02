import React, { useEffect } from 'react';
import { ContentTemplate, TemplateContent } from '../Quotations/_styles';
import { Main } from '../SidebarFilter/Jobs/_styles';
import { PriceListEditor } from './components/PriceListEditor';
import { PriceListPlate } from '../PriceLists/_types';
import { RouteComponentProps } from 'react-router-dom';
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
	priceListsPlates: PriceListPlate[];
}

export interface DispatchProps {
	priceListsPlatesGetAction: (data: void) => void;
}

const Index = ({
	priceListsPlatesGetAction,

	priceListsPlates,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	useEffect(() => {
		priceListsPlatesGetAction();
	}, []);

	return (
		<ContentInline>
			<Main>
				<ContentTemplate>
					<PageHeader>
						<PageTitle>
							{t(translationPath(lang.priceLists.priceList))}:{" "}
							{t(translationPath(lang.priceLists.plates))}
						</PageTitle>
					</PageHeader>

					<TemplateContent>
						<TreeContent>
							<PriceListEditor priceListsPlates={priceListsPlates} />
						</TreeContent>
					</TemplateContent>
				</ContentTemplate>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(Index);
