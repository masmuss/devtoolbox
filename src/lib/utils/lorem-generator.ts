export const loremWords = [
	"lorem",
	"ipsum",
	"dolor",
	"sit",
	"amet",
	"consectetur",
	"adipiscing",
	"elit",
	"sed",
	"do",
	"eiusmod",
	"tempor",
	"incididunt",
	"ut",
	"labore",
	"et",
	"dolore",
	"magna",
	"aliqua",
	"enim",
	"ad",
	"minim",
	"veniam",
	"quis",
	"nostrud",
	"exercitation",
	"ullamco",
	"laboris",
	"nisi",
	"aliquip",
	"ex",
	"ea",
	"commodo",
	"consequat",
	"duis",
	"aute",
	"irure",
	"in",
	"reprehenderit",
	"voluptate",
	"velit",
	"esse",
	"cillum",
	"fugiat",
	"nulla",
	"pariatur",
	"excepteur",
	"sint",
	"occaecat",
	"cupidatat",
	"non",
	"proident",
	"sunt",
	"culpa",
	"qui",
	"officia",
	"deserunt",
	"mollit",
	"anim",
	"id",
	"est",
	"laborum",
	"at",
	"vero",
	"eos",
	"accusamus",
	"accusantium",
	"doloremque",
	"laudantium",
	"totam",
	"rem",
	"aperiam",
	"eaque",
	"ipsa",
	"quae",
	"ab",
	"illo",
	"inventore",
	"veritatis",
	"quasi",
	"architecto",
	"beatae",
	"vitae",
	"dicta",
	"explicabo",
	"nemo",
	"ipsam",
	"voluptatem",
	"quia",
	"voluptas",
	"aspernatur",
	"aut",
	"odit",
	"fugit",
	"consequuntur",
	"magni",
	"dolores",
	"ratione",
	"sequi",
	"nesciunt",
	"neque",
	"porro",
	"quisquam",
	"dolorem",
	"adipisci",
	"numquam",
	"eius",
	"modi",
	"tempora",
	"incidunt",
	"magnam",
	"quaerat",
	"aliquam",
	"quam",
	"nihil",
	"molestiae",
	"consequatur",
	"vel",
	"illum",
	"eu",
	"feugiat",
	"quo",
	"facilisis",
	"eros",
	"accumsan",
	"iusto",
	"odio",
	"dignissim",
	"blandit",
	"praesent",
	"luptatum",
	"zzril",
	"delenit",
	"augue",
	"te",
	"feugait",
	"facilisi",
	"nam",
	"liber",
	"cum",
	"soluta",
	"nobis",
	"eleifend",
	"option",
	"congue",
	"imperdiet",
	"doming",
	"placerat",
	"facer",
];

export const generateWord = () => {
	return loremWords[Math.floor(Math.random() * loremWords.length)];
};

export const generateSentence = (minWords = 4, maxWords = 18) => {
	const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
	const words = [];

	for (let i = 0; i < wordCount; i++) {
		words.push(generateWord());
	}

	// Capitalize first word
	words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

	return words.join(" ") + ".";
};

export const generateParagraph = (minSentences = 3, maxSentences = 7) => {
	const sentenceCount =
		Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
	const sentences = [];

	for (let i = 0; i < sentenceCount; i++) {
		sentences.push(generateSentence());
	}

	return sentences.join(" ");
};

export const generateLoremText = (type: string, count: number, startWithLorem: boolean) => {
	let result = "";

	switch (type) {
		case "words":
			const words = [];
			for (let i = 0; i < count; i++) {
				words.push(generateWord());
			}
			if (startWithLorem && words.length > 0) {
				words[0] = "Lorem";
				if (words.length > 1) words[1] = "ipsum";
			}
			result = words.join(" ");
			break;

		case "sentences":
			const sentences = [];
			for (let i = 0; i < count; i++) {
				sentences.push(generateSentence());
			}
			if (startWithLorem && sentences.length > 0) {
				sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
			}
			result = sentences.join(" ");
			break;

		case "paragraphs":
			const paragraphs = [];
			for (let i = 0; i < count; i++) {
				paragraphs.push(generateParagraph());
			}
			if (startWithLorem && paragraphs.length > 0) {
				paragraphs[0] =
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
			}
			result = paragraphs.join("\n\n");
			break;

		default:
			result = "Invalid type selected";
	}

	return result;
};
