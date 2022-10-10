import { nanoid } from "@reduxjs/toolkit";
import { Cell } from "../state/documentSlice";

const data = [
  {
    type: "text",
    content:
      "# tWiki - A web-based IDE for dynamic code documentation\nThe days of writing static documentation are over. With tWiki, you can write JavaScript code and see it executed in your document without the need to `alt + tab` to *somewhere else*. Each document you create will consist of a number of editable units containing either your markup text or your code. As soon as you start writing, your code will be transpiled, bundled, and executed all within your browswer while the preview window neatly displays its result. As a matter of fact, this document itself was built with tWiki and is the very example of what tWiki can do!",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "code",
    content: `// Example
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.css";

const API = "https://picsum.photos/v2/list?limit=5&page=";

const Example = () => {
  const [data, setData] = useState(null);

  const fetchImages = async () => {
    setData(null);
    const random = Math.floor(Math.random() * 5 + 2);
    try {
      const res = await axios.get(API + random);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const rendered = data
    ? data.map((el) => (
        <figure
          key={el.id}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "initial",
            margin: "0",
          }}
        >
          <img
            className="image"
            src={el["download_url"]}
            alt="random"
            style={{ flex: "1", objectFit: "cover", maxHeight: "7.5rem" }}
          />
          <figcaption style={{ fontSize: "0.75rem", textAlign: "center" }}>
            by <cite>{el.author}</cite>
          </figcaption>
        </figure>
      ))
    : null;

  return (
    <div>
      {data && (
        <button className="button is-link is-outlined" onClick={fetchImages}>
          click to fetch images
        </button>
      )}
      {!data && (
        <button className="button is-loading">click to fetch images</button>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr)",
          gridAutoRows: "1fr",
          gridGap: "0.75rem",
          gridAutoFlow: "dense",
          marginTop: "1rem",
        }}
      >
        {rendered}
      </div>
    </div>
  );
};

show(<Example />)`,
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content: "## Feature Overview",
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
      "## Work with any npm package or CSS library\nOn tWiki, you can import and work with any npm packages or even CSS libraries, so you can start creating real-world code examples in your documentation. Simply, type in your favorite module loading syntaxes (e.g., CommonJS, ES6) in your code editor and the app will take care of the rest.",
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
      "## Custom, built-in functions\ntWiki also comes with custom, built-in functions in order to enhance your productivity and user experience. One such example is `show` function that allows you to print (or draw) whatever value or expression you pass in as an argument. The argument type ranges from a simple primitive value to complex React component with or without using the JSX syntax. tWiki is in active development and more custom functions are on the way.",
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
      "## Shared environment, so you don't have to repeat yourself\nThe code you write in each document lives in a shared environment, so that the variables that are declared in one unit can be referenced from another. At the same time, tWiki has made sure that what you display with the `show` function in one editable unit is not repeated in every unit that comes after it, which would be kind of jarring.",
    props: {
      height: 300,
      ratio: 0.5,
    },
  },
  {
    type: "text",
    content:
      "## Sign up to unlock the full array of features including save and load functionalities for your work.\nOr you can play with it [here](/demo).",
    props: {
      height: 300,
      ratio: 0.5,
      locked: true,
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

export const intro = normalizeDocumentData(
  data,
  "Introduction - August 29, 2022"
);
