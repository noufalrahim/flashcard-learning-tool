import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef,
} from '@tanstack/react-table';
import {FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner';

interface TableProps {
    data: any[];
    columns: ColumnDef<any, any>[];
    columnFilters: any;
    handleDeleteRow: any;
    handleEditRow: any;
    loading: boolean;
}

export default function Table({
    data,
    columns,
    columnFilters,
    handleDeleteRow,
    handleEditRow,
    loading,
}: TableProps) {

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 100, // Default page size
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination,
        },
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    return (
        <div className="relative overflow-x-auto bg-white shadow-xl m-5 max-h-screen border border-black">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-b border-black min-h-[27rem]">                
                <thead className="text-xs text-white uppercase bg-[#1E293B] ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='p-1  flex-row justify-center text-center items-center border border-gray-300'>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`p-1`}>
                                    <div className='flex flex-row justify-between'>
                                        {String(header.column.columnDef.header)}
                                        {header.column.getCanSort() && (
                                            <div
                                                className='flex flex-row justify-between items-center flex'
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {!header.column.getIsSorted() && <FaSort size={10} />}
                                                <div className='ml-1 justify-self-end items-center flex'>
                                                    {{
                                                        asc: <FaSortUp size={10} />,
                                                        desc: <FaSortDown size={10} />,
                                                    }[header.column.getIsSorted() as keyof { asc: string; desc: string; }]}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {
                    loading ? (
                        <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-10'>
                        <LoadingSpinner />
                        </div>
                    ) : (
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={`p-1 ${row.original.ISDROPPED && 'bg-red-200'} ${!row.original.ISDROPPED && 'hover:bg-gray-100'}`} >
                            {row.getVisibleCells().map((cell: any) => (
                                <td 
                                key={cell.id} 
                                width={cell.column.getSize()} 
                                className={`flex-col justify-center text-center border border-gray-300 px-5 py-2`}>
                                    {cell.column.columnDef.accessorKey === 'EDIT' ? (
                                        <div className='flex flex-row justify-between'>
                                            <span className='text-blue-500 cursor-pointer' onClick={() => handleEditRow(cell.row.original)}>
                                                EDIT
                                            </span>
                                        </div>
                                    ) : cell.column.columnDef.accessorKey === 'DELETE' ? (
                                        <div className='flex flex-row justify-between'>
                                            <span className='text-red-500 cursor-pointer' onClick={() => handleDeleteRow(cell.row.original.id)}>
                                                DELETE
                                            </span>
                                        </div>
                                    ) : (
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    );
}
