import ExternalTable from '../../../components/Optimify/Table/ExternalTable';
import Loading from '../../../components/Optimify/Loading';
import React, { useEffect } from 'react';
import { GlobalNotification } from '../../../components/Toast/_types';
import { lastPathMember, translationPath } from '../../../utils/getPath';
import { Page, UserRole } from '../../../types/_types';
import { Routes } from '../../../constants/routes';
import { useHistory } from 'react-router-dom';
import { UserData, UserProxy } from './_types';
import {
	CreateAccount,
	Delete,
	Edit,
	Password,
} from "../../../components/Button";
import {
	CardMiddleTableWrapper,
	Content,
	ContentCard,
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";
interface OwnProps {
	push: any;
}

export interface StateProps {
	users: UserData[];
	pendingLocal: boolean;
	pendingCloud: boolean;
	role: string;
	username: string;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pending: boolean;
	pageSize: string | null;
}

interface DispatchProps {
	getUsers: (data: Page) => void;
	deleteUserCall: (data: string) => void;
	notify: (data: GlobalNotification) => void;
}

export const Component = ({
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	deleteUserCall,
	role,
	username,
	pendingCloud,
	getUsers,
	pending,
	users,
	pageSize,
}: OwnProps & WithTranslation & DispatchProps & StateProps) => {
	const admin = role == UserRole.OrganizationAdmin ? true : false;
	const history = useHistory();
	useEffect(() => {
		getUsers({
			PageSize: 25,
			Page: 0,
			Sort: null,
			Paginate: true,
		});
	}, []);

	const removeUser = (username: string) => {
		deleteUserCall(username);
	};

	return (
		<Content>
			<ContentCard>
				<ContentSpaceBetweenWithPadding>
					<Header1>{t(translationPath(lang.common.accountsList))}</Header1>
					{admin && <CreateAccount />}
				</ContentSpaceBetweenWithPadding>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={pendingCloud}
					margin
				>
					<CardMiddleTableWrapper>
						<ExternalTable
							headers={[
								t(translationPath(lang.common.username)),
								t(translationPath(lang.common.email)),
								t(translationPath(lang.common.phone)),
								t(translationPath(lang.common.forename)),
								t(translationPath(lang.common.surname)),
								t(translationPath(lang.common.account.role)),
								t(translationPath(lang.common.actions)),
							]}
							sortable={[true, true, true, true, true, true, false]}
							columnNames={[
								lastPathMember(UserProxy.Username).path,
								lastPathMember(UserProxy.Email).path,
								,
								lastPathMember(UserProxy.PhoneNumber).path,
								,
								lastPathMember(UserProxy.Name).path,
								lastPathMember(UserProxy.Surname).path,
								lastPathMember(UserProxy.Role).path,
							]}
							onPageRequired={(requiredPage: Page) => {
								getUsers(requiredPage);
							}}
							pageSize={parseInt(pageSize)}
							firstRecordOnPage={firstRecordOnPage}
							lastRecordOnPage={lastRecordOnPage}
							currentPage={currentPage}
							totalPages={totalPages}
							totalRecords={totalRecords}
							isLoading={pending}
							data={
								users
									? users?.map((user: UserData, key: number) => [
											user.Username,
											user.Email,
											user.PhoneNumber,
											user.Name,
											user.Surname,
											user.Role,
											null,
											user,
									  ])
									: []
							}
							renderers={[
								(value: any, key: number, parent: UserData) => {
									return value;
								},
								(value: any, key: number, parent: UserData) => {
									return value;
								},
								(value: any, key: number, parent: UserData) => {
									return value;
								},
								(value: any, key: number, parent: UserData) => {
									return value;
								},
								(value: any, key: number, parent: UserData) => {
									return value;
								},
								(value: any, key: number, parent: UserData) => {
									return t(translationPath(lang.common.account[value]));
								},
								(value: any, key: number, parent: UserData) => {
									return (
										<div>
											{(admin || parent.Username === username) && (
												<Edit
													edit={() =>
														history.push(
															Routes.LINK_CREATE_USER + parent.Username
														)
													}
												/>
											)}
											&nbsp;
											{parent.Username === username && (
												<Password
													change={() =>
														history.push(Routes.ACCOUNTS_NEW_PASSWORD)
													}
												/>
											)}
											&nbsp;
											{admin && (
												<Delete
													title={t(translationPath(lang.remove.account), {
														name: parent.Username,
													})}
													remove={() => removeUser(parent.Username)}
												/>
											)}
										</div>
									);
								},
							]}
						/>
					</CardMiddleTableWrapper>
				</Loading>
			</ContentCard>
		</Content>
	);
};

export default withTranslation()(Component);
