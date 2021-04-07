import { FormikProps } from 'formik';
import { useEffect } from 'react';
interface KeyboardHandler {
	children: React.ReactNode;
	formik: FormikProps<any>;
}
export const Enter = ({ children, formik }: KeyboardHandler) => {
	useEffect(() => {
		function submit(ev) {
			var key = ev.which || ev.keyCode;
			if (key === 13) {
				formik && formik.submitForm();
			}
		}
		document.addEventListener("keydown", submit, true);

		return () => {
			document.removeEventListener("keydown", submit, true);
		};
	}, []);

	return <>{children}</>;
};
