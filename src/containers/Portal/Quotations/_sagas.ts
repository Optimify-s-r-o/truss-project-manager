import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga, FetchSagaReponseType } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { isElectron } from '../../../utils/electron';
import { lang, t } from '../../../translation/i18n';
import { makeFormData } from '../../../utils/makeFormData';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	extractFirstText,
	getExtension,
} from "../../../sagas/DownloadFile/_service";
import {
	quotationAddTemplatePostAction,
	quotationDeleteAction,
	quotationDownloadQuotationAction,
	quotationExpressionPostAction,
	quotationGetAction,
	quotationListGetAction,
	quotationPostAction,
	quotationPutAction,
	quotationPutExpressionAction,
	quotationSectionDeleteAction,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSectionDeleteAction,
	quotationSelectionSummaryPutAction,
	quotationSelectionVariableDeleteAction,
	quotationSummaryPutAction,
	quotationTemplateDeleteAction,
	quotationTemplateDuplicatePutAction,
	quotationTemplatePutAction,
	quotationVariableDeleteAction,
	quotationVariablePostAction,
	quotationVariablesGetAction,
	quotationTemplateExportGetAction,
	quotationTemplateImportPostAction,
} from "./_actions";

const openFile = (path: string) => {
	const { shell } = window.require("electron");
	shell.openPath(path);
};
function* quotationDownloadActionSaga(
	action: ReturnType<typeof quotationDownloadQuotationAction.request>
): Generator {
	const temp = window.require("temp"),
		fs = window.require("fs");
	try {
		// @ts-ignore
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_EXPORT,
			Method.GET,
			{ param: action.payload.Id + "/xls" }
		);
		if (!data.success) {
			yield put(
				quotationDownloadQuotationAction.failure(data.errorResponseData as any)
			);
			return;
		}
		if (data.response) {
			const contentDisposition = data.headers.get("Content-Disposition");
			const decoded_disposition = decodeURIComponent(contentDisposition);
			const fileName = extractFirstText(decoded_disposition);
			yield temp.mkdir("export", (_err, dirPath) => {
				try {
					var blob = new Blob([data.response as any], {
						type: "octet/stream",
					});
					const reader = new FileReader();
					reader.onloadend = () => {
						fs.writeFile(
							dirPath + fileName.split('"').join(""),
							new Uint8Array(reader.result as any),
							(err) => {
								if (err) {
									alert("An error ocurred creating the file " + err.message);
								} else {
									console.log("The file has been successfully saved");
									openFile(dirPath + fileName.split('"').join(""));
								}
							}
						);
					};
					reader.readAsArrayBuffer(blob);
				} catch (e) {
					alert("Failed to save the file !" + e);
				}
			});
			yield put(quotationDownloadQuotationAction.success(data.response as any));
			return;
		}

		yield put(quotationDownloadQuotationAction.success(data.response as any));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationDownloadQuotationAction.failure(err));
	}
}

function* quotationGetActionSaga(
	action: ReturnType<typeof quotationGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS,
			Method.GET,
			{
				param:
					action.payload.Type +
					(action.payload?.Id ? `/${action.payload?.Id}` : ""),
			}
		);

		if (!success) {
			yield put(quotationGetAction.failure(errorResponseData));
			return;
		}

		yield put(quotationGetAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationGetAction.failure(err));
	}
}

function* quotationExportGetActionSaga(
	action: ReturnType<typeof quotationTemplateExportGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS + "/" + action.payload + "/export/json",
			Method.GET
		);

		if (!data.success) {
			yield put(
				quotationTemplateExportGetAction.failure(data?.errorResponseData as any)
			);
			return;
		}

		if (data.response) {
			const contentDisposition = data.headers.get("Content-Disposition");
			const contentType = data.headers.get("Content-Type");
			const decoded_disposition = decodeURIComponent(contentDisposition);
			console.log(decoded_disposition);
			const fileName = extractFirstText(decoded_disposition);
			const extension = getExtension(contentType);
			const temp = window.require("temp"),
				fs = window.require("fs");
			let options = {
				title: "Truss Project Manager",
				defaultPath: `C:\\${fileName}`,
				buttonLabel: "Save",
				filters: extension,
			};
			if (isElectron()) {
				const { remote } = window.require("electron");
				const dialog = remote.dialog;
				const WIN = remote.getCurrentWindow();
				dialog
					.showSaveDialog(WIN, options)
					.then((result) => {
						console.log(result.filePath);
						if (result.filePath) {
							try {
								var blob = new Blob([data.response as any], {
									type: "octet/stream",
								});
								const reader = new FileReader();
								reader.onloadend = () => {
									fs.writeFile(
										result.filePath,
										new Uint8Array(reader.result as any),
										(err) => {
											if (err) {
												alert(
													"An error ocurred creating the file " + err.message
												);
											} else {
												console.log("The file has been successfully saved");
											}
										}
									);
								};
								reader.readAsArrayBuffer(blob);
							} catch (e) {
								alert("Failed to save the file !");
							}
						}
					})
					.catch((...args) => {
						console.warn("failed/rejected with", args);
					});
			}
		}

		yield put(quotationTemplateExportGetAction.success(data.response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationTemplateExportGetAction.failure(err));
	}
}

function* quotationListGetActionSaga(
	action: ReturnType<typeof quotationListGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS + "/" + action.payload.Type + "/list",
			Method.GET
		);

		if (!success) {
			yield put(quotationListGetAction.failure(errorResponseData));
			return;
		}

		yield put(quotationListGetAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationListGetAction.failure(err));
	}
}

function* quotationSelectionGetActionSaga(
	action: ReturnType<typeof quotationSelectionGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS +
				"/" +
				action.payload.type +
				"/calculated/" +
				action.payload.templateId +
				"/" +
				action.payload.entityId,
			Method.GET
		);

		if (!success) {
			yield put(quotationSelectionGetAction.failure(errorResponseData));
			return;
		}

		yield put(quotationSelectionGetAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSelectionGetAction.failure(err));
	}
}

function* quotationVariablesGetActionSaga(
	action: ReturnType<typeof quotationVariablesGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLES,
			Method.GET,
			{
				param:
					action.payload.Type +
					(action.payload.Id ? "/" + action.payload.Id : ""),
			}
		);

		if (!success) {
			yield put(quotationVariablesGetAction.failure(errorResponseData));
			return;
		}

		yield put(quotationVariablesGetAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationVariablesGetAction.failure(err));
	}
}

function* quotationPostActionSaga(
	action: ReturnType<typeof quotationPostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SECTIONS,
			Method.POST,
			{
				bodyJSON: {
					QuotationId: action.payload.Id,
					Title: action.payload.Title,
					DefaultExpressionTitle: action.payload.DefaultExpressionTitle,
				},
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationPostAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationPostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationPostAction.failure(err));
	}
}

function* quotationAddTemplatePostActionSaga(
	action: ReturnType<typeof quotationAddTemplatePostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS,
			Method.POST,
			{
				bodyJSON: {
					Type: action.payload.Type,
				},
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationAddTemplatePostAction.failure(errorResponseData));
			return;
		}
		yield put(quotationListGetAction.request({ Type: action.payload.Type }));
		yield put(quotationAddTemplatePostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationAddTemplatePostAction.failure(err));
	}
}

function* quotationImportTemplatePostActionSaga(
	action: ReturnType<typeof quotationTemplateImportPostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_IMPORT,
			Method.POST,
			{
				bodyFormData: makeFormData(action.payload),
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationTemplateImportPostAction.failure(errorResponseData));
			return;
		}
		yield put(quotationListGetAction.request({ Type: action.payload.Type }));
		yield put(quotationTemplateImportPostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationTemplateImportPostAction.failure(err));
	}
}

function* quotationExpressionPostActionSaga(
	action: ReturnType<typeof quotationExpressionPostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLES,
			Method.POST,
			{
				param: action.payload.Section,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationExpressionPostAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationExpressionPostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationExpressionPostAction.failure(err));
	}
}

function* quotationVariablePostActionSaga(
	action: ReturnType<typeof quotationVariablePostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLES,
			Method.POST,
			{
				param: action.payload.Id,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationVariablePostAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationVariablePostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationVariablePostAction.failure(err));
	}
}

function* quotationTemplateDuplicatePutActionSaga(
	action: ReturnType<typeof quotationTemplateDuplicatePutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_DUPLICATE,
			Method.POST,
			{
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationTemplateDuplicatePutAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationListGetAction.request({ Type: action.payload.Type }));
		yield put(quotationTemplateDuplicatePutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationTemplateDuplicatePutAction.failure(err));
	}
}

function* quotationPutActionSaga(
	action: ReturnType<typeof quotationPutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SECTIONS,
			Method.PUT,
			{
				param: action.payload.Section,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationPutAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationPutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationPutAction.failure(err));
	}
}

function* quotationSummaryPutActionSaga(
	action: ReturnType<typeof quotationSummaryPutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SUMMARY,
			Method.PUT,
			{
				param: action.payload.Id,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationPutAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationSummaryPutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSummaryPutAction.failure(err));
	}
}
function* quotationSelectionSummaryPutActionSaga(
	action: ReturnType<typeof quotationSelectionSummaryPutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SUMMARY_PUT,
			Method.PUT,
			{
				param: action.payload.Id,
				bodyJSON: { Summary: action.payload.Summary?.toString() },
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationSelectionSummaryPutAction.failure(errorResponseData));
			return;
		}
		yield put(quotationSelectionSummaryPutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSelectionSummaryPutAction.failure(err));
	}
}
function* quotationSelectionPutActionSaga(
	action: ReturnType<typeof quotationSelectionPutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLE_PUT,
			Method.PUT,
			{
				param: action.payload.Id,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationSelectionPutAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationSelectionGetAction.request({
				entityId: action.payload.EntityId,
				templateId: action.payload.TemplateId,
				type: action.payload.Type,
			})
		);
		yield put(quotationSelectionPutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSelectionPutAction.failure(err));
	}
}
function* quotationTemplatePutActionSaga(
	action: ReturnType<typeof quotationTemplatePutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS,
			Method.PUT,
			{
				param: action.payload.id,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationTemplatePutAction.failure(errorResponseData));
			return;
		}

		yield put(quotationTemplatePutAction.success(response));
		yield put(quotationListGetAction.request({ Type: action.payload.type }));
		yield put(
			quotationGetAction.request({
				Type: action.payload.type,
				Id: action.payload.ActiveConfiguration,
			})
		);
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationTemplatePutAction.failure(err));
	}
}

function* quotationPutExpressionActionSaga(
	action: ReturnType<typeof quotationPutExpressionAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLES,
			Method.PUT,
			{
				param: action.payload.Id,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationPutExpressionAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationPutExpressionAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationPutExpressionAction.failure(err));
	}
}

function* quotationDeleteActionSaga(
	action: ReturnType<typeof quotationDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SECTIONS,
			Method.DELETE,
			{
				param: action.payload.Section,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationDeleteAction.failure(errorResponseData));
			return;
		}
		yield put(quotationDeleteAction.success(response));
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationDeleteAction.failure(err));
	}
}

function* quotationTemplateDeleteActionSaga(
	action: ReturnType<typeof quotationTemplateDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS,
			Method.DELETE,
			{
				param: action.payload.Id,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationTemplateDeleteAction.failure(errorResponseData));
			return;
		}
		yield put(quotationTemplateDeleteAction.success(response));
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
			})
		);
		yield put(quotationListGetAction.request({ Type: action.payload.Type }));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationTemplateDeleteAction.failure(err));
	}
}

function* quotationSectionDeleteActionSaga(
	action: ReturnType<typeof quotationSectionDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS,
			Method.DELETE,
			{
				param: action.payload.section + "/" + action.payload.expression,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationSectionDeleteAction.failure(errorResponseData));
			return;
		}

		yield put(quotationSectionDeleteAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSectionDeleteAction.failure(err));
	}
}

function* quotationVariableDeleteActionSaga(
	action: ReturnType<typeof quotationVariableDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_VARIABLES,
			Method.DELETE,
			{
				param: action.payload.Id,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(quotationVariableDeleteAction.failure(errorResponseData));
			return;
		}
		yield put(
			quotationGetAction.request({
				Type: action.payload.Type,
				Id: action.payload.ActiveConfiguration,
			})
		);
		yield put(quotationVariableDeleteAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationVariableDeleteAction.failure(err));
	}
}

function* quotationSelectoinSectionDeleteActionSaga(
	action: ReturnType<typeof quotationSelectionSectionDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SELECTION_DELETE_SECTION,
			Method.DELETE,
			{
				param: action.payload.Id,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(
				quotationSelectionSectionDeleteAction.failure(errorResponseData)
			);
			return;
		}
		yield put(
			quotationSelectionGetAction.request({
				entityId: action.payload.EntityId,
				templateId: action.payload.TemplateId,
				type: action.payload.Type,
			})
		);
		yield put(quotationSelectionSectionDeleteAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSelectionSectionDeleteAction.failure(err));
	}
}

function* quotationSelectionVariableDeleteActionSaga(
	action: ReturnType<typeof quotationSelectionVariableDeleteAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SELECTION_DELETE_VARIABLES,
			Method.DELETE,
			{
				param: action.payload.Id,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(
				quotationSelectionVariableDeleteAction.failure(errorResponseData)
			);
			return;
		}
		yield put(
			quotationSelectionGetAction.request({
				entityId: action.payload.EntityId,
				templateId: action.payload.TemplateId,
				type: action.payload.Type,
			})
		);
		yield put(quotationSelectionVariableDeleteAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(quotationSelectionVariableDeleteAction.failure(err));
	}
}

export function* watchQuotationDownloadAction() {
	yield takeLatest(
		getType(quotationDownloadQuotationAction.request),
		quotationDownloadActionSaga
	);
}

export function* watchQuotationSelectionVariableDeleteAction() {
	yield takeLatest(
		getType(quotationSelectionVariableDeleteAction.request),
		quotationSelectionVariableDeleteActionSaga
	);
}

export function* watchQuotationSelectionSectionDeleteAction() {
	yield takeLatest(
		getType(quotationSelectionSectionDeleteAction.request),
		quotationSelectoinSectionDeleteActionSaga
	);
}

export function* watchQuotationPostAction() {
	yield takeLatest(
		getType(quotationPostAction.request),
		quotationPostActionSaga
	);
}

export function* watchQuotationAddTemplatePostAction() {
	yield takeLatest(
		getType(quotationAddTemplatePostAction.request),
		quotationAddTemplatePostActionSaga
	);
}

export function* watchQuotationSelectionGetAction() {
	yield takeLatest(
		getType(quotationSelectionGetAction.request),
		quotationSelectionGetActionSaga
	);
}
export function* watchQuotationListGetAction() {
	yield takeLatest(
		getType(quotationListGetAction.request),
		quotationListGetActionSaga
	);
}
export function* watchQuotationExpressionPostAction() {
	yield takeLatest(
		getType(quotationExpressionPostAction.request),
		quotationExpressionPostActionSaga
	);
}

export function* watchQuotationVariablePostAction() {
	yield takeLatest(
		getType(quotationVariablePostAction.request),
		quotationVariablePostActionSaga
	);
}

export function* watchQuotationPutAction() {
	yield takeLatest(getType(quotationPutAction.request), quotationPutActionSaga);
}

export function* watchQuotationSummaryPutAction() {
	yield takeLatest(
		getType(quotationSummaryPutAction.request),
		quotationSummaryPutActionSaga
	);
}
export function* watchQuotationTemplateDuplicatePutAction() {
	yield takeLatest(
		getType(quotationTemplateDuplicatePutAction.request),
		quotationTemplateDuplicatePutActionSaga
	);
}

export function* watchQuotationGetAction() {
	yield takeLatest(getType(quotationGetAction.request), quotationGetActionSaga);
}

export function* watchQuotationVariablesGetAction() {
	yield takeLatest(
		getType(quotationVariablesGetAction.request),
		quotationVariablesGetActionSaga
	);
}

export function* watchQuotationDeleteAction() {
	yield takeLatest(
		getType(quotationDeleteAction.request),
		quotationDeleteActionSaga
	);
}
export function* watchQuotationTemplateDeleteAction() {
	yield takeLatest(
		getType(quotationTemplateDeleteAction.request),
		quotationTemplateDeleteActionSaga
	);
}
export function* watchQuotationSectionDeleteAction() {
	yield takeLatest(
		getType(quotationSectionDeleteAction.request),
		quotationSectionDeleteActionSaga
	);
}
export function* watchQuotationVariableDeleteAction() {
	yield takeLatest(
		getType(quotationVariableDeleteAction.request),
		quotationVariableDeleteActionSaga
	);
}
export function* watchQuotationPutExpressionAction() {
	yield takeLatest(
		getType(quotationPutExpressionAction.request),
		quotationPutExpressionActionSaga
	);
}
export function* watchQuotationTemplatePutAction() {
	yield takeLatest(
		getType(quotationTemplatePutAction.request),
		quotationTemplatePutActionSaga
	);
}
export function* watchQuotationSelectionSummaryPutExpressionAction() {
	yield takeLatest(
		getType(quotationSelectionSummaryPutAction.request),
		quotationSelectionSummaryPutActionSaga
	);
}
export function* watchQuotationSelectionPutExpressionAction() {
	yield takeLatest(
		getType(quotationSelectionPutAction.request),
		quotationSelectionPutActionSaga
	);
}
export function* watchQuotationExportGetAction() {
	yield takeLatest(
		getType(quotationTemplateExportGetAction.request),
		quotationExportGetActionSaga
	);
}
export function* watchQuotationImportPostAction() {
	yield takeLatest(
		getType(quotationTemplateImportPostAction.request),
		quotationImportTemplatePostActionSaga
	);
}
