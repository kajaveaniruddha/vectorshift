import React, { useState, useEffect } from "react";
import { useStore } from "../store";

export const CustomInput = ({ value, onChange, onVariablesChange = () => {}, nodeId }) => {
  const [inputValue, setInputValue] = useState(value || "");
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

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    const variables = extractVariables(newValue);
    onVariablesChange(variables);
  };

  // Initial variable detection
  useEffect(() => {
    const variables = extractVariables(value);
    if (variables.length > 0) {
      onVariablesChange(variables);
    }
  }, []);

  return (
    <textarea
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter text with {{variables}}"
      className="w-full px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
        bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
        focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
        resize-none"
      style={{ minHeight: "2rem" }}
    />
  );
};
