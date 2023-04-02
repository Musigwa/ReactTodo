export const capitalize = (str: string): string =>
  str.replace(/(^\w{1})|(\.\s*\w{1})/g, (match: string) => match.toUpperCase());
