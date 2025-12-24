import React, { useState, useMemo } from 'react';
import Project from '../components/Project';
import ImagePopup from '../components/ImagePopup';
import Button from '../components/Button';
import useLocale from '../hooks/useLocale';

import GideonPreview from '../assets/preview/gideon-preview.png';
import GmLitePreview from '../assets/preview/gm-lite-preview.png';
import LearnGmlPreview from '../assets/preview/learn-gml-preview.png';
import ProjexPreview from '../assets/preview/projex-preview.png';
import PixoPreview from '../assets/preview/pixo-preview.png';
import ChefAiPreview from '../assets/preview/chef-ai-preview.png';
import WhiNotePreview from '../assets/preview/whi-note-preview.png';

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
			title: 'GM Lite',
			description:
				'Lightweight feature-rich code editor built to enhance developer productivity for gamemaker projects.',
			previewImage: GmLitePreview,
			githubUrl: 'https://github.com/WhispererX/gm-lite',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-10-01'),
		},
		{
			id: 2,
			title: 'Gideon',
			description:
				'AI-powered desktop agent that automates everyday tasks, manages files, controls your system and integrates with services like Gmail, Calendar, etc.',
			previewImage: GideonPreview,
			githubUrl: 'https://github.com/WhispererX/gideon',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-09-10'),
		},
		{
			id: 3,
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
			id: 4,
			title: 'Projex',
			description:
				'Projex is a sleek and modern project management application designed to help teams and individuals organize, track, and complete tasks efficiently. With an intuitive interface and powerful features…',
			previewImage: ProjexPreview,
			githubUrl: 'https://github.com/WhispererX/projex',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-07-28'),
		},
		{
			id: 5,
			title: 'Pixo',
			description: "A powerful, feature-rich pixel art editor built with Electron and React, inspired by Aseprite's design and functionality.",
			previewImage: PixoPreview,
			githubUrl: 'https://github.com/WhispererX/pixo',
			tags: ['CSS', 'React', 'Electron', 'Git'],
			date: new Date('2025-12-20'),
		},
		{
			id: 6,
			title: 'Chef AI',
			description:
				'Chef AI is a personal cookbook app that lets you store your own recipes, manage your pantry, and cook with an AI chef that understands your ingredients and guides you step by step.',
			previewImage: ChefAiPreview,
			githubUrl: 'https://github.com/WhispererX/chef-ai',
			tags: ['React Native', 'Expo', 'Git'],
		},
		{
			id: 7,
			title: 'Whi Note',
			description:
				'A modern, feature-rich notes application built with React Native and Expo. Create, organize, and manage your notes with a clean, intuitive interface supporting both light and dark themes.',
			previewImage: WhiNotePreview,
			githubUrl: 'https://github.com/WhispererX/whi-note',
			tags: ['React Native', 'Expo', 'Git'],
		}
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
