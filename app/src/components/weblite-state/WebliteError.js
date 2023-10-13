//core
import React from 'react';
//utils
import {
  logThis,
} from '../../js/utils';
//heroicons
import { XCircleIcon } from '@heroicons/react/20/solid';
//render
export default function WebliteError({ getWeblite }) {
  if (process.env.DEBUG == "true") logThis("WebliteError: ON RENDER");
  const error = getWeblite.isError;
  return (
    <>
      {
        error &&
        <div className="rounded-md bg-red-50 mt-8 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
              {
                error.info &&
                <div className="mt-2 text-sm text-red-700">
                  <ul role="list" className="list-disc space-y-1 pl-5">
                    <li>Status: {error.info.status}</li>
                    <li>Info: {error.info.message}</li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}
