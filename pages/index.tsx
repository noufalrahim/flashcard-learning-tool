import SideNavBar from "@/components/SideNavbar";
import FlashCard from "@/components/FlashCard";
import React from "react";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FaBurger } from "react-icons/fa6";
import Drawer from "@/components/SideNavbar/Drawer";

export default function Home() {

  const [selectedSubjectId, setSelectedSubjectId] = React.useState(1);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = React.useState(0);
  const [flashCards, setFlashCards] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [isMobile, setIsMobile] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        setFlashCards(data);
      });

    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
      });
  }, []);


  console.log(selectedSubjectId);

  if (flashCards.length == 0 || subjects.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <main>
      {
        isMobile && (
          <div className="flex justify-between items-center bg-gray-800 p-4">
            <p className="text-white text-lg">Flashcards</p>
            <FaBurger className="text-white text-2xl" 
              onClick={() => setOpen(!open)}
            />
            <Drawer 
              isOpen={open}
              setIsOpen={setOpen}
              selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={(id: number) => setSelectedSubjectId(id)}
            subjects={subjects}
            />
          </div>
        )
      }
      <div className="flex-row flex">
      {
        !isMobile && (
          <SideNavBar
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={(id: number) => setSelectedSubjectId(id)}
            subjects={subjects}
          />
        )
      }
      <FlashCard
        subjectId={selectedSubjectId}
        currentFlashCardIndex={currentFlashCardIndex}
        setCurrentFlashCardIndex={(index: number) => setCurrentFlashCardIndex(index)}
        flashCards={flashCards}
      />
      </div>
    </main>
  );
}
