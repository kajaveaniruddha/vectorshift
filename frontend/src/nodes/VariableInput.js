import React, { useState, useEffect, useCallback } from 'react';

const VariableInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [variables, setVariables] = useState([]);

  const extractVariables = useCallback((text) => {
    const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
    const matches = [...(text?.matchAll(regex) || [])];
    const extracted = [...new Set(matches.map((match) => match[1].trim()))];
    // console.log("Extracted variables:", extracted); // Debugging
    return extracted;
  }, []);

  useEffect(() => {
    setInputValue(value || '');
    const extractedVars = extractVariables(value);
    setVariables(extractedVars);
    // console.log("Initial variables:", extractedVars); // Debugging
  }, [value, extractVariables]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    const extractedVars = extractVariables(newValue);
    setVariables(extractedVars);
    // console.log("Variables after change:", extractedVars); // Debugging

    if (newValue.includes('{{')) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectVariable = (variable) => {
    const newInputValue = inputValue + variable + "}}";
    setInputValue(newInputValue);
    onChange(newInputValue);
    setShowDropdown(false);
  };

  const suggestionList = ["input", "output", "llm"];

  return (
    <div className="relative">
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text with {{variables}}"
        className="w-full px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
          bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
          focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
          resize-none"
        style={{ height: 'auto', overflowY: 'hidden' }}
      />
      {showDropdown && (
        <div className="absolute left-0 mt-1 w-full bg-white border border-violet-200 rounded-md shadow-md z-20">
          {suggestionList.map((variable) => (
            <div
              key={variable}
              className="px-3 py-2 text-sm text-violet-700 hover:bg-violet-100 cursor-pointer"
              onClick={() => handleSelectVariable(variable)}
            >
              {variable}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariableInput;
