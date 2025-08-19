import { useState } from "react";
import PropTypes from "prop-types";

const AnnotatedText = ({
  children,
  annotation,
  citationNumber = null,
  citationUrl = null,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleClick = () => {
    if (citationUrl) {
      window.open(citationUrl, "_blank");
    } else {
      setIsPinned(!isPinned);
    }
  };

  const shouldShowAnnotation = isHovered || isPinned;

  return (
    <span className="relative inline-block">
      <span
        className={`bg-white text-[#915EFF] cursor-pointer transition-all duration-300 hover:bg-gray-700/70 hover:text-white px-1 py-0.125 rounded font-medium border border-[#915EFF]/20 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {children}
        {citationNumber && (
          <sup
            className="text-xs font-bold ml-1 text-[#915EFF] hover:text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (citationUrl) {
                window.open(citationUrl, "_blank");
              }
            }}
          >
            {citationNumber}
          </sup>
        )}
      </span>

      {shouldShowAnnotation && (
        <div
          className="fixed bottom-24 right-8 z-[70] animate-fade-in max-w-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-[#915EFF]/50 rounded-lg p-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="text-gray-100 text-sm leading-relaxed flex-1">
                {citationNumber && (
                  <span className="font-bold text-[#915EFF] mr-2">
                    {citationNumber}.
                  </span>
                )}
                {annotation}
              </div>
              <div className="ml-3 flex flex-col gap-2">
                {citationUrl && (
                  <a
                    href={citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#915EFF] hover:text-white transition-colors duration-200 flex-shrink-0"
                    title="Open link"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
                {!citationUrl && (
                  <button
                    onClick={() => setIsPinned(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex-shrink-0"
                    title="Close"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};

AnnotatedText.propTypes = {
  children: PropTypes.node.isRequired,
  annotation: PropTypes.string.isRequired,
  citationNumber: PropTypes.number,
  citationUrl: PropTypes.string,
  className: PropTypes.string,
};

export default AnnotatedText;
