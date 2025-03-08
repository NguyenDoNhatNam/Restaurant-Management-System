import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-300 mb-4">
            <button onClick={toggleAccordion} className="w-full text-left font-bold text-lg flex justify-between py-2">
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="max-h-[150px] overflow-y-auto py-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
