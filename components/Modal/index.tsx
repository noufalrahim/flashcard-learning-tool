import React, { useState } from 'react';

interface StaticModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (showModal: boolean) => void;
    setRefresh: any;
}

export default function StaticModal({ isModalOpen, setIsModalOpen, setRefresh }: StaticModalProps) {

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAdd = async () => {
        const name = (document.querySelector('input[placeholder="Subject Name"]') as HTMLInputElement).value;
        if(!name) {
            alert('Enter Subject Name to continue');
            return;
        }
        try {
            const response = await fetch('/api/addSubjects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                alert('Subject Added successfully');
                toggleModal();
            } else {
                alert('Failed to add Subject');
            }
        } catch (error) {
            console.error('Error adding Subject:', error);
        }

        setRefresh((prev: any) => !prev);
        
    }

    return (
        <>
            {/* Main modal */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                    aria-hidden="true"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Add Subject
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Subject Name"
                                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end flex">
                                <button
                                    onClick={handleAdd}
                                    type="button"
                                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
