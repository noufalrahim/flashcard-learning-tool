import AdminSubjects from "@/components/AdminSubjects";
import AdminFlashCards from "@/components/FlashCard/AdminFlashCards";
import LoadingSpinner from "@/components/LoadingSpinner";
import StaticModal from "@/components/Modal";
import AdminSideNavBar from "@/components/SideNavbar/AdminSideNavbar";
import AdminDrawer from "@/components/SideNavbar/Drawer/AdminDrawer";
import React, { useEffect } from "react";
import { FaBurger } from "react-icons/fa6";


export default function Admin() {

    const [flashCards, setFlashCards] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [renderComponent, setRenderComponent] = React.useState('flashcards');
    const [refresh, setRefresh] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }
    }, []);

    React.useEffect(() => {
        fetch('/api/questions')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFlashCards(data);
            });
        fetch('/api/subjects')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSubjects(data);
            });
    }, [refresh]);

    // if (flashCards.length == 0 || subjects.length === 0) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <LoadingSpinner />
    //         </div>
    //     )
    // }

    return (
        <main>
            {
                isMobile && (
                    <div className="flex justify-between items-center bg-gray-800 p-4">
                        <p className="text-white text-lg">Flashcards</p>
                        <FaBurger className="text-white text-2xl"
                            onClick={() => setOpen(!open)}
                        />
                        <AdminDrawer
                            isOpen={open}
                            setIsOpen={setOpen}
                            renderComponent={renderComponent}
                            setRenderComponent={setRenderComponent}
                        />
                    </div>
                )
            }
            <div className="flex flex-row">
                {
                    !isMobile && (
                        <AdminSideNavBar
                            setRenderComponent={setRenderComponent}
                            renderComponent={renderComponent}
                        />
                    )
                }

                {
                    renderComponent === 'subjects' ? (
                        <AdminSubjects
                            subjects={subjects}
                            setRefresh={setRefresh}
                        />
                    ) : (
                        <AdminFlashCards
                            subjects={subjects}
                            flashCards={flashCards}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )
                }
            </div>
        </main>
    )
}