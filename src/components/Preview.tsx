import { useEffect, useRef } from "react";
import styles from "./Preview.module.css";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframRef = useRef<HTMLIFrameElement>(null);

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="root" />
    <script>
      window.addEventListener('message', (event) => {
        if (event.origin !== "http://localhost:3000") {
          alert('fail');
          return;
        };
        eval(event.data);
      });
    </script>
  </body>
  </html>
  `;

  useEffect(() => {
    const post = setTimeout(() => {
      iframRef.current?.contentWindow?.postMessage(code, "*");
    }, 50);

    return () => clearTimeout(post);
  }, [code]);

  return (
    <iframe
      title="iframe"
      ref={iframRef}
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
