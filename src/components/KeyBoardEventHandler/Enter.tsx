import { FormikProps } from "formik";
import { useEffect } from "react";
interface KeyboardHandler {
	children: React.ReactNode;
	formik: FormikProps<any>;
}

let previousKey = null;

export const Enter = ({ children, formik }: KeyboardHandler) => {
	useEffect(() => {
		function submit(ev) {
			var key = ev.which || ev.keyCode;

			if (key === 13 || (key === 83 && previousKey === 17)) {
				formik && formik.submitForm();
			}
			previousKey = key;
		}
		document.addEventListener("keydown", submit, true);

		return () => {
			document.removeEventListener("keydown", submit, true);
		};
	}, []);

	return <>{children}</>;
};
