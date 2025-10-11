import React from 'react';
import useIcons from '../hooks/useIcons';

export default function Rating({ rating = 0, maxRating = 5 }) {
	const { starFull, starHalf, starEmpty } = useIcons();

	const clamped = Math.max(0, Math.min(rating, maxRating));
	const rounded = Math.round(clamped * 2) / 2;

	const fullCount = Math.floor(rounded);
	const hasHalf = rounded - fullCount === 0.5;

	const stars = Array.from({ length: maxRating }, (_, i) => {
		let icon;
		if (i < fullCount) {
			icon = starFull;
		} else if (i === fullCount && hasHalf) {
			icon = starHalf;
		} else {
			icon = starEmpty;
		}

		return (
			<span key={i} className="ratingStar">
				{icon}
			</span>
		);
	});

	return <div className="ratings">{stars}</div>;
}
