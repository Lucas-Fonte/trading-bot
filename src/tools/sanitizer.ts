const sanitizer = {
  cleanHTMLFromNumber: (textWithHtml: string) => textWithHtml.replace(/[^0-9.,]+/g, ''),
};

export { sanitizer };
