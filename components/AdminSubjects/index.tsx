import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import StaticModal from '../Modal';

interface Subjects {
    id: number;
    name: string;
}

export default function AdminSubjects({ subjects, setRefresh }: 
    { subjects: Subjects[], setRefresh: any }) {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredSubjects, setFilteredSubjects] = useState<Subjects[]>(subjects);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setFilteredSubjects(
            subjects.filter(subject =>
                subject.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, subjects]);

    const columns = React.useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: (info: any) => info.getValue(),
        },
    ], []);

    return (
        <div className='w-full gap-5 md:gap-0 lg:gap-0 xl:gap-0 flex flex-col'>
            <div className='mt-5'>
                <h1 className='text-3xl text-center'>
                    Subjects
                </h1>
            </div>

            <div className='flex justify-end px-5 gap-4'>
                <button className='bg-gray-800 text-white px-5 py-2 rounded'
                    onClick={() => setShowModal(true)}>
                    Add Subject
                </button>
            </div>

            <div className='flex justify-center'>
                <input
                    type='text'
                    placeholder='Search Subjects'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full lg:w-1/3 md:w-1/3 xl:w-1/3 mx-5 mt-2 px-2 py-1 border border-gray-500 rounded focus:outline-none'
                />
            </div>

            <Table
                data={filteredSubjects} 
                columns={columns}
                columnFilters={{}}
                handleDeleteRow={() => { }}
                handleEditRow={() => { }}
                loading={false}
            />

            <StaticModal 
                isModalOpen={showModal}
                setIsModalOpen={setShowModal}
                setRefresh={setRefresh}
            />
        </div>
    )
}
