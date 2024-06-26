import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHTML, setIsHTML] = useState(false);

  useEffect(() => {
    setIsHTML(text.startsWith("<"));

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  const sanitized= isHTML ? DOMPurify.sanitize(currentText) : currentText;

  return (
    <>
      {isHTML ? (
        <span dangerouslySetInnerHTML={{ __html: sanitized}} />
      ) : (
        <span>{currentText}</span>
      )}
    </>
  );
};

export default Typewriter;