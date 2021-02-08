import * as React from 'react';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import { Button, PlainButton } from '../../../../../components/Optimify/Button';
import { Contact } from '../../../../../types/_types';
import { Header2, MainContent } from '../../../../../constants/globalStyles';
import { Input } from '../../../../../constants/enum';
import { translationPath } from '../../../../../utils/getPath';
import { useFormik } from 'formik';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";

interface OwnProps {
	open: boolean;
	close: () => void;
	formik: any;
	contact?: Contact[];
	contactIndex?: number;
	setContact: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, close, open, contact, contactIndex, setContact } = props;
	const initialValues: Contact =
		contact && contactIndex != null
			? contact[contactIndex]
			: {
					Id: "",
					Name: "",
					Description: "",
					Email: "",
					Phone: "",
			  };
	const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
	const f = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min), { count: 1 }))
				.max(200, t(translationPath(lang.validation.max), { count: 200 }))
				.required(t(translationPath(lang.validation.required))),
			Phone: Yup.string().matches(
				phoneRegExp,
				t(translationPath(lang.validation.phone))
			),
		}),
		enableReinitialize: true,
		onSubmit: (values: Contact) => {
			if (contactIndex != null && contact) {
				const temp = contact;
				temp[contactIndex].Id = values.Id;
				temp[contactIndex].Name = values.Name;
				temp[contactIndex].Description = values.Description;
				temp[contactIndex].Email = values.Email;
				temp[contactIndex].Phone = values.Phone;
				setContact(temp);
			} else {
				setContact([...contact, values]);
			}
			f.resetForm();
			close();
		},
	});

	return (
		<Dialog
			fullWidth
			open={open}
			onClose={close}
			aria-labelledby="form-dialog-title"
		>
			<form onSubmit={f.handleSubmit}>
				<MainContent>
					<DialogContent>
						<Header2>
							{t(
								translationPath(
									contactIndex
										? lang.common.contactPersonEdit
										: lang.common.contactPerson
								)
							)}
						</Header2>
						<FormikRow
							formik={f}
							name="Name"
							title={t(translationPath(lang.common.fullName))}
							type={Input.TEXT}
						/>
						<FormikRow
							formik={f}
							name="Phone"
							title={t(translationPath(lang.common.phone))}
							type={Input.PHONE}
						/>
						<FormikRow
							formik={f}
							name="Email"
							title={t(translationPath(lang.common.email))}
							type={Input.TEXT}
						/>

						<FormikRow
							formik={f}
							name="Description"
							title={t(translationPath(lang.common.description))}
							type={Input.TEXT}
						/>
					</DialogContent>
					<DialogActions>
						<PlainButton level={3} onClick={close} type="button">
							{t(translationPath(lang.common.close))}
						</PlainButton>
						<Button level={3} type="submit">
							{t(
								translationPath(
									contactIndex ? lang.common.edit : lang.common.add
								)
							)}
						</Button>
					</DialogActions>
				</MainContent>
			</form>
		</Dialog>
	);
};

export default withTranslation()(Index);
