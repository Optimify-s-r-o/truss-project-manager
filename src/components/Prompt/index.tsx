import lang from '../../translation/lang';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal } from 'antd';
import { Customer } from 'src/containers/Portal/Customer/_types';
import { JobType, Project, TreeType } from 'src/types/_types';
import { Location } from 'history';
import { Prompt, useHistory } from 'react-router-dom';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
interface Props {
	when?: boolean | undefined;
	shouldBlockNavigation: (location: Location) => boolean;
	formik: any;
	setSelectedKeys: (data: string[]) => void;
	update: (data: Project | JobType | Customer) => void;
	type: TreeType;
	customerContantPersons?: any;
}
const RouteLeavingGuard = ({
	when,
	shouldBlockNavigation,
	formik,
	setSelectedKeys,
	update,
	type,
	customerContantPersons,
}: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [id, setId] = useState<string | null>(null);
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);
	const [path, setNavigationPath] = useState("");
	const { t } = useTranslation();
	const history = useHistory();

	const closeModal = () => {
		setModalVisible(false);
		setSelectedKeys([formik.values?.Id]);
	};
	const handleBlockedNavigation = (nextLocation: Location): boolean => {
		const path = nextLocation.pathname.split("/");
		const id = path[path.length - 1];
		setNavigationPath(
			nextLocation.pathname.substr(0, nextLocation.pathname.lastIndexOf("/"))
		);
		setId(id);
		if (!confirmedNavigation && shouldBlockNavigation(nextLocation) && id) {
			setModalVisible(true);

			return false;
		}
		return true;
	};
	const leave = async () => {
		await setModalVisible(false);
		await setConfirmedNavigation(true);
	};

	const saveAndLeave = async () => {
		await setModalVisible(false);
		await setConfirmedNavigation(true);
		type === TreeType.PROJECT
			? await update({
					...formik.values,
					ConstructionDate: moment(formik.values.ConstructionDate).isValid()
						? moment(formik.values.ConstructionDate).format()
						: null,
					QuotationDate: moment(formik.values.QuotationDate).isValid()
						? moment(formik.values.QuotationDate).format()
						: null,
			  })
			: type === TreeType.CUSTOMER
			? await update({
					...formik.values,
					ContactPersons: customerContantPersons,
			  })
			: await update(formik.values);
	};

	useEffect(() => {
		if (confirmedNavigation && id) {
			history.push(path + "/" + id);
		}
	}, [confirmedNavigation, id]);
	return (
		<>
			<Prompt when={when} message={handleBlockedNavigation} />
			<Modal
				centered
				visible={modalVisible}
				onCancel={closeModal}
				cancelText={t(translationPath(lang.common.no).path)}
				okText={t(translationPath(lang.common.yes).path)}
				footer={[
					<Button onClick={leave}>
						{t(translationPath(lang.common.leave).path)}
					</Button>,
					<Button onClick={saveAndLeave} type="primary">
						{t(translationPath(lang.common.saveChanges).path)}
					</Button>,
					,
				]}
			>
				<br />
				<p>
					<Alert
						message={t(
							translationPath(lang.common.closeWithoutSavingTitle).path
						)}
						description={t(
							translationPath(lang.common.closeWithoutSavingMessage).path
						)}
						type="warning"
						showIcon
					/>
				</p>
			</Modal>
		</>
	);
};
export default RouteLeavingGuard;
