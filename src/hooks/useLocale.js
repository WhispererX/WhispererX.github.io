import { useState, useEffect } from 'react';

const AVAILABLE_LANGUAGES = ['en', 'lt', 'ru'];
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'portfolio_language';
const translationsCache = new Map();

//#region Helper Functions
export const getLanguage = () => {
	if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

	const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
	if (storedLanguage && AVAILABLE_LANGUAGES.includes(storedLanguage)) {
		return storedLanguage;
	}

	const browserLanguage = navigator.language?.split('-')[0];
	if (browserLanguage && AVAILABLE_LANGUAGES.includes(browserLanguage)) {
		return browserLanguage;
	}

	return DEFAULT_LANGUAGE;
};

export const setLanguage = (language) => {
	if (!AVAILABLE_LANGUAGES.includes(language)) {
		return false;
	}

	localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
	window.dispatchEvent(
		new CustomEvent('languageChange', { detail: { language } })
	);

	return true;
};

export const getAvailableLanguages = () => AVAILABLE_LANGUAGES;

const loadTranslations = async (language) => {
	if (translationsCache.has(language)) {
		return translationsCache.get(language);
	}

	try {
		const response = await fetch(`/locale/${language}.json`);
		if (!response.ok) {
			throw new Error(`Failed to load translations for language: ${language}`);
		}

		const translations = await response.json();
		translationsCache.set(language, translations);
		return translations;
	} catch (error) {
		console.error(`Error loading translations for ${language}:`, error);

		if (language !== DEFAULT_LANGUAGE) {
			return loadTranslations(DEFAULT_LANGUAGE);
		}

		return {};
	}
};
//#endregion

const useLocale = () => {
	const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
	const [translations, setTranslations] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const loadCurrentTranslations = async () => {
			setLoading(true);
			setError(null);

			try {
				const newTranslations = await loadTranslations(currentLanguage);

				if (isMounted) {
					setTranslations(newTranslations);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message);
					setLoading(false);
					setTranslations({});
				}
			}
		};

		loadCurrentTranslations();

		return () => {
			isMounted = false;
		};
	}, [currentLanguage]);

	useEffect(() => {
		const handleLanguageChange = (event) => {
			setCurrentLanguage(event.detail.language);
		};

		window.addEventListener('languageChange', handleLanguageChange);

		return () => {
			window.removeEventListener('languageChange', handleLanguageChange);
		};
	}, []);

	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.key === LANGUAGE_STORAGE_KEY && event.newValue) {
				setCurrentLanguage(event.newValue);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return {
		...translations,
		_meta: {
			currentLanguage,
			loading,
			error,
			availableLanguages: AVAILABLE_LANGUAGES,
			changeLanguage: setLanguage,
			isLanguageSupported: (lang) => AVAILABLE_LANGUAGES.includes(lang),
		},
	};
};

export default useLocale;
