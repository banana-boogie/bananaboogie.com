export function createKeywordRegex(keywords) {
  keywords = Array.isArray(keywords) ? keywords.join(",") : keywords;
  const splitKeywords = keywords.split(",").map((word) => `${word}\\b`); // \b is a word boundary;
  return new RegExp(`${splitKeywords.join("|")}`, "ig");
}

export function formatNumberWithCommas(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into whole and decimal parts
  const parts = numberString.split(".");
  const wholePart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : "";

  // Add commas and spaces every three digits in the whole part
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ", ");

  // Combine the formatted parts
  const formattedNumber = formattedWholePart + decimalPart;

  return formattedNumber;
}
