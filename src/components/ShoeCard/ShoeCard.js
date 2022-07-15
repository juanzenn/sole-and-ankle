import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
	slug,
	name,
	imageSrc,
	price,
	salePrice,
	releaseDate,
	numOfColors,
}) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

	const flag = variant === "on-sale" ? "Sale" : "Just Released!";

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				<ImageWrapper>
					<Image alt="" src={imageSrc} />
				</ImageWrapper>
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price variant={variant}>{formatPrice(price)}</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
					{variant === "on-sale" && (
						<SalePrice>{formatPrice(salePrice)}</SalePrice>
					)}
				</Row>
				{variant !== "default" && <Flag variant={variant}>{flag}</Flag>}
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
	position: relative;
	text-decoration: none;
	color: inherit;
	flex: 1 1 340px;
`;

const Wrapper = styled.article`
	border-radius: 16px 16px 4px 4px;
	overflow: hidden;
`;

const ImageWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	width: 100%;
`;

const Row = styled.div`
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	margin-bottom: 6px;

	&:last-of-type {
		margin-bottom: 0;
	}
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
`;

const Price = styled.span`
	text-decoration: ${(p) => p.variant === "on-sale" && "line-through"};
	color: ${(p) => p.variant === "on-sale" && COLORS.gray["700"]};
`;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

const Flag = styled.span`
	position: absolute;
	top: 14px;
	right: -4px;
	font-size: ${14 / 16}rem;
	font-weight: 700;
	color: ${COLORS.white};
	padding: 8px 10px;
	border-radius: 2px;
	background-color: ${(p) =>
		p.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
`;

export default ShoeCard;
