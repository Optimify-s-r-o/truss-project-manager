import * as React from 'react';
import Dialog from '../../../../components/Dialog';
import styled from 'styled-components';
import { APP_VERSION } from 'src/constants/ipcConstants';
import { translationPath } from '../../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";

const Index = (_props: WithTranslation) => {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [version, setVersion] = React.useState("0.0.0");

	React.useEffect(() => {
		const electron = window.require("electron");
		electron.ipcRenderer.send(APP_VERSION);
		const fs = electron.remote.require("fs");
		electron.ipcRenderer.on(APP_VERSION, (event, text) => {
			setVersion(text?.version);
		});
	}, []);

	const eula = `
    <h2>End-User License Agreement (EULA) of <span class="app_name">Truss Project Manager</span></h2>

<p>This End-User License Agreement ("EULA") is a legal agreement between you and <span class="company_name">Optimify (s.r.o.)</span>.</p></p>

<p>This EULA agreement governs your acquisition and use of our <span class="app_name">Truss Project Manager</span> software ("Software") directly from <span class="company_name">Optimify (s.r.o.)</span> or indirectly through a <span class="company_name">Fine (s.r.o.)</span> authorized reseller or distributor (a "Reseller").</p>

<p>Please read this EULA agreement carefully before completing the installation process and using the <span class="app_name">Truss Project Manager</span> software. It provides a license to use the <span class="app_name">Truss Project Manager</span> software and contains warranty information and liability disclaimers.</p>

<p>If you register for a free trial of the <span class="app_name">Truss Project Manager</span> software, this EULA agreement will also govern that trial. By clicking "accept" or installing and/or using the <span class="app_name">Truss Project Manager</span> software, you are confirming your acceptance of the Software and agreeing to become bound by the terms of this EULA agreement.</p>

<p>If you are entering into this EULA agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority or if you do not agree with the terms and conditions of this EULA agreement, do not install or use the Software, and you must not accept this EULA agreement.</p>

<p>This EULA agreement shall apply only to the Software supplied by <span class="company_name">Optimify (s.r.o.)</span> herewith regardless of whether other software is referred to or described herein. The terms also apply to any <span class="company_name">Optimify (s.r.o.)</span> updates, supplements, Internet-based services, and support services for the Software, unless other terms accompany those items on delivery. If so, those terms apply.</p>

<h3>License Grant</h3>

<p><span class="company_name">Optimify (s.r.o.)</span> hereby grants you a personal, non-transferable, non-exclusive licence to use the <span class="app_name">Truss Project Manager</span> software on your devices in accordance with the terms of this EULA agreement.</p>

<p>You are permitted to load the <span class="app_name">Truss Project Manager</span> software (for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the <span class="app_name">Truss Project Manager</span> software.</p>

<p>You are not permitted to:</p>

<ul>
<li>Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things</li>
<li>Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose</li>
<li>Allow any third party to use the Software on behalf of or for the benefit of any third party</li>
<li>Use the Software in any way which breaches any applicable local, national or international law</li>
<li>use the Software for any purpose that <span class="company_name">Optimify (s.r.o.)</span> considers is a breach of this EULA agreement</li>
</ul>

<h3>Intellectual Property and Ownership</h3>

<p><span class="company_name">Optimify (s.r.o.)</span> shall at all times retain ownership of the Software as originally downloaded by you and all subsequent downloads of the Software by you. The Software (and the copyright, and other intellectual property rights of whatever nature in the Software, including any modifications made thereto) are and shall remain the property of <span class="company_name">Optimify (s.r.o.)</span>.</p>

<p><span class="company_name">Optimify (s.r.o.)</span> reserves the right to grant licences to use the Software to third parties.</p>

<h3>Termination</h3>

<p>This EULA agreement is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time upon written notice to <span class="company_name">Optimify (s.r.o.)</span>.</p>

<p>It will also terminate immediately if you fail to comply with any term of this EULA agreement. Upon such termination, the licenses granted by this EULA agreement will immediately terminate and you agree to stop all access and use of the Software. The provisions that by their nature continue and survive will survive any termination of this EULA agreement.</p>

<h3>Governing Law</h3>

<p>This EULA agreement, and any dispute arising out of or in connection with this EULA agreement, shall be governed by and construed in accordance with the laws of <span class="country">cz</span>.</p>
  `;

	const openFineUrl = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("https://fine.cz/");
	};

	const openDialogHelp = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("mailto:truss@fine.cz");
	};

	const openDialogTerm = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setOpen(true);
		setTitle(`${t(translationPath(lang.common.terms))}`);
		setMessage(`${t(translationPath(lang.common.termsText))}`);
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
					{t(translationPath(lang.common.terms))}
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
	color: ${(props) => props.theme.colors.secondaryText.hover};
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
	color: ${(props) => props.theme.colors.secondaryText.hover};
	cursor: pointer;
`;

export default withTranslation()(Index);
