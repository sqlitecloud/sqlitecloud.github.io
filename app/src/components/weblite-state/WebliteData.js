//core
import React from 'react';
//utils
import {
  logThis,
} from '../../js/utils';
//heroicons
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
//render
export default function WebliteData({ getWeblite, children, modifier, returnOnlyRows = true }) {
  if (process.env.DEBUG == "true") logThis("WebliteData: ON RENDER");
  const data = getWeblite.data;
  const isError = getWeblite.isError;
  const isLoading = getWeblite.isLoading;
  const isValidating = getWeblite.isValidating;
  // children
  if (!isLoading && !isError && data && data.rows) {
    let returnData = data.rows.length === 1 ? data.rows[0] : data.rows;
    if (modifier) {
      returnData = modifier(returnData);
    }
    if (!returnOnlyRows) {
      returnData = {
        rows: returnData,
        columns: data.columns,
      }
    }
    return (
      <>
        {
          children(returnData)
        }
      </>
    )
  } else if (!isLoading && !isError && data && !data.rows) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">No result for these query</h3>
          </div>
        </div>
      </div>
    )
  }

}
