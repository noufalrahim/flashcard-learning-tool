import React from 'react';

export default function AdminSideNavBar({ setRenderComponent, renderComponent }: { setRenderComponent: any,
    renderComponent: any
 }) {
    return (
        <nav className="w-1/5 min-h-screen bg-gray-800">
            <ul className="flex flex-col items-center">
                <li className={`text-white p-2 text-center w-full cursor-pointer
                    ${renderComponent === 'flashcards' ? 'bg-gray-700' : ''}
                `}
                    onClick={() => setRenderComponent('flashcards')}>
                    <p className="text-white text-lg">Flashcards</p>
                </li>
                <li className={`text-white p-2 text-center w-full cursor-pointer
                    ${renderComponent === 'subjects' ? 'bg-gray-700' : ''}
                `}
                    onClick={() => setRenderComponent('subjects')}>
                    <p className="text-white text-lg">Subjects</p>
                </li>
            </ul>
        </nav>
    )
}