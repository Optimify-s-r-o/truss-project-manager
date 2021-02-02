import Loading from '../../../components/Optimify/Loading';
import React, { useEffect } from 'react';
import { ApiURL } from '../../../constants/api';
import { deleteUser } from './_actions';
import { Fetch, UserRole } from '../../../types/_types';
import { GlobalNotification } from '../../../components/Toast/_types';
import { Method } from '../../../constants/enum';
import { Routes } from '../../../constants/routes';
import { ScrollableTable } from '../../../components/Optimify/Table';
import { translationPath } from '../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { UserData } from './_types';
import { usersAction } from '../_actions';
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
	local: boolean;
	role: string;
	username: string;
}

interface DispatchProps {
	getUsers: (data: Fetch) => void;
	deleteUserCall: (data: Fetch) => void;
	notify: (data: GlobalNotification) => void;
}

export const Component = (
	props: OwnProps & WithTranslation & DispatchProps & StateProps
) => {
	const { deleteUserCall, getUsers, local, role, username } = props;
	const admin = role == UserRole.OrganizationAdmin ? true : false;
	const history = useHistory();
	useEffect(() => {
		getUsers({
			action: usersAction,
			method: Method.GET,
			url: ApiURL.USERS,
		});
	}, []);

	const removeUser = (username: string) => {
		deleteUserCall({
			action: deleteUser,
			method: Method.DELETE,
			param: username,
			actionsOnSuccess: [
				{
					action: usersAction,
					method: Method.GET,
					url: ApiURL.USERS,
				},
			],
			url: ApiURL.USERS,
		});
	};

	return (
		<Content>
			<ContentCard>
				<ContentSpaceBetweenWithPadding>
					<Header1>{t(translationPath(lang.common.title))}</Header1>
					{admin && <CreateAccount />}
				</ContentSpaceBetweenWithPadding>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={local ? props.pendingLocal : props.pendingCloud}
					margin
				>
					<CardMiddleTableWrapper>
						<ScrollableTable
							height={600}
							headers={[
								t(translationPath(lang.common.username)),
								t(translationPath(lang.common.email)),
								t(translationPath(lang.common.phone)),
								t(translationPath(lang.common.fullName)),
								t(translationPath(lang.common.account.role)),
								t(translationPath(lang.common.actions)),
							]}
							data={
								props.users
									? props.users?.map((user: UserData, key: number) => [
											user.Username,
											user.Email,
											user.PhoneNumber,
											user.Name + " " + user.Surname,
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
