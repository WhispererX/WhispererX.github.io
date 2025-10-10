import React, { useEffect } from 'react';

export default function ImagePopup({ isOpen, imageSrc, imageAlt, onClose }) {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
            document.querySelector('main').style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
            document.querySelector('main').style.overflowY = 'auto';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="image-popup-overlay" onClick={onClose}>
			<div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
				<button
					className="image-popup-close"
					onClick={onClose}
					aria-label="Close popup">
					×
				</button>
				<img src={imageSrc} alt={imageAlt} className="image-popup-img" />
			</div>
		</div>
	);
}
