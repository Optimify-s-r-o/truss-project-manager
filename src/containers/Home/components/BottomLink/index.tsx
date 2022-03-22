import * as React from 'react';
import { APP_VERSION } from 'src/constants/ipcConstants';
import styled from 'styled-components';

import Dialog from '../../../../components/Dialog';
import { lang, t, WithTranslation, withTranslation } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';

const Index = ( _props: WithTranslation ) => {
	const [open, setOpen] = React.useState( false );
	const [title, setTitle] = React.useState( "" );
	const [message, setMessage] = React.useState( "" );
	const [version, setVersion] = React.useState( "0.0.0" );

	React.useEffect( () => {
		const electron = window.require( "electron" );
		electron.ipcRenderer.send( APP_VERSION );
		const fs = electron.remote.require( "fs" );
		electron.ipcRenderer.on( APP_VERSION, ( event, text ) => {
			setVersion( text?.version );
		} );
	}, [] );

	const eula = `
    <h2>${ t( translationPath( lang.common.disclaimerTitle ) ) }</h2>

<p>${ t( translationPath( lang.common.dislaimerParagraph1 ) ) }</p>

<p>${ t( translationPath( lang.common.dislaimerParagraph2 ) ) }</p>

<ul>
<li>${ t( translationPath( lang.common.disclaimerList1 ) ) }</li>
<li>${ t( translationPath( lang.common.disclaimerList2 ) ) }</li>
<li>${ t( translationPath( lang.common.disclaimerList3 ) ) }</li>
</ul>

<p>${ t( translationPath( lang.common.dislaimerParagraph3 ) ) }</p> `;

	const openFineUrl = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require( "electron" );
		shell.openExternal( "https://fine.cz/" );
	};

	const openDialogHelp = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require( "electron" );
		shell.openExternal( "mailto:truss@fine.cz" );
	};

	const openDialogTerm = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setOpen( true );
		setTitle( `${ t( translationPath( lang.common.terms ) ) }` );
		setMessage( `${ t( translationPath( lang.common.termsText ) ) }` );
	};

	const getVersion = () => {
		// const { app } = require("electron");
		// return app.getVersion();
		return "0.0.30";
	};

	return (
		<Container>
			<Inline>
				<LinkBottomStyled onClick={openDialogTerm}>
					{t( translationPath( lang.common.terms ) )}
				</LinkBottomStyled>
				{/* <LinkBottomStyled onClick={openDialogHelp}>
					{t(translationPath(lang.common.help))}
				</LinkBottomStyled>
				<LinkBottomStyled onClick={openFineUrl}>
					{t(translationPath(lang.common.products))}
				</LinkBottomStyled> */}
				<Dialog
					open={open}
					title={title}
					htmlMessage={eula}
					setOpen={setOpen}
				/>
			</Inline>
			<Version>v{version}</Version>
		</Container>
	);
};

const Version = styled.span`
	color: ${ ( props ) => props.theme.colors.secondaryText.hover };
	padding-top: 0.35em;
	font-size: 0.75em;
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Inline = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

const LinkBottomStyled = styled.div`
	text-decoration: underline;
	color: ${ ( props ) => props.theme.colors.secondaryText.hover };
	cursor: pointer;
`;

export default withTranslation()( Index );
