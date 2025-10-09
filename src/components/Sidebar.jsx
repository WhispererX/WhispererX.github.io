import React from 'react';
import useLocale from '../hooks/useLocale';
import useIcons from '../hooks/useIcons';
import { NavLink } from 'react-router';
import ProfilePicture from '../assets/profile.jpg';
import { getLanguage, setLanguage } from '../hooks/useLocale';

export default function Sidebar() {
	const [theme, setTheme] = React.useState('dark');

	const locale = useLocale();
	const {
		house,
		projects,
		about,
		contact,
		darkMode,
		lightMode,
		translate,
		github,
		linkedin,
		instagram,
		twitter,
	} = useIcons();

	const [themeIcon, setThemeIcon] = React.useState(darkMode);

	React.useEffect(() => {
		document.body.className = theme;
		localStorage.setItem('theme', theme);
		setThemeIcon(theme === 'dark' ? darkMode : lightMode);
	}, [theme]);

	React.useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			const prefersDark =
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches;
			setTheme(prefersDark ? 'dark' : 'light');
		}
	}, []);

	React.useEffect(() => {
		const themeSelect = document.getElementById('themeSelect');
		if (themeSelect) {
			themeSelect.value = theme;
			themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
		}

		const languageSelect = document.getElementById('languageSelect');
		if (languageSelect) {
			languageSelect.value = getLanguage();
			languageSelect.addEventListener('change', (e) =>
				setLanguage(e.target.value)
			);
		}

		return () => {
			if (themeSelect) {
				themeSelect.removeEventListener('change', (e) =>
					setTheme(e.target.value)
				);
			}

			if (languageSelect) {
				languageSelect.removeEventListener('change', (e) =>
					setLanguage(e.target.value)
				);
			}
		};
	}, [theme]);

	return (
		<div id="sidebarContainer">
			<div id="sidebarHeader">
				<img src={ProfilePicture} alt="Profile" id="profileImage" />
				<span id="profileName">Herkus Žilaitis</span>
				<span id="profileTitle">{locale.profileTitle}</span>
			</div>
			<ul className="sidebarLinks">
				<SidebarItem icon={house} content={locale.home} href="/" />
				<SidebarItem icon={about} content={locale.about} href="/about" />
				<SidebarItem icon={projects} content={locale.projects} href="/projects" />
				<SidebarItem icon={contact} content={locale.contact} href="/contact" />
			</ul>
			<span className="sidebarDivider">{locale.settings}</span>
			<ul className="sidebarLinks">
				<SidebarItem
                    icon={themeIcon}
                    is_setting="true"
					content={
						<select id="themeSelect">
							<option value="light">{locale.lightMode}</option>
							<option value="dark">{locale.darkMode}</option>
						</select>
					}
					href="#"
				/>
				<SidebarItem
                    icon={translate}
                    is_setting="true"
					content={
						<select id="languageSelect">
							<option value="en">{locale.english}</option>
							<option value="lt">{locale.lithuanian}</option>
							<option value="ru">{locale.russian}</option>
						</select>
					}
					href="#"
				/>
			</ul>
			<span className="sidebarDivider">{locale.socialMedia}</span>
			<ul className="sidebarLinks">
				<SidebarItem
					icon={github}
					content="GitHub"
					href="https://github.com"
					external
				/>
				<SidebarItem
					icon={linkedin}
					content="LinkedIn"
					href="https://linkedin.com"
					external
				/>
				<SidebarItem
					icon={instagram}
					content="Instagram"
					href="https://instagram.com"
					external
				/>
				<SidebarItem
					icon={twitter}
					content="Twitter"
					href="https://twitter.com"
					external
				/>
			</ul>
		</div>
	);
}

function SidebarItem({ icon, content, href, external = false, ...props }) {
	const { externalLink } = useIcons();

	return (
		<li className="sidebarItem" {...props}>
			<NavLink
				to={href}
				className={({ isActive }) => (isActive ? 'active' : '')}
				target={external ? '_blank' : '_self'}
				rel={external ? 'noopener noreferrer' : ''}>
				{icon}
				{content}
			</NavLink>

			{external && (
				<span className="externalLinkIcon" title="Open in new tab">
					{externalLink}
				</span>
			)}
		</li>
	);
}
