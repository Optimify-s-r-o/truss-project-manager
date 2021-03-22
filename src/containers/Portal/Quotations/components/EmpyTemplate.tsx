import React from 'react';
import { ActionButton, ActionSection } from '../../../../components/Quotations';
import { Empty } from 'antd';
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { File } from './File';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang, t } from '../../../../translation/i18n';
import { QuotationFileImport } from '../_types';
import { translationPath } from '../../../../utils/getPath';
import {
	ContentRow,
	QuotationColumn,
} from "../../../../constants/globalStyles";

interface EmptyTemplate {
	addQuotationTemplate: () => void;
	quotationTemplateImportPostAction: (data: QuotationFileImport) => void;
	type: string;
}
export const EmptyTemplate = ({
	addQuotationTemplate,
	quotationTemplateImportPostAction,
	type,
}: EmptyTemplate) => {
	const handleAddTemplate = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		addQuotationTemplate();
	};
	return (
		<QuotationColumn>
			<Empty description={""} />
			<br />
			<ContentRow>
				<ActionSection>
					<ActionButton onClick={handleAddTemplate}>
						<FontAwesomeIcon icon={faPlusCircle} />
						{t(translationPath(lang.templates.addDefaultTemplate))}
					</ActionButton>
				</ActionSection>
				<ActionSection>
					<ActionButton>
						<File
							blackAdnWhite={true}
							title={""}
							uploadFile={quotationTemplateImportPostAction}
							type={type}
						/>
					</ActionButton>
				</ActionSection>
			</ContentRow>
		</QuotationColumn>
	);
};
