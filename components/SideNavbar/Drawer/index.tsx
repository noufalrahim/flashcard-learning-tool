import React, { useState } from 'react';
import SideNavBar from '..';

interface DrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedSubjectId: number;
    setSelectedSubjectId: (id: number) => void;
    subjects: any;
}

function Drawer({ isOpen, setIsOpen,
    selectedSubjectId,
    setSelectedSubjectId,
    subjects
}: DrawerProps) {

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id="drawer-example"
            className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform w-80 bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            tabIndex={-1}
            aria-labelledby="drawer-label"
        >

            <button
                type="button"
                onClick={toggleDrawer}
                aria-controls="drawer-example"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className='mt-10'>
                <SideNavBar
                    selectedSubjectId={selectedSubjectId}
                    setSelectedSubjectId={(id: number) => setSelectedSubjectId(id)}
                    subjects={subjects}
                />
            </div>
        </div>
    );
}

export default Drawer;
