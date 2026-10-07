export const infoPages = {
	'about-us': {
		title: 'About us',
		description: 'Learn about A Online Ruler, a simple browser-based measuring tool for inches, centimeters, millimeters, and pixels.',
		eyebrow: 'ABOUT A ONLINE RULER',
		intro: 'A practical, private, and easy-to-use screen ruler for quick measurements wherever you are.',
		sections: [
			{ heading: 'A simple tool for everyday measuring', paragraphs: ['A Online Ruler turns the screen you already have into a practical measuring aid. We built it for quick checks at home, in the classroom, at a workbench, or wherever a physical ruler is out of reach.'] },
			{ heading: 'Designed for clarity', paragraphs: ['The ruler supports centimeters, millimeters, inches, and pixels, with calibration options for common devices. There is no account to create and no software to install. Your calibration is kept in your browser so the tool stays ready when you return.'] },
			{ heading: 'Accuracy with context', paragraphs: ['Screens vary, so an on-screen ruler should be calibrated against a known object before you rely on a measurement. A Online Ruler explains that limitation clearly and recommends a physical ruler or caliper when a close tolerance matters.'] },
			{ heading: 'Our mission', paragraphs: ['We want useful browser tools to feel fast, accessible, and honest. We will continue improving the ruler and creating focused utilities that solve small problems without adding unnecessary friction.'] },
		],
	},
	'contact-us': {
		title: 'Contact us',
		description: 'Contact A Online Ruler with questions, calibration feedback, accessibility suggestions, or website support requests.',
		eyebrow: 'GET IN TOUCH',
		intro: 'Tell us how we can make A Online Ruler more helpful.',
		sections: [
			{ heading: 'Questions and feedback', paragraphs: ['Have a question about calibration, a device, or how the ruler works? We welcome feedback that helps us make the tool clearer and more useful.'] },
			{ heading: 'Email us', paragraphs: ['For support, accessibility feedback, or website questions, email hello@aonlineruler.com. Include the page you were using, your device and browser, and a short description of the issue so we can investigate it efficiently.'] },
			{ heading: 'Before you write', paragraphs: ['If a measurement looks wrong, tell us which unit you selected, how you calibrated the screen, and whether browser zoom is set to 100%. For sensitive information, please do not include passwords, payment details, or other private data in your message.'] },
			{ heading: 'Response time', paragraphs: ['We read every message and aim to respond as soon as practical. A reply may take longer during busy periods.'] },
		],
	},
	'privacy-policy': {
		title: 'Privacy policy',
		description: 'Read the A Online Ruler privacy policy and learn how browser settings and technical information are handled.',
		eyebrow: 'YOUR PRIVACY',
		intro: 'We keep the ruler useful without asking for more information than the service needs.',
		sections: [
			{ heading: 'Information we collect', paragraphs: ['A Online Ruler is designed to work without an account. We do not ask you to submit your name, email address, or payment details to use the ruler. Calibration settings may be stored locally in your browser so the ruler can remember your setup on that device.', 'Our hosting provider may process standard technical information such as an IP address, browser type, device type, and request time to deliver and protect the website.'] },
			{ heading: 'How we use information', paragraphs: ['Technical information is used to operate, secure, and understand the performance of the website. We do not sell personal information or use ruler measurements to build a profile about you.'] },
			{ heading: 'Cookies and local storage', paragraphs: ['The ruler may use browser local storage for calibration preferences. You can clear this data through your browser settings. The site may also use essential technologies required for hosting and security.'] },
			{ heading: 'Third-party links', paragraphs: ['This website may link to services or resources operated by other organizations. Their privacy practices are governed by their own policies, so review those policies before sharing information.'] },
			{ heading: 'Changes to this policy', paragraphs: ['We may update this policy when the website or applicable requirements change. The latest version will always be published on this page.'] },
		],
	},
	'terms-and-conditions': {
		title: 'Terms and conditions',
		description: 'Review the terms for using A Online Ruler, including measurement accuracy, permitted use, and service availability.',
		eyebrow: 'TERMS OF USE',
		intro: 'These terms explain how you can use A Online Ruler and what to expect from an on-screen measuring tool.',
		sections: [
			{ heading: 'Using the service', paragraphs: ['You may use A Online Ruler for lawful personal, educational, and business purposes. Please use the website responsibly and do not interfere with its operation, attempt unauthorized access, or misuse automated requests.'] },
			{ heading: 'Measurement accuracy', paragraphs: ['The ruler is a browser-based visual aid. Display dimensions, browser zoom, device settings, and calibration affect the result. Measurements are estimates unless you verify the scale against a known reference. Use a physical ruler, caliper, or other suitable instrument for safety-critical, regulated, or close-tolerance work.'] },
			{ heading: 'Intellectual property', paragraphs: ['The website design, text, code, and branding belong to A Online Ruler or its licensors. You may access and use the service as intended, but you may not copy, republish, or redistribute substantial parts of it without permission.'] },
			{ heading: 'Availability and liability', paragraphs: ['We work to keep the service available and accurate, but it is provided as-is and may change or be unavailable from time to time. To the extent permitted by law, A Online Ruler is not responsible for losses resulting from reliance on an unverified screen measurement or interruption of the service.'] },
			{ heading: 'Updates to these terms', paragraphs: ['We may revise these terms as the service evolves. Continuing to use the website after an update means you accept the revised terms.'] },
		],
	},
} as const;

export type InfoPageSlug = keyof typeof infoPages;
