import React from 'react';

const PaymentInput = ({ id, label, required, onChange }) => {
    return (
        <div className="grid gap-2">
            {label && <label htmlFor={id} className="block font-medium">{label}</label>}
            <input
                id={id}
                type="file"
                required={required}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded"
            />
        </div>
    );
};

export default PaymentInput;
