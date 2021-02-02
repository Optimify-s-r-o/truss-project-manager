import * as React from 'react';
import * as Yup from 'yup';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { Button } from '../../../../components/Optimify/Button';
import {
	Customer,
	Evidence,
	Fetch,
	TreeType
	} from '../../../../types/_types';
import { faClipboardList } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEvidenceCustomerById } from '../../../../sagas/Fetch/actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from '../../../../constants/enum';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { translationPath } from '../../../../utils/getPath';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	Header1,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	lang,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	MainTree,
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../_styles";

export interface StateProps {
	activeTree: TreeType;
	pending: boolean;
	toast: any;
	evidence: Evidence;
}

export interface DispatchProps {
	save: (data: Customer) => void;
	clearToast: () => void;
	getEvidenceCustomer: (id: Fetch) => void;
}

const Index = ({
	activeTree,
	pending,
	save,
	evidence,
	getEvidenceCustomer,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: evidence && id ? evidence : { Id: null, Name: "" },
		enableReinitialize: true,
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
		}),
		onSubmit: (values: Evidence) => {
			save({
				Evidence: values,
				Person: null,
				Company: null,
				Redirect: true,
			});
		},
	});

	React.useEffect(() => {
		id && getEvidenceCustomer(getEvidenceCustomerById(id));
	}, [id]);
	return (
		<MainTree>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<TreeScreen>
						<PageHeader>
							<PageTitle>
								<TitleSection>
									<FontAwesomeIcon icon={faClipboardList as IconProp} />
									<TitleName>
										{formik.values && formik.values?.Id
											? t(translationPath(lang.common.editEvidencePerson).path)
											: t(translationPath(lang.common.createInEvidence).path)}
									</TitleName>
								</TitleSection>
							</PageTitle>
						</PageHeader>

						<TreeContent>
							<GridRow columns={1}>
								<GridItem fill>
									<ContentCard fullSize>
										<Header1>
											{t(translationPath(lang.common.generalInformation).path)}
										</Header1>
										<FormikRow
											formik={formik}
											name="Name"
											title={t(translationPath(lang.common.name).path)}
											type={Input.TEXT}
										/>
									</ContentCard>
								</GridItem>
							</GridRow>
						</TreeContent>
						<TreeButtonsRow>
							<Button level={1} loading={pending}>
								{id
									? t(translationPath(lang.common.save).path)
									: t(translationPath(lang.common.createInEvidence).path)}
							</Button>
						</TreeButtonsRow>
					</TreeScreen>
				</Form>
			</MainTreeContent>
		</MainTree>
	);
};

export default withTranslation()(Index);
