import * as React from 'react';
import Active, { ActiveInterval } from '../../../../components/Active';
import Collapsible from 'react-collapsible';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { FilterSettings } from '../../../../types/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	FilterContent,
	FilterHeader,
	FilterHeaderIcon,
	FilterHeaderText,
	FilterSectionWrapper,
} from "./_styles";

interface OwnProps {
	formik: any;
	formikCheckboxes?: (string | number | symbol)[][];
	filter?: FilterSettings;
	filters?: any[];
	checkboxes?: (string | number | symbol)[][];
	children: React.ReactNode;
	input?: (string | number | symbol)[][];
	setting?: ActiveInterval[];
	skipCount?: number;
	title: string;
}

const FilterSection = (props: OwnProps) => {
	const [isOpen, setOpen] = React.useState<boolean>(false);
	return (
		<FilterSectionWrapper>
			<Collapsible
				onOpening={() => setOpen(true)}
				onClosing={() => setOpen(false)}
				easing={"ease-out"}
				overflowWhenOpen={"visible"}
				transitionTime={200}
				trigger={
					<FilterHeader>
						<FilterHeaderText>
							{props.title}
							<FilterHeaderIcon isOpen={isOpen}>
								<FontAwesomeIcon icon={faChevronDown as IconProp} />
							</FilterHeaderIcon>
						</FilterHeaderText>
						<Active
							filter={props.filter}
							formik={props.formik}
							formikCheckboxes={props.formikCheckboxes}
							checkboxes={props.checkboxes}
							input={props.input}
							name={props.filters}
							setting={props.setting}
							skipCount={props.skipCount}
						/>
					</FilterHeader>
				}
			>
				<FilterContent>{props.children}</FilterContent>
			</Collapsible>
		</FilterSectionWrapper>
	);
};

export default FilterSection;
