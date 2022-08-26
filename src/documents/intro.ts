import { nanoid } from "@reduxjs/toolkit";
import { Cell } from "../state/documentSlice";

const data = [
  {
    type: "text",
    content:
      "# tWiki - A web-based IDE for dynamic code documentation\nThe days of writing static documentation are over. With tWiki, you can write JS or TS code and execute it in your document without the need to `alt + tab` to *something else*. Each document you create will consist of a number of editable units or cells containing either your markup text or snippets of code. The code you write will be continuously transpiled, bundled, and executed all within your browswer while its result is displayed in the preview window.",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "code",
    content: "import React from 'react';\nimport 'bulma/css/bulma.css'; ",
    props: {
      height: 82,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content:
      "## Import any npm packages - even your favorite CSS libraries\nOn tWiki, working with packages or CSS libraries is made easy, so you can start creating real-world code examples in your documentation. Simply, type in the popular module loading syntaxes (e.g., CommonJS, ES6) in your code editor and the app will take care of the rest for you.",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "code",
    content: "show('Hello, World!'); ",
    props: {
      height: 60,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content:
      '## Custom, built-in functions\ntWiki also comes with custom, built-in functions in order to enhane your productivity and user experience. One such example is `show` function that allows you to print (or draw) whatever value or expression you pass in as an argument. The "type" of argument you can pass in ranges from a simple primitive value to a more complicated React component using JSX. tWiki is in active development and more custom functions are on the way.',
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "code",
    content: "const a = 123;\nshow('abc');",
    props: {
      height: 77,
      ratio: 0.5,
    },
  },
  {
    type: "code",
    content: "show(a);",
    props: {
      height: 60,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content:
      "## Shared environment, so you don't have to repeat yourself\nThe code you write lives in a shared environment, so that the variables that are declared in one cell can be referenced from another. At the same time, tWiki made sure that what you `show` in the preview window in one cell is not repeated in every cell that comes after it, which would be kind of jarring imo.",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content:
      "## Be sure to sign up to unlock the full array of features including save, load, and publish* functionalities for your work.\n* to be implemented.",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
];

function normalizeDocumentData(docData: any[], docTitle: string) {
  const did = nanoid();
  const title = docTitle;
  const order: string[] = [];
  const data: { [id: string]: Cell } = {};

  docData.forEach((cell) => {
    const id = nanoid();
    const { type, content, props } = cell;
    order.push(id);
    data[id] = {
      id,
      type,
      content,
      props,
    };
  });

  return {
    did,
    title,
    order,
    data,
  };
}

export const intro = normalizeDocumentData(data, "Introduction");
