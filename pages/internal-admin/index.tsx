import AdminSubjects from "@/components/AdminSubjects";
import AdminFlashCards from "@/components/FlashCard/AdminFlashCards";
import LoadingSpinner from "@/components/LoadingSpinner";
import StaticModal from "@/components/Modal";
import AdminSideNavBar from "@/components/SideNavbar/AdminSideNavbar";
import React from "react";


export default function Admin() {

    const [flashCards, setFlashCards] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [renderComponent, setRenderComponent] = React.useState('flashcards');
    const [refresh, setRefresh] = React.useState(false);

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

    if(flashCards.length == 0 || subjects.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className="flex flex-row">
            <AdminSideNavBar 
                setRenderComponent={setRenderComponent}
                renderComponent={renderComponent}
            />
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
    )
}