//core
import React from 'react';
//react-perfect-scrollbar
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
//utils
import {
  logThis,
} from '../../js/utils';
//render
export default function Table({ data, loading, removeRow, disabled }) {
  if (process.env.DEBUG == "true") logThis("Table: ON RENDER");
  if (loading) {
    data = {
      columns: [1, 2, 3, 4],
      rows: [
        {
          1: "...",
          2: "...",
          3: "...",
          4: "...",
        },
        {
          1: "...",
          2: "...",
          3: "...",
          4: "...",
        },
        {
          1: "...",
          2: "...",
          3: "...",
          4: "...",
        },
        {
          1: "...",
          2: "...",
          3: "...",
          4: "...",
        },
      ]
    }
  }
  //render UI
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block mx-4 md:mx-0 min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {
                    !loading && data.columns && data.columns.map((col, i) => (
                      <th key={i} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        {col}
                      </th>
                    ))
                  }
                  {
                    loading && data.columns && data.columns.map((col, i) => (
                      <th key={i} scope="col" className="h-2 w-8 mx-2 bg-slate-200 animate-pulse py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        ...
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {
                  !loading && data.rows && data.rows.map((row, i) => (
                    <tr key={i}>
                      {
                        Object.entries(row).map(([key, value], i) =>
                          <td key={key} className="whitespace-nowrap max-w-[100px]  overflow-auto py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6">
                            <PerfectScrollbar className='h-[32px]'>
                              {row[data.columns[i]]}
                            </PerfectScrollbar>
                          </td>
                        )
                      }
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          disabled={disabled}
                          onClick={() => removeRow(row[data.columns[0]])}
                          className={`${disabled ? "text-slate-200 hover:text-slate-200" : "text-indigo-600 hover:text-indigo-900"}`}>
                          Remove<span className="sr-only">, {row[data.columns[0]]}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                }
                {
                  loading && data.rows && data.rows.map((row, i) => (
                    <tr key={i}>
                      {
                        Object.entries(row).map(([key, value], i) =>
                          <td key={key} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {
                              row[data.columns[i]]
                            }
                          </td>
                        )
                      }

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
