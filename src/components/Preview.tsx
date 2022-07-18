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
        try {
          eval(event.data);
        } catch (err) {
          const root = document.getElementById('root');
          root.innerHTML = '<div><h4 style="color: red; margin: 1em 0">Runtime Error</h4>' + err + '</div>';
          console.error(err);
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
    <div className={styles["preview-wrapper"]}>
      <iframe
        className={styles.preview}
        title="iframe"
        ref={iframRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
