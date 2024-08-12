import React, { useState, useEffect } from 'react';
import StaticModal from '@/components/Modal';
import EditFlashCardModal from '@/components/Modal/editFlashCardModal';
import FlashCardModal from '@/components/Modal/flashCardModal';
import Table from '@/components/Table';

interface FlashCard {
    question: string;
    answer: string;
    subject: string;
    actions: string;
}

interface Subject {
    id: number;
    name: string;
}

export default function AdminFlashCards({ flashCards, subjects, setRefresh }: 
    { flashCards: FlashCard[], subjects: Subject[], refresh: boolean, setRefresh: any }) {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredFlashCards, setFilteredFlashCards] = useState<FlashCard[]>(flashCards);
    const [showEditModal, setShowEditModal] = useState({
        show: false,
        row: {},
    });

    useEffect(() => {
        setFilteredFlashCards(
            flashCards.filter(flashCard =>
                flashCard.question.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, flashCards]);

    const handleEditRow = async (row: any) => {
        setShowEditModal({
            show: true,
            row,
        });
    }

    const handleDeleteRow = async (id: any) => {
        const response = await fetch('/api/deleteFlashCard', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            alert('Flash Card Deleted successfully');
        } else {
            alert('Failed to delete Flash Card');
        }
        setRefresh((prev: any) => !prev);
    }

    const columns = React.useMemo(() => [
        {
            header: 'Question',
            accessorKey: 'question',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Answer',
            accessorKey: 'answer',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Subject',
            accessorKey: 'subject_id',
            cell: (info: any) => {
                return info.getValue();
            },
        },
        {
            header: 'Edit',
            accessorKey: 'EDIT',
        },
        {
            header: 'Delete',
            accessorKey: 'DELETE',
        }
    ], []);

    const [showModal, setShowModal] = React.useState(false);
    const [columnFilters, setColumnFilters] = React.useState({
        id: 'question',
        value: "",
    });

    return (
        <div className='w-full gap-5 md:gap-0 lg:gap-0 xl:gap-0 flex flex-col'>
            <div className='mt-5'>
                <h1 className='text-3xl text-center'>
                    Flash Cards
                </h1>
            </div>

            <div className='flex justify-end px-5 gap-4'>
                <button className='bg-gray-800 text-white px-5 py-2 rounded'
                    onClick={() => setShowModal(true)}
                >
                    Add Flash Card
                </button>
            </div>

            <div className='flex justify-center'>
                <input
                    type='text'
                    placeholder='Search Flash Cards'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full lg:w-1/3 md:w-1/3 xl:w-1/3 mx-5 py-1 border border-gray-500 rounded focus:outline-none'
                />
            </div>

            <Table
                data={filteredFlashCards}  // Use filtered flashcards
                columns={columns}
                columnFilters={columnFilters}
                handleDeleteRow={handleDeleteRow}
                handleEditRow={handleEditRow}
                loading={false}
            />

            <FlashCardModal
                isModalOpen={showModal}
                setIsModalOpen={setShowModal}
                subjects={subjects}
                setRefresh={setRefresh}
            />
            <EditFlashCardModal
                isModalOpen={showEditModal.show}
                setIsModalOpen={setShowEditModal}
                subjects={subjects}
                flashCard={showEditModal.row}
                setRefresh={setRefresh}
            />
        </div>
    )
}
