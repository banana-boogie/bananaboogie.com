export function createKeywordRegex(keywords) {
  keywords = Array.isArray(keywords) ? keywords.join(",") : keywords;
  const splitKeywords = keywords.split(",").map((word) => `${word}\\b`); // \b is a word boundary;
  return new RegExp(`${splitKeywords.join("|")}`, "ig");
}
