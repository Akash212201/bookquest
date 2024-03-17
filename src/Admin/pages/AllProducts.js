import React, { useMemo, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import Alldata from './MOCK_DATA.json';
import { useSortBy, useTable, usePagination } from 'react-table';

//componet to show all product 
//some correction are pending
//table header
const Columns = [
  {
    accessor: 'id',
    header: 'ID',
  },
  {
    accessor: 'image',
    header: 'Book Image',
  },
  {
    accessor: 'bookName',
    header: 'Book Name',
  },
  {
    accessor: 'author',
    header: 'Author',
  },
  {
    accessor: 'category',
    header: 'Category',
  },
  {
    accessor: 'price',
    header: 'Price',
    editable: true,
  },
  {
    accessor: 'stock',
    header: 'Stock',
    editable: true,
  },
  {
    accessor: 'status',
    header: 'Status',
    editable: true,
  },
];

const AllProducts = () => {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Alldata, []);

  const [editingRows, setEditingRows] = useState({});
  const [dataa, setDataa] =useState();
  const table = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = table;

  const [inputPage, setInputPage] = useState("");

  //function to jump on page number
  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= table.pageCount) {
      gotoPage(pageNumber - 1);
      setInputPage("");
    }
  };

  // Function to handle editing value
const handleEdit = (_id, columnId, value) => {
  
};


  // Function to toggle editing state for a row
  const toggleRowEditing = (rowIndex) => {
    setEditingRows(prevEditingRows => ({
      ...prevEditingRows,
      [rowIndex]: !prevEditingRows[rowIndex],
    }));
    
  };

  return (
    <>
      <h1 className='font-semibold text-2xl'>Products</h1>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table {...getTableProps()} className='border border-red-500 w-full'>
          <thead className='w-full border border-red-900'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className='text-center '>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className=' border border-black text-xl py-3 bg-[#f2f4ff]'
                  >
                    <div className='flex items-center justify-between px-1'>
                      {column.render('header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowAltCircleDown />
                        ) : (
                          <FaArrowAltCircleUp />
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                ))}
                <th>Edit/Update</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='w-full border border-red-900'>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              const isRowEditing = editingRows[rowIndex];
              return (
                <tr {...row.getRowProps()} className='text-center'>
                  {row.cells.map((cell, index) => (
                    <td key={index} className={` border border-black h-full`}>
                      {cell.column.accessor === 'image' ? (
                        <img src={cell.value} alt="Book Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      ) : cell.column.editable && isRowEditing ? (
                        <input
  type="text"
  value={cell.value}
  onChange={(e) => handleEdit(rowIndex, cell.column.id, e.target.value)}
  className="outline-none"
/>

                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                  <td className=''>
                    {isRowEditing ? (
                      <button onClick={() => toggleRowEditing(rowIndex)}
                        className="px-4 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded mb-2">
                        Update
                      </button>
                    ) : (
                      <button onClick={() => toggleRowEditing(rowIndex)}
                        className="px-4 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded mb-2">
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="pageSize">Results per page: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className='border-[2px] border-black bg-white px-1 rounded'
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded mr-4">
            Previous
          </button>
          <span className="pagination-inf">
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded ml-4">
            Next
          </button>
        </div>
        <div>
          <input
            type="text"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="page-input border outline-none border-black mr-2 rounded px-2 py-1"
            placeholder="Jump Page Number"
          />
          <button onClick={handleGoToPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded">
            Jump
          </button>
        </div>
      </div>
    </>
  );
};

export default AllProducts;