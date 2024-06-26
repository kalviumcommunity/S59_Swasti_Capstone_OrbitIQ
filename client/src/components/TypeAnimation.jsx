import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHTML, setIsHTML] = useState(false); // State to track if content is HTML

  useEffect(() => {
    // Check if text is HTML
    setIsHTML(text.startsWith("<"));

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <>
      {isHTML ? (
        <span dangerouslySetInnerHTML={{ __html: currentText }} />
      ) : (
        <span>{currentText}</span>
      )}
    </>
  );
};

export default Typewriter;