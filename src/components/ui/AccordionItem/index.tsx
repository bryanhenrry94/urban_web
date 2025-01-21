import { useState } from "react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full flex justify-between items-center py-4 px-6 text-left text-gray-800 font-semibold hover:bg-gray-100 focus:outline-none"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 text-gray-700 bg-gray-50">{children}</div>
      )}
    </div>
  );
};
