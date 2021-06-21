import * as React from 'react';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import styled from 'styled-components';
import { Form } from '../../../../../constants/globalStyles';
import { Input } from '../../../../../constants/enum';
import { lang } from '../../../../../translation/i18n';
import { Modal as AntdModal } from 'antd';
import { translationPath } from '../../../../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface IModal {
	isModalVisible: boolean;
	contactFormik: any;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({
	contactFormik,
	isModalVisible,
	setIsModalVisible,
}: IModal) => {
	const { t } = useTranslation();

	const handleOk = () => {
		contactFormik.submitForm();
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		contactFormik.resetForm();
	};

	console.log(contactFormik);

	return (
		<SModal
			title={t(translationPath(lang.common.contactPerson).path)}
			visible={isModalVisible}
			onCancel={handleCancel}
			onOk={handleOk}
			cancelText={t(translationPath(lang.common.cancel).path)}
			style={{ paddingBottom: 0 }}
		>
			<Form onSubmit={contactFormik.handleSubmit}>
				<FormikRow
					formik={contactFormik}
					name="Forename"
					title={t(translationPath(lang.common.forename).path)}
					type={Input.TEXT}
				/>
				<FormikRow
					formik={contactFormik}
					name="Surname"
					title={t(translationPath(lang.common.surname).path)}
					type={Input.TEXT}
				/>
				<FormikRow
					formik={contactFormik}
					name="Contact.Phone"
					title={t(translationPath(lang.common.phone).path)}
					type={Input.PHONE}
				/>
				<FormikRow
					formik={contactFormik}
					name="Contact.Email"
					title={t(translationPath(lang.common.email).path)}
					type={Input.TEXT}
				/>
				<FormikRow
					formik={contactFormik}
					name="Description"
					title={t(translationPath(lang.common.description).path)}
					type={Input.TEXT}
				/>
			</Form>
		</SModal>
	);
};

const SModal = styled(AntdModal)`
	.ant-modal {
		padding-bottom: 0 !important;
	}
	background-color: ${(props) => props.theme.colors.background.content};
	.anticon svg {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
	}
	.ant-modal-title {
		color: ${(props) => props.theme.colors.contentText};
	}
	color: ${(props) => props.theme.colors.contentText};
	.ant-modal-header {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
		border-bottom: 1px solid ${(props) => props.theme.colors.background.darker};
	}
	.ant-modal-body {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
	}
	.ant-modal-footer {
		border-top: 1px solid ${(props) => props.theme.colors.background.darker};
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
	}
`;
