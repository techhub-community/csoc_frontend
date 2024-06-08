import React, { useState } from 'react';

const AutoSuggest = ({ suggestions, placeholder, onChange, value, color, readOnly }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    onChange(e);

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  const handleSuggestionClick = (e) => {
    onChange({ target: { value: e.target.innerText } });
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === "Enter") {
      onChange({ target: { value: filteredSuggestions[activeSuggestionIndex] } });
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100); // delay to allow click events on suggestions
  };

  const handleFocus = () => {
    if (filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${color}`}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {showSuggestions && value && (
        <ul className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md shadow-lg bg-white z-10 transform transition-transform duration-300 ease-out hover:scale-105">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => {
              const suggestionClass =
                index === activeSuggestionIndex
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700";

              return (
                <li
                  key={index}
                  className={`px-3 py-2 cursor-pointer ${suggestionClass}`}
                  onMouseDown={handleSuggestionClick}
                >
                  {suggestion}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-gray-700">No suggestions available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
