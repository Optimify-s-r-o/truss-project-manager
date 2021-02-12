import Collapsible from 'react-collapsible';
import lang from '../../../../translation/lang';
import React, { useEffect } from 'react';
import SectionsPanel from '../../../../components/Optimify/Panel/SectionsPanel';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SSpan } from '../../Sidebar/_styles';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface SectionProps {
	title: string;
	variables: Array<VariableProps>;
}

interface VariableProps {
	value: string;
	text: any;
	handleDoubleClick?: (variable: string) => void;
}

const VariablesBar = ({ variables, handleDoubleClick }: any) => {
	const { t } = useTranslation();
	const [sections, setSections] = React.useState<Array<SectionProps>>([]);

	const Variable = ({ value, text, handleDoubleClick }: VariableProps) => (
		<VariableBox
			onDoubleClick={(e) => handleDoubleClick(value)}
			draggable={true}
			onDragStart={(e) => {
				e.dataTransfer.setData("Text", value);
			}}
		>
			<Tooltip
				placement={"top"}
				title={t(translationPath(lang.quotations.description[text]).path)}
			>
				{t(translationPath(lang.quotations.variables[text]).path)}
			</Tooltip>
		</VariableBox>
	);

	useEffect(() => {
		if (!!variables) {
			const mapped = [];
			for (const [key, value] of Object.entries(variables)) {
				mapped.push({
					title: key,
					variables: (value as any)?.map((i) => {
						return { value: i.Value, text: i.Text };
					}),
				});
			}
			setSections(mapped);
		}
	}, [variables]);
	const [openSections, setOpenSections] = React.useState<Array<string>>([]);

	const setOpen = (sectionTitle: string) => {
		let newOpenSections = [...openSections];
		newOpenSections.push(sectionTitle);
		setOpenSections(newOpenSections);
	};

	const setClosed = (sectionTitle: string) => {
		let newOpenSections = [...openSections];
		newOpenSections.splice(openSections.indexOf(sectionTitle), 1);
		setOpenSections(newOpenSections);
	};

	return (
		<SectionsPanel
			direction="left"
			initialSize={300}
			minSize={200}
			maxSize={900}
			activeFilter={true}
		>
			<Bar>
				<VariablesTitle>
					{t(translationPath(lang.templates.variables).path)}
					<VariablesDescriptionIcon>
						<Tooltip
							title={t(translationPath(lang.templates.dragAndDrop).path)}
							placement={"left"}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
						</Tooltip>
					</VariablesDescriptionIcon>
				</VariablesTitle>
				{sections.map((section, key) => {
					return (
						<SectionWrapper>
							<Collapsible
								onOpening={() => setOpen(section.title)}
								onClosing={() => setClosed(section.title)}
								easing={"ease-out"}
								overflowWhenOpen={"visible"}
								transitionTime={200}
								trigger={
									<SectionHeader>
										<span>
											{" "}
											{t(
												translationPath(lang.quotations.section[section.title])
													.path
											)}
										</span>
										<CollapseArrow
											isOpen={openSections.includes(section.title)}
										>
											<FontAwesomeIcon icon={faChevronDown} />
										</CollapseArrow>
									</SectionHeader>
								}
								key={key}
							>
								<VariablesWrapper>
									{section.variables?.map((variable, i) => (
										<Variable
											key={i}
											value={variable.value}
											text={variable.text}
											handleDoubleClick={handleDoubleClick}
										/>
									))}
								</VariablesWrapper>
							</Collapsible>
						</SectionWrapper>
					);
				})}
			</Bar>
		</SectionsPanel>
	);
};

export default VariablesBar;

const VariablesTitle = styled.div`
	padding: 1rem 1.5rem;
	color: ${(props) => props.theme.colors.quotation.title};
	font-size: 1.2rem;
	font-weight: 600;
`;

const VariablesDescriptionIcon = styled.span`
	margin-left: 0.5rem;

	color: ${(props) => props.theme.colors.secondaryText.default};
	font-size: 1rem;
	font-weight: 400;
`;

const SectionWrapper = styled.div`
	border-top: 1px solid ${(props) => props.theme.colors.sectionsDivider};
	border-bottom: 1px solid ${(props) => props.theme.colors.sectionsDivider};
`;

const SectionHeader = styled.div`
	display: flex;

	padding: 0.75rem 1.5rem;

	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.9rem;
	font-weight: 600;

	cursor: pointer;

	span {
		flex-grow: 1;
	}
`;

const CollapseArrow = styled.div<{ isOpen: boolean }>`
	${(props) => (props.isOpen ? "transform: rotate(180deg)" : "")};

	transition: transform 0.2s ease-out;
`;

const VariablesWrapper = styled.div`
	padding: 0.5rem 0;

	border-top: 1px solid
		${(props) => props.theme.colors.background.secondaryMenu};
`;

const VariableBox = styled.div`
	margin: 0.25rem 1.5rem;
	padding: 0.75rem 1.5rem;

	border-radius: 3px;
	color: ${(props) => props.theme.colors.primary.active};
	font-size: 0.9rem;
	font-weight: 400;

	cursor: grab;
	transition: all 0.2s ease-out;

	&:hover {
		box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	}
`;

export const SideBar = styled.div`
	height: 100%;

	background-color: ${(props) => props.theme.colors.background.content};

	> *:nth-child(1) {
		display: flex;
		flex-direction: column;

		height: 100%;

		color: ${(props) => props.theme.colors.primaryText.default};

		> *:nth-child(1) {
			flex-grow: 1;

			overflow-y: auto;
		}
	}
`;

export const Bar = styled.div<{
	isFilterActive?: boolean;
}>`
	background-color: ${(props) => props.theme.colors.background.content};
	overflow-y: auto;
	overflow-x: hidden;
	border: ${(props) => (props.isFilterActive ? `1 px solid green` : `0`)};
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 2;

	ul {
		flex: 1 1 auto;
	}

	.ant-tree {
		background: transparent;
		color: ${(props) => props.theme.colors.primaryText.default};
		font-size: 1rem;
	}

	.ant-tree-title {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		height: 100%;
		width: 100%;
	}

	.ant-tree-node-content-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;

		height: 100%;
		width: 100%;
	}

	.ant-tree-treenode:not(.ant-tree-treenode-selected):hover::before {
		background-color: ${(props) =>
			props.theme.colors.background.secondaryMenu} !important;
	}

	.ant-tree-treenode-selected .ant-tree-switcher-line-icon,
	.ant-tree-treenode-selected .ant-tree-switcher-line-icon svg,
	.ant-tree-treenode-selected
		${SSpan},
		.ant-tree-treenode-selected
		${SSpan}
		svg {
		color: rgba(255, 255, 255, 0.75);
	}

	.ant-tree-switcher-line-icon,
	.ant-tree-switcher-line-icon svg {
		background: transparent !important;
		color: #6d6d6df2;
	}

	.ant-tree-switcher-leaf-line:before,
	.ant-tree-switcher-leaf-line:after {
		border-color: #6d6d6df2;
	}

	.ant-tree-treenode-selected .ant-tree-switcher-leaf-line:before,
	.ant-tree-treenode-selected .ant-tree-switcher-leaf-line:after {
		border-color: rgba(255, 255, 255, 0.75);
	}
`;
