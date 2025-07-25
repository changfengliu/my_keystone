export const toolbarOptions_Full = {
  formatting: {
    // To disable a specific feature you can simply omit it from the configuration.
    inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      // code: true,
      superscript: true,
      subscript: true,
      keyboard: true,
    },
    listTypes: {
      ordered: true,
      unordered: true,
    },
    alignment: {
      center: true,
      end: true,
    },
    headingLevels: [1, 2, 3, 4, 5, 6],
    blockTypes: {
      blockquote: true,
      code: true,
    },
    softBreaks: true,
  },
  links: true,
  dividers: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
  ],
};
