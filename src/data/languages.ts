// Google Translate target language codes with a representative country/region flag.
// Some languages do not have a single national flag; the flag is a visual locale cue.
// Codes are ITU E.164 calling codes for the representative flag's country or territory.
// The UN flag represents Esperanto; +800 is the global Universal International Freephone code.
const callingCodes: Record<string, string> = {
	GE: '+995', ID: '+62', UG: '+256', DJ: '+253', ZA: '+27', GH: '+233', AL: '+355', ET: '+251',
	SA: '+966', AM: '+374', IN: '+91', RU: '+7', BO: '+591', AZ: '+994', PK: '+92', ML: '+223',
	BD: '+880', CI: '+225', ES: '+34', BY: '+375', ZM: '+260', PH: '+63', BA: '+387', FR: '+33',
	BG: '+359', MM: '+95', HK: '+852', IQ: '+964', GU: '+1', CN: '+86', TW: '+886', FM: '+691',
	UA: '+380', HR: '+385', CZ: '+420', DK: '+45', AF: '+93', SS: '+211', MV: '+960', MZ: '+258',
	NL: '+31', BT: '+975', GB: '+44', UN: '+800', EE: '+372', FO: '+298', FJ: '+679', FI: '+358',
	BJ: '+229', IT: '+39', SN: '+221', DE: '+49', GR: '+30', PY: '+595', HT: '+509', NG: '+234',
	US: '+1', IL: '+972', HU: '+36', BR: '+55', IS: '+354', IE: '+353', JM: '+1', JP: '+81',
	GL: '+299', KZ: '+7', KH: '+855', RW: '+250', CD: '+243', KR: '+82', SL: '+232', KG: '+996',
	LA: '+856', LV: '+371', VA: '+39', LT: '+370', KE: '+254', LU: '+352', MK: '+389', MG: '+261',
	MY: '+60', MT: '+356', GT: '+502', IM: '+44', NZ: '+64', MH: '+692', MN: '+976', MU: '+230',
	MX: '+52', ZW: '+263', NP: '+977', GN: '+224', NO: '+47', MW: '+265', AW: '+297', IR: '+98',
	PL: '+48', PT: '+351', PE: '+51', RO: '+40', BI: '+257', WS: '+685', CF: '+236', RS: '+381',
	SC: '+248', LK: '+94', SK: '+421', SI: '+386', SO: '+252', LS: '+266', SZ: '+268', SE: '+46',
	PF: '+689', TJ: '+992', MA: '+212', TR: '+90', TL: '+670', TH: '+66', ER: '+291', PG: '+675',
	TO: '+676', BW: '+267', TM: '+993', UZ: '+998', VN: '+84',
};

export const languages = `
🇬🇪|Abkhazian|ab
🇮🇩|Acehnese|ace
🇺🇬|Acoli|ach
🇩🇯|Afar|aa
🇿🇦|Afrikaans|af
🇬🇭|Akan|ak
🇦🇱|Albanian|sq
🇮🇩|Alur|alz
🇪🇹|Amharic|am
🇸🇦|Arabic|ar
🇦🇲|Armenian|hy
🇮🇳|Assamese|as
🇷🇺|Avaric|av
🇮🇳|Awadhi|awa
🇧🇴|Aymara|ay
🇦🇿|Azerbaijani|az
🇮🇩|Balinese|ban
🇵🇰|Baluchi|bal
🇲🇱|Bambara|bm
🇧🇩|Bangla|bn
🇨🇮|Baoulé|bci
🇷🇺|Bashkir|ba
🇪🇸|Basque|eu
🇮🇩|Batak Karo|btx
🇮🇩|Batak Simalungun|bts
🇮🇩|Batak Toba|bbc
🇧🇾|Belarusian|be
🇿🇲|Bemba|bem
🇮🇩|Betawi|bew
🇮🇳|Bhojpuri|bho
🇵🇭|Bikol|bik
🇧🇦|Bosnian|bs
🇫🇷|Breton|br
🇧🇬|Bulgarian|bg
🇷🇺|Buriat|bua
🇲🇲|Burmese|my
🇭🇰|Cantonese|yue
🇪🇸|Catalan|ca
🇵🇭|Cebuano|ceb
🇮🇶|Central Kurdish|ckb
🇬🇺|Chamorro|ch
🇷🇺|Chechen|ce
🇺🇬|Chiga|cgg
🇨🇳|Chinese (Simplified)|zh-CN
🇹🇼|Chinese (Traditional)|zh-TW
🇫🇲|Chuukese|chk
🇷🇺|Chuvash|cv
🇫🇷|Corsican|co
🇺🇦|Crimean Tatar|crh
🇭🇷|Croatian|hr
🇨🇿|Czech|cs
🇩🇰|Danish|da
🇦🇫|Dari|prs
🇸🇸|Dinka|din
🇲🇻|Divehi|dv
🇮🇳|Dogri|doi
🇲🇿|Dombe|dov
🇳🇱|Dutch|nl
🇲🇱|Dyula|dyu
🇧🇹|Dzongkha|dz
🇬🇧|English|en
🇺🇳|Esperanto|eo
🇪🇪|Estonian|et
🇬🇭|Ewe|ee
🇫🇴|Faroese|fo
🇫🇯|Fijian|fj
🇵🇭|Filipino|fil
🇫🇮|Finnish|fi
🇧🇯|Fon|fon
🇫🇷|French|fr
🇮🇹|Friulian|fur
🇸🇳|Fulani|ff
🇬🇭|Ga|gaa
🇪🇸|Galician|gl
🇺🇬|Ganda|lg
🇬🇪|Georgian|ka
🇩🇪|German|de
🇬🇷|Greek|el
🇵🇾|Guarani|gn
🇮🇳|Gujarati|gu
🇭🇹|Haitian Creole|ht
🇲🇲|Hakha Chin|cnh
🇳🇬|Hausa|ha
🇺🇸|Hawaiian|haw
🇮🇱|Hebrew|iw
🇵🇭|Hiligaynon|hil
🇮🇳|Hindi|hi
🇨🇳|Hmong|hmn
🇭🇺|Hungarian|hu
🇧🇷|Hunsrik|hrx
🇮🇩|Iban|iba
🇮🇸|Icelandic|is
🇳🇬|Igbo|ig
🇵🇭|Iloko|ilo
🇮🇩|Indonesian|id
🇮🇪|Irish|ga
🇮🇹|Italian|it
🇯🇲|Jamaican Patois|jam
🇯🇵|Japanese|ja
🇮🇩|Javanese|jw
🇲🇲|Jingpo|kac
🇬🇱|Kalaallisut|kl
🇮🇳|Kannada|kn
🇳🇬|Kanuri|kr
🇰🇿|Kazakh|kk
🇮🇳|Khasi|kha
🇰🇭|Khmer|km
🇷🇼|Kinyarwanda|rw
🇨🇩|Kituba|ktu
🇮🇳|Kokborok|trp
🇷🇺|Komi|kv
🇨🇩|Kongo|kg
🇮🇳|Konkani|gom
🇰🇷|Korean|ko
🇸🇱|Krio|kri
🇮🇶|Kurdish|ku
🇰🇬|Kyrgyz|ky
🇱🇦|Lao|lo
🇱🇻|Latgalian|ltg
🇻🇦|Latin|la
🇱🇻|Latvian|lv
🇮🇹|Ligurian|lij
🇳🇱|Limburgish|li
🇨🇩|Lingala|ln
🇱🇹|Lithuanian|lt
🇮🇹|Lombard|lmo
🇰🇪|Luo|luo
🇱🇺|Luxembourgish|lb
🇲🇰|Macedonian|mk
🇮🇩|Madurese|mad
🇮🇳|Maithili|mai
🇮🇩|Makasar|mak
🇲🇬|Malagasy|mg
🇲🇾|Malay|ms
🇲🇾|Malay (Arabic)|ms-Arab
🇮🇳|Malayalam|ml
🇲🇹|Maltese|mt
🇬🇹|Mam|mam
🇮🇳|Manipuri (Meitei Mayek)|mni-Mtei
🇮🇲|Manx|gv
🇳🇿|Māori|mi
🇮🇳|Marathi|mr
🇲🇭|Marshallese|mh
🇮🇳|Marwari|mwr
🇷🇺|Meadow Mari|chm
🇮🇩|Minangkabau|min
🇮🇳|Mizo|lus
🇲🇳|Mongolian|mn
🇲🇺|Morisyen|mfe
🇲🇽|Nahuatl (Eastern Huasteca)|nhe
🇿🇼|Ndau|ndc
🇳🇵|Nepalbhasa (Newari)|new
🇳🇵|Nepali|ne
🇬🇳|Nko|nqo
🇳🇴|Northern Sami|se
🇿🇦|Northern Sotho|nso
🇳🇴|Norwegian|no
🇸🇸|Nuer|nus
🇲🇼|Nyanja|ny
🇫🇷|Occitan|oc
🇮🇳|Odia|or
🇪🇹|Oromo|om
🇬🇪|Ossetic|os
🇵🇭|Pampanga|pam
🇵🇭|Pangasinan|pag
🇦🇼|Papiamento|pap
🇦🇫|Pashto|ps
🇮🇷|Persian|fa
🇵🇱|Polish|pl
🇵🇹|Portuguese|pt
🇵🇹|Portuguese (Portugal)|pt-PT
🇮🇳|Punjabi|pa
🇵🇰|Punjabi (Arabic)|pa-Arab
🇬🇹|Q'eqchi'|kek
🇵🇪|Quechua|qu
🇷🇴|Romanian|ro
🇷🇴|Romany|rom
🇧🇮|Rundi|rn
🇷🇺|Russian|ru
🇼🇸|Samoan|sm
🇨🇫|Sango|sg
🇮🇳|Sanskrit|sa
🇮🇳|Santali (Latin)|sat-Latn
🇬🇧|Scottish Gaelic|gd
🇷🇸|Serbian|sr
🇸🇨|Seselwa Creole French|crs
🇲🇲|Shan|shn
🇿🇼|Shona|sn
🇮🇹|Sicilian|scn
🇵🇱|Silesian|szl
🇵🇰|Sindhi|sd
🇱🇰|Sinhala|si
🇸🇰|Slovak|sk
🇸🇮|Slovenian|sl
🇸🇴|Somali|so
🇿🇦|South Ndebele|nr
🇱🇸|Southern Sotho|st
🇪🇸|Spanish|es
🇮🇩|Sundanese|su
🇬🇳|Susu|sus
🇰🇪|Swahili|sw
🇸🇿|Swati|ss
🇸🇪|Swedish|sv
🇵🇫|Tahitian|ty
🇹🇯|Tajik|tg
🇲🇦|Tamazight|zgh
🇲🇦|Tamazight (Tifinagh)|zgh-Tfng
🇮🇳|Tamil|ta
🇹🇷|Tatar|tt
🇮🇳|Telugu|te
🇹🇱|Tetum|tet
🇹🇭|Thai|th
🇨🇳|Tibetan|bo
🇪🇷|Tigrinya|ti
🇳🇬|Tiv|tiv
🇵🇬|Tok Pisin|tpi
🇹🇴|Tongan|to
🇿🇦|Tsonga|ts
🇧🇼|Tswana|tn
🇮🇳|Tulu|tcy
🇲🇼|Tumbuka|tum
🇹🇷|Turkish|tr
🇹🇲|Turkmen|tk
🇷🇺|Tuvinian|tyv
🇷🇺|Udmurt|udm
🇺🇦|Ukrainian|uk
🇵🇰|Urdu|ur
🇨🇳|Uyghur|ug
🇺🇿|Uzbek|uz
🇿🇦|Venda|ve
🇮🇹|Venetian|vec
🇻🇳|Vietnamese|vi
🇵🇭|Waray|war
🇬🇧|Welsh|cy
🇳🇱|Western Frisian|fy
🇸🇳|Wolof|wo
🇿🇦|Xhosa|xh
🇷🇺|Yakut|sah
🇮🇱|Yiddish|yi
🇳🇬|Yoruba|yo
🇲🇽|Yucatec Maya|yua
🇲🇽|Zapotec|zap
🇿🇦|Zulu|zu
`.trim().split('\n').map((entry) => {
	const [flag, label, code] = entry.split('|');
	const region = Array.from(flag).map((character) => String.fromCharCode(character.codePointAt(0)! - 127397)).join('');
	return { flag, label, code, region, callingCode: callingCodes[region] };
});
