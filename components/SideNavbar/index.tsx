
interface SideNavBarProps {
    selectedSubjectId: number;
    setSelectedSubjectId: (id: number) => void;
    subjects: any;
}
export default function SideNavBar({selectedSubjectId, setSelectedSubjectId, subjects}: SideNavBarProps) {
    return (
        <nav className="w-1/5 h-screen bg-gray-800">
            <ul className="flex flex-col items-center h-full">
                {
                    subjects.map((subject: any, index: number) => {
                        return (
                            <li key={index} className={`text-white p-2 text-center w-full cursor-pointer ${selectedSubjectId === subject.id ? 'bg-black' : ''}`} onClick={() => setSelectedSubjectId(subject.id)}>
                                <p className="text-white text-lg">{subject.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}