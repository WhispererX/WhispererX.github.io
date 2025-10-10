import React, { useState, useMemo } from 'react';
import Project from '../components/Project';
import ImagePopup from '../components/ImagePopup';
import Button from '../components/Button';
import useLocale from '../hooks/useLocale';

import CompassPreview from '../assets/preview/compass-preview.png';
import GideonPreview from '../assets/preview/gideon-preview.png';
import GmLitePreview from '../assets/preview/gm-lite-preview.png';
import LearnGmlPreview from '../assets/preview/learn-gml-preview.png';

export default function Projects() {
	const locale = useLocale();
	const [popupImage, setPopupImage] = useState(null);
	const [popupAlt, setPopupAlt] = useState('');
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const openImagePopup = (imageSrc, imageAlt) => {
		setPopupImage(imageSrc);
		setPopupAlt(imageAlt);
		setIsPopupOpen(true);
	};
	const closeImagePopup = () => {
		setIsPopupOpen(false);
		setPopupImage(null);
		setPopupAlt('');
	};

	const projectsData = [
		{
			id: 1,
			title: 'Compass',
			description:
				'a League of Legends progress tracker app designed to help players monitor their in-game performance, track improvement over time, and gain insights into their gameplay.',
			previewImage: CompassPreview,
			githubUrl: 'https://github.com/WhispererX/lol-compass',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-10-08'),
		},
		{
			id: 2,
			title: 'GM Lite',
			description:
				'Lightweight feature-rich code editor built to enhance developer productivity for gamemaker projects.',
			previewImage: GmLitePreview,
			githubUrl: 'https://github.com/WhispererX/gm-lite',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-10-01'),
		},
		{
			id: 3,
			title: 'Gideon',
			description:
				'AI-powered desktop agent that automates everyday tasks, manages files, controls your system and integrates with services like Gmail, Calendar, etc.',
			previewImage: GideonPreview,
			githubUrl: 'https://github.com/WhispererX/gideon',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-09-10'),
		},
		{
			id: 4,
			title: 'Learn GML',
			description:
				'LearnGML is a comprehensive curriculum website designed to teach users how to create games with GameMaker.',
			previewImage: LearnGmlPreview,
			githubUrl: 'https://github.com/WhispererX/learn-gml',
			liveUrl: 'https://learngml.com',
			tags: ['HTML', 'CSS', 'React', 'JavaScript', 'Git'],
			date: new Date('2025-08-05'),
		},
		{
			id: 5,
			title: 'Projex',
			description:
				'Projex is a sleek and modern project management application designed to help teams and individuals organize, track, and complete tasks efficiently. With an intuitive interface and powerful features…',
			githubUrl: 'https://github.com/WhispererX/projex',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-07-28'),
		},
	];

	const [sortOrder, setSortOrder] = useState('desc');
	const [selectedTags, setSelectedTags] = useState([]);

	const allTags = useMemo(() => {
		const tagSet = new Set();
		projectsData.forEach((project) => {
			project.tags.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, []);

	const filteredAndSortedProjects = useMemo(() => {
		let filtered = projectsData;

		if (selectedTags.length > 0) {
			filtered = projectsData.filter((project) =>
				selectedTags.every((tag) => project.tags.includes(tag))
			);
		}

		filtered.sort((a, b) => {
			if (sortOrder === 'desc') {
				return b.date - a.date;
			} else {
				return a.date - b.date;
			}
		});

		return filtered;
	}, [selectedTags, sortOrder]);

	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const clearFilters = () => {
		setSelectedTags([]);
	};

	return (
		<>
			{!locale._meta.loading && !locale._meta.error && (
				<>
					<h1>{locale.projects}</h1>

					<div className="projects-controls">
						<label>
							{locale.sort}:
							<select
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}>
								<option value="desc">{locale.newestFirst}</option>
								<option value="asc">{locale.oldestFirst}</option>
							</select>
						</label>

						<div>
							<div className="filter-tags">
								{allTags.map((tag) => (
									<button
										key={tag}
										className={`filter-tag ${
											selectedTags.includes(tag) ? 'active' : ''
										}`}
										onClick={() => toggleTag(tag)}>
										{tag}
									</button>
								))}
								{selectedTags.length > 0 && (
									<Button onClick={clearFilters} content="Clear filters" />
								)}
							</div>
						</div>
					</div>

					<div className="projects-grid">
						{filteredAndSortedProjects.map((project) => (
							<Project
								key={project.id}
								title={project.title}
								description={project.description}
								previewImage={project.previewImage}
								githubUrl={project.githubUrl}
								liveUrl={project.liveUrl}
								tags={project.tags}
								date={project.date}
								onPreviewClick={() =>
									openImagePopup(
										project.previewImage,
										`${project.title} preview`
									)
								}
							/>
						))}
					</div>

					{filteredAndSortedProjects.length === 0 && (
						<div
							style={{
								textAlign: 'center',
								padding: '2rem',
								color: 'var(--color-muted)',
							}}>
							<p>{locale.noProjectsFound}</p>
						</div>
					)}

					<ImagePopup
						isOpen={isPopupOpen}
						imageSrc={popupImage}
						imageAlt={popupAlt}
						onClose={closeImagePopup}
					/>
				</>
			)}
		</>
	);
}
