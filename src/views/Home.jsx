import React from 'react';
import useLocale from '../hooks/useLocale';
import Button from '../components/Button';
import useIcons from '../hooks/useIcons';
import Technology from '../components/Technology';

export default function Home() {
    const locale = useLocale();
    const { download, js, react, php, electron, css, html, node, firebase } = useIcons();

	function renderText(text) {
		const parts = [];
		let lastIndex = 0;

		const regex = /\[([^\]]+)\]|(\n)/g;
		let match;

		while ((match = regex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				parts.push(text.slice(lastIndex, match.index));
			}

			if (match[1]) {
				parts.push(
					<span key={match.index} className="muted">
						{match[1]}
					</span>
				);
			} else if (match[2]) {
				parts.push(<br key={match.index} />);
			}

			lastIndex = regex.lastIndex;
		}

		if (lastIndex < text?.length) {
			parts.push(text?.slice(lastIndex));
		}

		return parts;
	}

	return (
		<>
			<h1>{renderText(locale.welcome)}</h1>
			<p>{renderText(locale.description)}</p>
			<Button
				icon={download}
				content={
					<a href="/cv.pdf" download>
						{locale.downloadCV}
					</a>
				}
			/>

			<h2>{locale.technologies}</h2>
			<div id="technologies">
				<Technology icon={js} title="JavaScript" />
				<Technology icon={react} title="React" />
				<Technology icon={php} title="PHP" />
				<Technology icon={electron} title="Electron" />
				<Technology icon={css} title="CSS" />
				<Technology icon={html} title="HTML" />
				<Technology icon={node} title="Node.js" />
				<Technology icon={firebase} title="Firebase" />
			</div>
		</>
	);
}
