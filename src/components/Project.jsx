import Button from './Button';
import useIcons from '../hooks/useIcons';

export default function Project({
	title,
	description,
	previewImage,
	githubUrl,
	liveUrl,
	tags,
	onPreviewClick,
}) {
	const icons = useIcons();

	const getTechnologyIcon = (tag) => {
		const iconMap = {
			JavaScript: icons.js,
			React: icons.react,
			CSS: icons.css,
			HTML: icons.html,
			PHP: icons.php,
			Electron: icons.electron,
			'Node.js': icons.node,
            Firebase: icons.firebase,
            Git: icons.git,
		};
		return iconMap[tag] || null;
	};

	return (
		<div className="project-card">
			{previewImage && (
				<div className="project-image" onClick={onPreviewClick}>
					<img src={previewImage} alt={`${title} preview`} />
					<div className="project-image-overlay">
                        <span className="project-image-zoom">{icons.zoom}</span>
					</div>
				</div>
			)}

			<div className="project-content">
				<h3 className="project-title">{title}</h3>
				<p className="project-description">{description}</p>

				{tags && tags.length > 0 && (
					<div className="project-technologies">
						{tags.map((tag, index) => (
							<div key={index} className="project-tag">
								{getTechnologyIcon(tag) && (
									<span className="project-tag-icon">
										{getTechnologyIcon(tag)}
									</span>
								)}
								<span className="project-tag-title">{tag}</span>
							</div>
						))}
					</div>
				)}

				<div className="project-actions">
					<Button
						content="GitHub"
						icon={icons.github}
						onClick={() => window.open(githubUrl, '_blank')}
					/>
					{liveUrl && (
						<Button
							content="Live Preview"
							icon={icons.externalLink}
							onClick={() => window.open(liveUrl, '_blank')}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
