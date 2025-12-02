'use client';

import { getColorHex } from './utils/colorUtils';

interface AttributeButtonProps {
  attributeKey: string;
  attributeTitle: string;
  option: {
    value: string;
    caption: string;
  };
  isSelected: boolean;
  isAvailable: boolean;
  isColor: boolean;
  onClick: () => void;
}

export default function AttributeButton({
  attributeKey,
  attributeTitle,
  option,
  isSelected,
  isAvailable,
  isColor,
  onClick,
}: AttributeButtonProps) {
  const colorHex = isColor ? getColorHex(option.value) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isAvailable}
      aria-pressed={isSelected}
      aria-label={`${attributeTitle}: ${option.caption}${!isAvailable ? ' (Out of stock)' : ''}`}
      className={`
        relative rounded-lg sm:rounded-xl border-2 transition-all 
        focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-orange-500
        ${isColor ? 'px-2 sm:px-3 py-2 sm:py-3' : 'px-3 sm:px-5 py-2 sm:py-3'}
        ${
          isSelected
            ? 'border-primary bg-primary text-white shadow-md scale-105'
            : isAvailable
              ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:scale-105'
              : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
        }
      `}
    >
      {isColor && colorHex ? (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-slate-200 shadow-sm flex-shrink-0"
            style={{ backgroundColor: colorHex }}
            aria-hidden="true"
          />
          <span className="text-xs sm:text-sm font-medium truncate">{option.caption}</span>
        </div>
      ) : (
        <span className="text-xs sm:text-sm font-medium">{option.caption}</span>
      )}
      
      {isSelected && (
        <span className="absolute -right-0.5 sm:-right-1 -top-0.5 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white shadow-sm">
          <svg
            className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}

      {!isAvailable && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-px w-full rotate-[-25deg] bg-slate-300"></span>
        </span>
      )}
    </button>
  );
}
