import SideNavBar from "@/components/SideNavbar";
import FlashCard from "@/components/FlashCard";
import React from "react";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {

  const [selectedSubjectId, setSelectedSubjectId] = React.useState(1);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = React.useState(0);
  const [flashCards, setFlashCards] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);

  useEffect(() => {
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
  }, []);


  console.log(selectedSubjectId);

  if(flashCards.length == 0 || subjects.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <main className="flex-row flex">
      <SideNavBar selectedSubjectId={selectedSubjectId} setSelectedSubjectId={(id: number) => {
        setSelectedSubjectId(id)
        setCurrentFlashCardIndex(0)
      }} 
      subjects={subjects}
      />
      <FlashCard
        subjectId={selectedSubjectId}
        currentFlashCardIndex={currentFlashCardIndex}
        setCurrentFlashCardIndex={(index: number) => setCurrentFlashCardIndex(index)}
        flashCards={flashCards}
      />
    </main>
  );
}
