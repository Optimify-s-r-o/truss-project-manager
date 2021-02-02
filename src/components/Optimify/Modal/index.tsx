import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import styled from 'styled-components';
import { Button, PlainButton } from '../Button';
import { ButtonsRow, Header1 } from '../../../constants/globalStyles';
import { translationPath } from '../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";

interface IOwnProps {
	button?: string;
	confirm: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	closeModal: () => void;
	description?: string;
	open: boolean;
	title?: string;
	modalChildren?: any;
	update?: boolean;
	sync?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export const Index = (props: IOwnProps & WithTranslation) => {
	const {
		button,
		closeModal,
		confirm,
		open,
		title,
		description,
		modalChildren,
		update,
		sync,
	} = props;

	const handleClose = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		closeModal();
	};

	return (
		<div>
			<PopUp
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<Fade in={open}>
					<Paper>
						<Header1>{title}</Header1>
						<p id="transition-modal-description">{description}</p>
						{modalChildren && <div>{modalChildren}</div>}
						{update ? (
							<ButtonsRow>
								<Button type="button" level={3} loading={false} onClick={sync}>
									{t(translationPath(lang.common.closeAndSync))}
								</Button>
							</ButtonsRow>
						) : (
							<ButtonsRow>
								<PlainButton type="button" level={3} onClick={handleClose}>
									{t(translationPath(lang.common.close))}
								</PlainButton>
								<Button
									type="button"
									level={3}
									loading={false}
									onClick={confirm}
								>
									{button
										? button
										: t(translationPath(lang.common.modalConfirm))}
								</Button>
							</ButtonsRow>
						)}
					</Paper>
				</Fade>
			</PopUp>
		</div>
	);
};

export const Paper = styled.div`
	background-color: ${(props) => props.theme.colors.background.content};
	box-shadow: ${(props) => props.theme.boxShadowSharp};
	padding: ${(props) => props.theme.padding};
`;

export const PopUp = styled(Modal)`
	&& {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export default withTranslation()(Index);
