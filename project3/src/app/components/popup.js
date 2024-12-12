import React from 'react';

// This function defines popup. 
export default function Popup({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
                <p className="text-black text-lg mb-4">{message}</p>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 transition-colors" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
