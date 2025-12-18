import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const IframePortal = ({ children, onLoad }) => {
  const iframeRef = useRef(null);
  const [iframeBody, setIframeBody] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument;
      setIframeBody(doc.body);
      onLoad?.(iframe);
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [onLoad]);

  return (
    <>
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
        }}
      />
      {iframeBody && createPortal(children, iframeBody)}
    </>
  );
};

export default IframePortal;
    