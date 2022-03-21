import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import { Button } from '../../../../components/Optimify/Button';
import { device } from '../../../../constants/theme';
import carousel1 from '../../../../img/carousel/carousel1.jpg';
import { lang, t, WithTranslation, withTranslation } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useWindowSize } from '../../../../utils/windowSize';

const Index = ( _props: WithTranslation ) => {
	const size = useWindowSize();

	const openFineUrl = ( link?: string ) => (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require( "electron" );
		shell.openExternal( link );
	};

	const carousels = [
		{
			path: carousel1,
			title: `${ t( translationPath( lang.carousel.title3 ) ) }`,
			text: `${ t( translationPath( lang.carousel.text3 ) ) }`,
			link: `${ t( translationPath( lang.carousel.link3 ) ) }`,
			linkText: `${ t( translationPath( lang.carousel.linkText3 ) ) }`,
		}
	];

	return (
		<Carousel
			className="presentation-mode"
			showThumbs={false}
			showStatus={false}
			emulateTouch
			useKeyboardArrows={true}
			stopOnHover={false}
			interval={10000}
			showIndicators={true}
			transitionTime={1000}
			autoPlay={true}
			infiniteLoop={true}
		>
			{carousels.map( ( value, index ) => (
				<div
					className="my-slide primary"
					style={{
						height: size.height + 1,
						backgroundImage: `linear-gradient(to bottom, rgba(118, 172, 239, 0.52), rgba(64, 141, 232, 0.73)),url(${ value.path }) `,
						backgroundSize: "cover",
					}}
					key={index}
				>
					<CarouselContent>
						<CarouselTitle>{value.title}</CarouselTitle>
						<CarouselText>{value.text}</CarouselText>
						<CarouselLink href={value.link} target="_blank">
							{value.linkText && (
								<Button
									level={1}
									type={"submit"}
									onClick={openFineUrl( value.link )}
								>
									{value.linkText}
								</Button>
							)}
						</CarouselLink>
					</CarouselContent>
				</div>
			) )}
		</Carousel>
	);
};

export default withTranslation()( Index );

export const CarouselContent = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	padding: 2rem calc(20% + 500px) 2rem 4rem;
	color: white;
	text-align: left;

	@media ${ device.medium } {
		display: none;
	}
`;

export const CarouselTitle = styled.h1`
	font-weight: 900;
	font-size: 2rem;
	padding: 0.7rem 0rem;
	margin: 0;
	text-align: left;
	text-shadow: 0 0 80px #000000, 0 0 40px #000000, 0 0 20px rgba(0, 0, 0, 0.5);
`;

export const CarouselText = styled.p`
	font-weight: 400;
	font-size: 1.5rem;
	padding: 1rem 0rem;
	margin: 0;
	text-align: left;
	text-shadow: 0 0 60px #000000, 0 0 30px #000000, 0 0 15px rgba(0, 0, 0, 0.5);
`;

export const CarouselLink = styled.a`
	font-weight: 200;
	font-size: 1.2rem;
	text-decoration: none;
	margin-top: 10px;
	text-align: left;
`;
