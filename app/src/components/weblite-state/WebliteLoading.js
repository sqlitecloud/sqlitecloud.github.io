//core
import React from 'react';
//utils
import {
  logThis,
} from '../../js/utils';
//render
export default function WebliteLoading({ getWeblite, children }) {
  if (process.env.DEBUG == "true") logThis("WebliteLoading: ON RENDER");
  const isError = getWeblite.isError;
  const isLoading = getWeblite.isLoading;
  return (
    <>
      {
        !isError && isLoading &&
        children
      }
    </>
  )
}
