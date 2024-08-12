import React from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

interface FlashCardProps {
    subjectId: number;
    currentFlashCardIndex: number;
    setCurrentFlashCardIndex: (index: number) => void;
    flashCards: any;
}

export default function FlashCard({ subjectId,
    currentFlashCardIndex,
    setCurrentFlashCardIndex,
    flashCards
 }: FlashCardProps) {

  const filteredFlashCards = flashCards.filter(
    (flashCard: any) => flashCard?.subject_id === subjectId
  );
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handlePrevious = () => {
    if (currentFlashCardIndex > 0) {
      setCurrentFlashCardIndex(currentFlashCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentFlashCardIndex < filteredFlashCards.length - 1) {
      setCurrentFlashCardIndex(currentFlashCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="lg:w-4/5 md:w-4/5 xl:w-4/5 w-full items-center flex flex-col justify-between flex min-h-screen">
      <div className="w-11/12 bg-gray-400 mt-10 rounded-full flex-row flex px-5 py-2 justify-center">
        <p className="text-center text-black">
          {
            filteredFlashCards?.length === 0 ? "No flashcards available" : 
            `${currentFlashCardIndex + 1} / ${filteredFlashCards.length}`
          }
          
        </p>
      </div>
      <div className="justify-center h-full w-full flex items-center">
        <div className="w-1/3 h-[25rem] perspective w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mx-5">
          <div
            className={`relative w-full h-full duration-500 transform-style preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div className="absolute w-full h-full backface-hidden bg-gray-400 rounded-md flex justify-center items-center">
              <p className="text-center text-black text-lg mx-5">
                {filteredFlashCards[currentFlashCardIndex]?.question}
              </p>
            </div>
            <div className="absolute w-full h-full backface-hidden flex-col bg-gray-400 rounded-md flex justify-center items-center transform rotate-y-180">
              <p className="text-center text-black text-lg">
                {filteredFlashCards[currentFlashCardIndex]?.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 lg:w-11/12 md:w-11/12 xl:w-11/12 w-full flex flex-row justify-between px-10 gap-2">
        <div
          className={`py-4 px-4 bg-gray-800 items-center flex justify-center text-center rounded-full cursor-pointer ${
            currentFlashCardIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
        >
          <FaChevronCircleLeft color="white" size={20}/>
        </div>
        <div
          className="py-2 rounded-xl px-5 bg-gray-800 items-center justify-center flex cursor-pointer"
          onClick={handleFlip}
        >
          <p className="text-white text-center">
            {isFlipped ? "Hide" : "Show"}
          </p>
        </div>
        <div
          className={`py-4 px-4 bg-gray-800 items-center flex justify-center text-center rounded-full cursor-pointer ${
            currentFlashCardIndex === filteredFlashCards.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleNext}
        >
          {/* <p className="text-white text-center">Next</p> */}
          <FaChevronCircleRight color="white" size={20}/>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
