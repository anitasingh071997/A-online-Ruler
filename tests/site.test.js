import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

async function listHtml(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await listHtml(fullPath));
		else if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
	}
	return files;
}

function getAttributeValues(markup, tag, attribute) {
	const values = [];
	const tags = tag === '*' ? /<[a-z][^>]*>/gi : new RegExp('<' + tag + '\\b[^>]*>', 'gi');
	for (const element of markup.matchAll(tags)) {
		const pattern = new RegExp('\\b' + attribute + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i');
		const match = element[0].match(pattern);
		if (match) values.push(match[1] ?? match[2] ?? match[3]);
	}
	return values;
}

function decodeHtmlAttribute(value) {
	return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}

function resolveInternalTarget(href, sourceFile) {
	let url;
	const relativeSource = path.relative(dist, sourceFile).split(path.sep).join('/');
	const sourcePath = relativeSource === 'index.html'
		? '/'
		: relativeSource.endsWith('/index.html')
			? '/' + relativeSource.slice(0, -'index.html'.length)
			: '/' + relativeSource;
	try {
		url = new URL(decodeHtmlAttribute(href), 'https://aonlineruler.com' + sourcePath);
	} catch {
		return null;
	}
	if (!['aonlineruler.com', 'www.aonlineruler.com'].includes(url.hostname)) return null;

	const pathname = decodeURIComponent(url.pathname);
	const relative = pathname.replace(/^\/+/, '');
	const candidates = pathname.endsWith('/')
		? [path.join(dist, relative, 'index.html')]
		: path.extname(relative)
			? [path.join(dist, relative)]
			: [path.join(dist, relative, 'index.html'), path.join(dist, relative + '.html')];
	return { candidates, fragment: url.hash ? decodeURIComponent(url.hash.slice(1)) : '' };
}

test('the production build emits the full site and its primary routes', async () => {
	const htmlFiles = await listHtml(dist);
	assert.ok(htmlFiles.length >= 200, 'Expected at least 200 built pages, found ' + htmlFiles.length);

	for (const route of [
		'index.html',
		'about-us/index.html',
		'contact-us/index.html',
		'blog/index.html',
		'ruler/index.html',
		'calibration/index.html',
		'privacy-policy/index.html',
		'terms-and-conditions/index.html',
		'404.html',
		'500.html',
	]) {
		await assert.doesNotReject(readFile(path.join(dist, route)), 'Missing built route: ' + route);
	}
});

test('all generated HTML pages have unique IDs and valid internal links', async () => {
	const htmlFiles = await listHtml(dist);
	const documents = new Map();
	for (const file of htmlFiles) documents.set(file, await readFile(file, 'utf8'));

	const duplicateIds = [];
	const brokenLinks = [];
	for (const [file, markup] of documents) {
		const ids = getAttributeValues(markup, '*', 'id').map(decodeHtmlAttribute);
		const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
		if (repeated.length) duplicateIds.push(path.relative(dist, file) + ': ' + [...new Set(repeated)].join(', '));

		for (const href of getAttributeValues(markup, 'a', 'href')) {
			const target = resolveInternalTarget(href, file);
			if (!target) continue;
			const resolvedFile = target.candidates.find((candidate) => documents.has(candidate));
			if (!resolvedFile) {
				brokenLinks.push(path.relative(dist, file) + ' -> ' + href);
				continue;
			}
			if (target.fragment) {
				const targetMarkup = documents.get(resolvedFile);
				const targetIds = new Set(getAttributeValues(targetMarkup, '*', 'id').map(decodeHtmlAttribute));
				if (!targetIds.has(target.fragment)) brokenLinks.push(path.relative(dist, file) + ' -> ' + href + ' (missing #' + target.fragment + ')');
			}
		}
	}

	assert.deepEqual(duplicateIds, [], 'Duplicate IDs found:\n' + duplicateIds.slice(0, 30).join('\n'));
	assert.deepEqual(brokenLinks, [], 'Broken internal links found:\n' + brokenLinks.slice(0, 50).join('\n'));
});

test('primary page theme toggles expose accessible switch markup', async () => {
	for (const route of ['index.html', 'about-us/index.html', 'blog/index.html', 'ruler/index.html', 'calibration/index.html']) {
		const markup = await readFile(path.join(dist, route), 'utf8');
		assert.ok(/<button[^>]*class="[^"]*site-theme-switch[^"]*"[^>]*role="switch"[^>]*aria-checked="(?:true|false)"/i.test(markup), route + ' should have an accessible theme switch');
		assert.ok(/class="(?:site-theme-track|home-theme-switch-track)"[\s\S]*?class="(?:site-theme-thumb|home-theme-thumb)"/i.test(markup), route + ' should render the shared toggle track and thumb');
	}
});

test('header and footer navigation links render on primary page types', async () => {
	const cases = [
		['index.html', ['Popular Tools', 'About', 'Contact', 'FAQs'], ['About us', 'Privacy policy']],
		['about-us/index.html', ['Home', 'About', 'Contact'], ['Privacy policy', 'Terms &amp; conditions']],
		['blog/index.html', ['Home', 'Ruler', 'Calibration', 'About'], ['Ruler', 'Privacy']],
	];
	for (const [route, headerLabels, footerLabels] of cases) {
		const markup = await readFile(path.join(dist, route), 'utf8');
		for (const label of headerLabels) assert.ok(markup.includes('>' + label), route + ' is missing header link ' + label);
		for (const label of footerLabels) assert.ok(markup.includes(label), route + ' is missing footer link ' + label);
	}
});
