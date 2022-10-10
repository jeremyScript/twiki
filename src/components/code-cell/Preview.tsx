import { useEffect, useRef } from "react";
import styles from "./Preview.module.css";
import "./Preview.css";

interface PreviewProps {
  code: string;
  bundleStatus: string;
}

const Preview: React.FC<PreviewProps> = ({ code, bundleStatus }) => {
  const iframRef = useRef<HTMLIFrameElement>(null);

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      *,
      ::before,
      ::after {
        box-sizing: inherit;
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="root" />
    <script>
      const handleError = (err) => {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="margin: 1rem;"><h4 style="color: red;">Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        if (event.origin !== "https://twiki-f8461.web.app") {
          console.error('The target and recipient origins do not match');
          return;
        };
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      });
    </script>
  </body>
  </html>
  `;

  useEffect(() => {
    // To reset to iframe's initial content
    if (iframRef.current) {
      iframRef.current.srcdoc = html;
    }

    const post = setTimeout(() => {
      iframRef.current?.contentWindow?.postMessage(code, "*");
    }, 50);

    return () => clearTimeout(post);
  }, [code, html]);

  return (
    <div className="iframe-wrapper">
      <iframe
        className={styles.iframe}
        title="iframe"
        ref={iframRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundleStatus && (
        <div className={styles["bundling-error"]}>{bundleStatus}</div>
      )}
    </div>
  );
};

export default Preview;
