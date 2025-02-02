const DEFAULT_THEME = 'dark';
const currentTheme = localStorage.getItem('theme') || DEFAULT_THEME;
const themeSelect = document.getElementById('themeSelect');

const VALID_THEMES = ['light', 'dark'];

const THEME_CLASSES = {
    light: 'light-mode',
    dark: 'dark-mode'
};


const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme, 'themeIcon');
};

themeSelect.addEventListener('change', handleThemeChange);

const setTheme = (theme, iconId) => {

    if (!isValidTheme(theme)) {
        console.log(`Invalid theme: ${theme}`);
        return;
    }

    document.documentElement.classList.remove(THEME_CLASSES.light, THEME_CLASSES.dark);
    document.documentElement.classList.add(theme + '-mode');
    localStorage.setItem('theme', theme);

    toggleThemeIcon(iconId, theme);
}

const toggleThemeIcon = (iconId, theme) => {
    const themeIcon = document.getElementById(iconId);

    if (!themeIcon) {
        console.log(`Theme icon element with id ${iconId} not found`);
        return;
    }

    themeIcon.classList.remove('bi-moon-fill', 'bi-sun-fill');
    if (theme === 'light') {
        themeIcon.classList.add('bi-sun-fill');
    } else {
        themeIcon.classList.add('bi-moon-fill');
    }
};

const cleanup = () => {
    themeSelect.removeEventListener('change', handleThemeChange);
};

const isValidTheme = (theme) => VALID_THEMES.includes(theme);

// Set the initial theme
if (isValidTheme(currentTheme)) {
    setTheme(currentTheme, 'themeIcon');
    themeSelect.value = currentTheme;
}