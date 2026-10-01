export const faqItems = [
	{ question: 'Can I use my phone as a ruler?', answer: 'Yes. Open the online ruler on your phone, choose a phone preset in the calibration card, and apply it. Swipe horizontally across the scale to see measurements beyond the screen width.' },
	{ question: 'Is there a ruler online?', answer: 'Yes. This free online ruler runs in a web browser and offers inch, centimeter, and pixel settings, with millimeter divisions on the centimeter scale.' },
	{ question: 'How to identify 1 inch?', answer: 'After calibrating, switch the ruler to inches. The distance from 0 to the mark labeled 1 is one inch, equal to 2.54 centimeters. Check the display against a physical ruler for actual-size accuracy.' },
	{ question: 'How to measure cm online?', answer: "Calibrate your screen, select cm, and line up the object's starting edge with 0. Read the numbered centimeter marks, then count the small divisions; each small division is 1 mm, or 0.1 cm." },
	{ question: 'Can a smartphone measure?', answer: 'A smartphone can show an on-screen ruler for measuring small objects beside its display. Calibrate the phone first; browser and screen differences mean the result is an estimate until checked against a known reference.' },
	{ question: 'Can a smart phone measure?', answer: 'Yes. A smart phone can measure short objects with an on-screen ruler. Calibrate the display first, align one end with zero, and verify close measurements against a physical ruler.' },
	{ question: 'Can I use my camera as a ruler?', answer: 'This tool does not use the camera. It displays a ruler on the screen instead, so you can align an object beside the scale without granting camera access.' },
	{ question: 'Can we measure online?', answer: 'Yes. Use a browser ruler for quick length checks: calibrate the display, align the object with zero, and read its endpoint. Confirm precision measurements with a physical ruler or caliper.' },
	{ question: 'How to read a ruler online?', answer: 'Start at zero and read the mark where the object\'s other edge ends. Larger numbered marks show centimeters or inches; on the centimeter scale, each of ten small divisions equals one millimeter.' },
	{ question: 'How to view ruler in Word Online?', answer: "Open your document and choose View, then Ruler. This shows Word's page-layout ruler for document formatting. It is separate from an on-screen ruler for measuring physical objects." },
	{ question: 'How to add a ruler on Word Online?', answer: 'Word for the web displays its ruler from View > Ruler; it is a layout aid rather than an object inserted into the document. For an actual-size screen scale, use this online ruler and calibrate your display.' },
	{ question: 'How to show a ruler in PowerPoint Online?', answer: "PowerPoint for the web does not currently display rulers or gridlines. It uses smart guides to help align slide objects. To use PowerPoint's rulers, open the presentation in the desktop app and select View > Ruler." },
	{ question: 'How to use online ruler?', answer: 'Choose centimeters or inches, calibrate with a screen preset or standard card, and place the object beside the zero mark. Swipe across the ruler on a phone to reach the full scale; use a physical tool to verify close tolerances.' },
	{ question: 'How to add ruler in Word Online?', answer: 'In Word Online, open the View menu and turn on Ruler. That ruler formats the document page; use this site separately when you need to measure a physical object on your screen.' },
	{ question: 'How to use a ruler online?', answer: 'Open the ruler workspace, select cm, in, or px, calibrate your display, and align the object with the zero mark. Read the endpoint on the scale and verify precision work with a physical tool.' },
];

export const faqStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqItems.map(({ question, answer }) => ({
		'@type': 'Question',
		name: question,
		acceptedAnswer: { '@type': 'Answer', text: answer },
	})),
};
