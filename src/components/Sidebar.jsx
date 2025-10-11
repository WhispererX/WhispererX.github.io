import React from 'react';
import useLocale from '../hooks/useLocale';
import useIcons from '../hooks/useIcons';
import { NavLink } from 'react-router';
import ProfilePicture from '../assets/profile.jpg';
import { getLanguage, setLanguage } from '../hooks/useLocale';
import FlagEn from '../assets/flag-en.png';
import FlagLt from '../assets/flag-lt.png';
import FlagRu from '../assets/flag-ru.png';

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

	const flags = {
		en: FlagEn,
		lt: FlagLt,
		ru: FlagRu,
	};

	const [themeIcon, setThemeIcon] = React.useState(darkMode);
	const [flagIcon, setFlagIcon] = React.useState(
		flags[getLanguage()] || FlagEn
	);

	const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
			languageSelect.addEventListener('change', (e) => {
				setFlagIcon(flags[e.target.value] || FlagEn);
				setLanguage(e.target.value);
			});
		}

		return () => {
			if (themeSelect) {
				themeSelect.removeEventListener('change', (e) =>
					setTheme(e.target.value)
				);
			}

			if (languageSelect) {
				languageSelect.removeEventListener('change', (e) => {
					setFlagIcon(flags[e.target.value] || FlagEn);
					setLanguage(e.target.value);
				});
			}
		};
	}, [theme]);

	return (
		<>
			<button
				className={`sidebar-toggle-btn${sidebarOpen ? ' open' : ''}`}
				onClick={() => setSidebarOpen((v) => !v)}
				aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
				{sidebarOpen ? '✕' : '☰'}
			</button>

			<div
				className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
				onClick={sidebarOpen ? () => setSidebarOpen(false) : undefined}
			/>
			<div id="sidebarContainer" className={sidebarOpen ? 'open' : ''}>
				<div id="sidebarHeader">
					<img src={ProfilePicture} alt="Profile" id="profileImage" />
					<span id="profileName">Herkus Žilaitis</span>
					<span id="profileTitle">{locale.profileTitle}</span>
				</div>
				<ul className="sidebarLinks">
					<SidebarItem
						icon={house}
						content={locale.home}
						href="./"
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={about}
						content={locale.about}
						href="./about"
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={projects}
						content={locale.projects}
						href="./projects"
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={contact}
						content={locale.contact}
						href="./contact"
						onClick={() => setSidebarOpen(false)}
					/>
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
						href="#">
						<img src={flagIcon} alt="Flag" className="flagIcon" />
					</SidebarItem>
				</ul>
				<span className="sidebarDivider">{locale.socialMedia}</span>
				<ul className="sidebarLinks">
					<SidebarItem
						icon={github}
						content="GitHub"
						href="https://github.com/WhispererX"
						external
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={linkedin}
						content="LinkedIn"
						href="https://www.linkedin.com/in/herkus-%C5%BEilaitis-004b8434a/"
						external
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={instagram}
						content="Instagram"
						href="https://www.instagram.com/herkus.zz/"
						external
						onClick={() => setSidebarOpen(false)}
					/>
					<SidebarItem
						icon={twitter}
						content="Twitter"
						href="https://x.com/WhispererMeta"
						external
						onClick={() => setSidebarOpen(false)}
					/>
				</ul>
			</div>
		</>
	);
}

function SidebarItem({
	icon,
	content,
	href,
	external = false,
	children,
	...props
}) {
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

			{children}

			{external && (
				<span className="externalLinkIcon" title="Open in new tab">
					{externalLink}
				</span>
			)}
		</li>
	);
}
