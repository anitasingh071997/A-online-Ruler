export const supportedLocales = ['en', 'hi', 'fr', 'es', 'ja', 'zh-CN', 'de', 'pt', 'ar', 'bn', 'ur'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const localeNames: Record<SupportedLocale, string> = {
	en: 'English',
	hi: 'हिन्दी',
	fr: 'Français',
	es: 'Español',
	ja: '日本語',
	'zh-CN': '简体中文',
	de: 'Deutsch',
	pt: 'Português',
	ar: 'العربية',
	bn: 'বাংলা',
	ur: 'اردو',
};

export const localizedPageSlugs = new Set([
	'', 'ruler', 'calibration', 'about-us', 'contact-us', 'privacy-policy', 'terms-and-conditions',
	'classroom-management-tools', 'random-tools', 'measurement', 'facebook-editor-utilities', 'emoji-symbols',
	'time-and-date', 'utilities', 'travel', 'text-tool', 'programming', 'lifestyle', 'blog',
]);

export function localizePath(pathname: string, locale: string) {
	const segments = pathname.split('/').filter(Boolean);
	if (supportedLocales.includes(segments[0] as SupportedLocale)) segments.shift();
	const page = segments.join('/');
	if (!localizedPageSlugs.has(page)) return locale === 'en' ? `/${page}` : `/${locale}/${page}`;
	if (locale === 'en') return page ? `/${page}` : '/';
	return page ? `/${locale}/${page}` : `/${locale}/`;
}
