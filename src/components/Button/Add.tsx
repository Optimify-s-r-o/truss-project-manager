import React from 'react';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IAdd {
	add: any;
	title?: string;
}

export const Add = ({ add, title }: IAdd) => {
	return (
		<IconButton
			type="button"
			iconOnly
			onClick={() => add(null)}
			loading={false}
		>
			<FontAwesomeIcon icon={faPlus as IconProp} color={"green"} />
		</IconButton>
	);
};
