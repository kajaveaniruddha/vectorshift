import React, { useState, useEffect, useRef } from "react";
import { useStore } from "../store";

export const CustomInput = ({ value, onChange, onVariablesChange = () => {}, nodeId }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const textareaRef = useRef(null);
  const createInputNodeForVariable = useStore((state) => state.createInputNodeForVariable);

  const allowedVariables = ["input", "output", "llm"];

  const extractVariables = (text) => {
    if (!text) return [];
    const regex = /{{([^}]+)}}/g;
    const matches = text.match(regex) || [];
    const variables = matches
      .map((match) => match.slice(2, -2).trim())
      .filter((variable) => allowedVariables.includes(variable));
    console.log("Extracted variables:", variables);

    // Only create nodes for allowed variables
    variables.forEach((variable) => {
      if (nodeId) {
        // Only create if we have a valid nodeId
        createInputNodeForVariable(variable, nodeId, `${nodeId}-var-${variable}`);
      }
    });

    return [...new Set(variables)];
  };

  const adjustTextareaSize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.width = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      // Optionally, set max width for usability
      const minWidth = 240;
      const maxWidth = 480;
      textarea.style.width = Math.min(Math.max(textarea.scrollWidth, minWidth), maxWidth) + "px";
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    const variables = extractVariables(newValue);
    onVariablesChange(variables);
    adjustTextareaSize();
  };

  // Initial variable detection
  useEffect(() => {
    const variables = extractVariables(value);
    if (variables.length > 0) {
      onVariablesChange(variables);
    }
    adjustTextareaSize();
  }, []);

  useEffect(() => {
    adjustTextareaSize();
  }, [inputValue]);

  return (
    <textarea
      ref={textareaRef}
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter text with {{variables}}"
      className="w-full px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
        bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
        focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
        resize-none scrollbar-hide"
      style={{ minHeight: "2rem", minWidth: "240px", maxWidth: "480px", overflowY: 'hidden' }}
    />
  );
};
