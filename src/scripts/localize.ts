import { getTranslationMap, translateText } from '../data/siteTranslations';
import { localizedPageSlugs, supportedLocales } from '../data/locales';

const translatableAttributes = ['aria-label', 'title', 'placeholder', 'alt'];

function translateDynamic(source: string, locale: string) {
	const edge = /^(Top|Bottom|Left|Right) edge selected$/.exec(source);
	if (edge) return `${translateText(locale, edge[1]!)} ${({ fr: 'sélectionné', es: 'seleccionado', ja: 'を選択', 'zh-CN': '边缘已选择', de: 'ausgewählt', pt: 'selecionado', ar: 'محدد', bn: 'নির্বাচিত', ur: 'منتخب' } as Record<string, string>)[locale] ?? 'किनारा चुना गया'}`;
	const pixels = /^Browser sees ([\d,]+) screen pixels wide$/.exec(source);
	if (pixels) return ({ hi: `ब्राउज़र को स्क्रीन ${pixels[1]} पिक्सेल चौड़ी दिखती है`, fr: `Le navigateur détecte ${pixels[1]} pixels de largeur d’écran`, es: `El navegador detecta ${pixels[1]} píxeles de ancho de pantalla`, ja: `ブラウザーが検出した画面幅は${pixels[1]}ピクセルです`, 'zh-CN': '浏览器检测到屏幕宽度为 ' + pixels[1] + ' 像素', de: `Der Browser erkennt eine Bildschirmbreite von ${pixels[1]} Pixeln`, pt: `O navegador detecta ${pixels[1]} pixels de largura de tela`, ar: `يكتشف المتصفح عرض شاشة يبلغ ${pixels[1]} بكسل`, bn: `ব্রাউজার ${pixels[1]} পিক্সেল চওড়া স্ক্রিন শনাক্ত করেছে`, ur: `براؤزر کو اسکرین کی چوڑائی ${pixels[1]} پکسل نظر آتی ہے` } as Record<string, string>)[locale] ?? source;
	const scale = /^Your display scaling is ([\d.]+)×\. This means each browser pixel uses about ([\d.]+) physical screen pixels\. Choose your screen size below for a better estimate\.$/.exec(source);
	if (scale) return ({ hi: `आपकी डिस्प्ले स्केलिंग ${scale[1]}× है। इसका मतलब है कि हर ब्राउज़र पिक्सेल लगभग ${scale[2]} भौतिक स्क्रीन पिक्सेल इस्तेमाल करता है। बेहतर अनुमान के लिए नीचे अपनी स्क्रीन चुनें।`, fr: `La mise à l’échelle de l’écran est de ${scale[1]}×. Chaque pixel du navigateur utilise environ ${scale[2]} pixels physiques. Choisissez votre écran ci-dessous pour améliorer l’estimation.`, es: `La escala de pantalla es ${scale[1]}×. Cada píxel del navegador equivale a unos ${scale[2]} píxeles físicos. Elige tu pantalla abajo para mejorar la estimación.`, ja: `画面の拡大率は${scale[1]}×です。ブラウザーの1ピクセルは画面上の約${scale[2]}ピクセルに相当します。下から画面を選ぶと推定精度が上がります。`, 'zh-CN': `屏幕缩放比例为 ${scale[1]}×，每个浏览器像素约使用 ${scale[2]} 个物理屏幕像素。请在下方选择屏幕以获得更准确的估算。`, de: `Die Bildschirm-Skalierung beträgt ${scale[1]}×. Jedes Browser-Pixel entspricht etwa ${scale[2]} physischen Bildschirmpixeln. Wählen Sie unten Ihren Bildschirm für eine genauere Schätzung.`, pt: `A escala da tela é ${scale[1]}×. Cada pixel do navegador corresponde a cerca de ${scale[2]} pixels físicos. Escolha sua tela abaixo para melhorar a estimativa.`, ar: `مقياس الشاشة هو ${scale[1]}×. يعادل كل بكسل في المتصفح نحو ${scale[2]} بكسل فعلي على الشاشة. اختر شاشتك أدناه لتحسين التقدير.`, bn: `আপনার স্ক্রিন স্কেল ${scale[1]}×। প্রতিটি ব্রাউজার পিক্সেল প্রায় ${scale[2]}টি বাস্তব স্ক্রিন পিক্সেলের সমান। আরও ভালো অনুমানের জন্য নিচে স্ক্রিন বেছে নিন।`, ur: `آپ کے ڈسپلے کی اسکیلنگ ${scale[1]}× ہے۔ ہر براؤزر پکسل تقریباً ${scale[2]} حقیقی اسکرین پکسلز استعمال کرتا ہے۔ بہتر اندازے کے لیے نیچے اپنی اسکرین منتخب کریں۔` } as Record<string, string>)[locale] ?? source;
	const profile = /^(.+) profile applied$/.exec(source);
	if (profile) return ({ hi: `${profile[1]} प्रोफ़ाइल लागू हुई`, fr: `Profil ${profile[1]} appliqué`, es: `Perfil ${profile[1]} aplicado`, ja: `プロファイル「${profile[1]}」を適用しました`, 'zh-CN': `已应用 ${profile[1]} 配置`, de: `Profil ${profile[1]} angewendet`, pt: `Perfil ${profile[1]} aplicado`, ar: `تم تطبيق الملف الشخصي ${profile[1]}`, bn: `${profile[1]} প্রোফাইল প্রয়োগ করা হয়েছে` } as Record<string, string>)[locale] ?? source;
	const measurement = /^Measurement at ([\d.]+) (cm|in|px)$/.exec(source);
	if (measurement) return ({ hi: `माप: ${measurement[1]} ${measurement[2]}`, fr: `Mesure : ${measurement[1]} ${measurement[2]}`, es: `Medida: ${measurement[1]} ${measurement[2]}`, ja: `測定値：${measurement[1]} ${measurement[2]}`, 'zh-CN': `测量值：${measurement[1]} ${measurement[2]}`, de: `Messung: ${measurement[1]} ${measurement[2]}`, pt: `Medida: ${measurement[1]} ${measurement[2]}`, ar: `القياس: ${measurement[1]} ${measurement[2]}`, bn: `পরিমাপ: ${measurement[1]} ${measurement[2]}` } as Record<string, string>)[locale] ?? source;
	const manual = /^Manual display estimate applied · ([\d.]+)″, ([\d:]+)$/.exec(source);
	if (manual) return ({ hi: `मैन्युअल डिस्प्ले अनुमान लागू · ${manual[1]}″, ${manual[2]}`, fr: `Estimation manuelle appliquée · ${manual[1]}″, ${manual[2]}`, es: `Estimación de pantalla aplicada · ${manual[1]}″, ${manual[2]}`, ja: `手動の画面推定を適用しました · ${manual[1]}″、${manual[2]}`, 'zh-CN': `已应用手动显示估算 · ${manual[1]}″，${manual[2]}`, de: `Manuelle Bildschirmschätzung übernommen · ${manual[1]}″, ${manual[2]}`, pt: `Estimativa manual da tela aplicada · ${manual[1]}″, ${manual[2]}`, ar: `تم تطبيق تقدير الشاشة اليدوي · ${manual[1]}″، ${manual[2]}`, bn: `ম্যানুয়াল ডিসপ্লে অনুমান প্রয়োগ হয়েছে · ${manual[1]}″, ${manual[2]}`, ur: `دستی ڈسپلے کا اندازہ لاگو ہوا · ${manual[1]}″، ${manual[2]}` } as Record<string, string>)[locale] ?? source;
	const applied = /^Display estimate applied · ([\d.]+)″, ([\d:]+)\. You can refine it with another method\.$/.exec(source);
	if (applied) return ({ hi: `डिस्प्ले अनुमान लागू · ${applied[1]}″, ${applied[2]}। आप दूसरे तरीके से इसे बेहतर कर सकते हैं।`, fr: `Estimation de l’écran appliquée · ${applied[1]}″, ${applied[2]}. Vous pouvez l’affiner avec une autre méthode.`, es: `Estimación de pantalla aplicada · ${applied[1]}″, ${applied[2]}. Puedes ajustarla con otro método.`, ja: `画面の推定値を適用しました · ${applied[1]}″、${applied[2]}。別の方法で調整できます。`, 'zh-CN': `已应用屏幕估算 · ${applied[1]}″，${applied[2]}。可使用其他方式进一步调整。`, de: `Bildschirmschätzung übernommen · ${applied[1]}″, ${applied[2]}. Sie können sie mit einer anderen Methode verfeinern.`, pt: `Estimativa da tela aplicada · ${applied[1]}″, ${applied[2]}. Você pode refiná-la com outro método.`, ar: `تم تطبيق تقدير الشاشة · ${applied[1]}″، ${applied[2]}. يمكنك تحسينه بطريقة أخرى.`, bn: `ডিসপ্লে অনুমান প্রয়োগ হয়েছে · ${applied[1]}″, ${applied[2]}। অন্য পদ্ধতিতে এটি আরও নির্ভুল করতে পারেন।`, ur: `ڈسپلے کا اندازہ لاگو ہوا · ${applied[1]}″، ${applied[2]}۔ آپ اسے کسی اور طریقے سے مزید بہتر کر سکتے ہیں۔` } as Record<string, string>)[locale] ?? source;
	return source;
}

function translateAttribute(value: string, locale: string, dictionary: Record<string, string>) {
	if (dictionary[value]) return dictionary[value]!;
	const shortcut = /^(.+) \(([A-Z])\)$/.exec(value);
	if (shortcut && dictionary[shortcut[1]!]) return `${dictionary[shortcut[1]!]} (${shortcut[2]})`;
	return translateDynamic(value, locale);
}

function localizeLinks(locale: string) {
	for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
		// Language menu links intentionally target a different locale. Do not
		// rewrite them to the current page locale along with ordinary navigation.
		if (anchor.hasAttribute('hreflang') || anchor.closest('.language-options')) continue;
		const href = anchor.getAttribute('href');
		if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
		const url = new URL(href, window.location.origin);
		const segments = url.pathname.split('/').filter(Boolean);
		if (supportedLocales.includes(segments[0] as (typeof supportedLocales)[number])) segments.shift();
		const page = segments.join('/');
		if (!localizedPageSlugs.has(page)) continue;
		url.pathname = locale === 'en' ? (page ? `/${page}` : '/') : (page ? `/${locale}/${page}` : `/${locale}/`);
		const localizedHref = `${url.pathname}${url.search}${url.hash}`;
		if (localizedHref !== href) anchor.setAttribute('href', localizedHref);
	}
}

export function localizeText(locale: string) {
	if (locale === 'en') return;
	const dictionary = getTranslationMap(locale);
	if (!Object.keys(dictionary).length) return;

	const translateNode = (node: Node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node as Text;
			if (!text.data.trim() || text.parentElement?.closest('script,style,noscript,code,pre,[data-no-translate]')) return;
			const leading = text.data.match(/^\s*/)?.[0] ?? '';
			const trailing = text.data.match(/\s*$/)?.[0] ?? '';
			const source = text.data.trim();
			const translated = dictionary[source] ?? translateDynamic(source, locale);
			// Avoid writing unchanged text back into the node. The MutationObserver
			// watches character data, so even fallback strings would otherwise
			// trigger another pass indefinitely and freeze the page.
			if (translated !== source) text.data = `${leading}${translated}${trailing}`;
			return;
		}
		if (node.nodeType !== Node.ELEMENT_NODE) return;
		const element = node as Element;
		if (element.matches('script,style,noscript,code,pre,[data-no-translate]')) return;
		for (const attribute of translatableAttributes) {
			const value = element.getAttribute(attribute);
			if (value) {
				const translated = translateAttribute(value, locale, dictionary);
				if (translated !== value) element.setAttribute(attribute, translated);
			}
		}
		for (const child of element.childNodes) translateNode(child);
	};

	translateNode(document.body);
	localizeLinks(locale);
	const translatedTitle = translateText(locale, document.title);
	if (translatedTitle !== document.title) document.title = translatedTitle;

	const observer = new MutationObserver((records) => {
		for (const record of records) {
			if (record.type === 'characterData' && record.target.parentElement?.closest('[data-localizing]')) continue;
			if (record.type === 'attributes' && record.target instanceof HTMLAnchorElement) localizeLinks(locale);
			for (const node of record.addedNodes) translateNode(node);
			if (record.type === 'characterData') translateNode(record.target);
		}
	});
	observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['href', ...translatableAttributes] });
}
