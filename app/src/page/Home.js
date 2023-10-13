//core
import React, { Fragment, useRef, useState } from 'react';
//headlessui
import { Dialog, Transition } from '@headlessui/react'
//heroicons
//utils
import {
  logThis,
} from '../js/utils';
//weblite hooks
import useWeblite, { useUpdateWeblite, formSubmit, callWeblite } from '../hooks/useWeblite';
//componentes
import WebliteError from '../components/weblite-state/WebliteError';
import WebliteValidation from '../components/weblite-state/WebliteValidation';
import WebliteData from '../components/weblite-state/WebliteData';
import WebliteLoading from '../components/weblite-state/WebliteLoading';
import Table from '../components/table/Table';
//render
export default function Home() {
  if (process.env.DEBUG == "true") logThis("Home: ON RENDER");
  //state to handle modification to store warehouse
  const [updatingStore, setUpdatingStore] = useState(
    {
      status: false,
      action: "",
    }
  );
  const handleUpdatingStore = (action) => {
    if (action) {
      setUpdatingStore(
        {
          status: true,
          action: action,
        }
      )
    } else {
      setUpdatingStore(
        {
          status: false,
          action: "",
        }
      )
    }
  }
  //handle modal category form
  const [openCategoryForm, setOpenCategoryForm] = useState(false)
  const closeCategoryFormRef = useRef(null)
  //handle for actual selected categort
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const handleChangeSelectedCategory = (event) => {
    setSelectedCategoryId(event.target.value);
  }
  //call useWebilte to get all categories 
  const getWebliteCategories = useWeblite("f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "8cde67d6-29ae-4c32-a684-aa15e5c2c14a");
  const getWebliteProducts = useWeblite("f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "0c43fc0b-8d0e-43f0-8336-ca05c61d1644");
  //function called when a new product is created
  const handleSubmitProcutForm = async (event) => {
    event.preventDefault();
    handleUpdatingStore("Creating product");
    const formEl = event.target;
    await formSubmit(formEl, "f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "15a38cb7-2bdf-4aa1-8ccf-daff4921ee4f")
    updateWeblite("0c43fc0b-8d0e-43f0-8336-ca05c61d1644");
    handleUpdatingStore("")
  }
  //function called when a new category is created
  const handleSubmitCategoryForm = async (event) => {
    event.preventDefault();
    setOpenCategoryForm(false);
    handleUpdatingStore("Creating category");
    const formEl = event.target;
    await formSubmit(formEl, "f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "a8b7d2d0-cf79-46da-8241-4d8babfeccef")
    updateWeblite("8cde67d6-29ae-4c32-a684-aa15e5c2c14a");
    handleUpdatingStore("")
  }
  //function called when a product is removed
  const removeProduct = async (produtcId) => {
    handleUpdatingStore("Removing product with ID: " + produtcId);
    await callWeblite("f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "f12d9c02-62bc-4e93-8f37-440943a0b1c1", produtcId);
    updateWeblite("0c43fc0b-8d0e-43f0-8336-ca05c61d1644");
    handleUpdatingStore("");
  }
  //function called when a category is removed
  const removeCategory = async () => {
    handleUpdatingStore("Removing category with ID: " + selectedCategoryId);
    await callWeblite("f9cdd1d5-7d16-454b-8cc0-548dc1712c26", "adf7e302-95af-46cc-a31e-c36bcda98477", selectedCategoryId);
    updateWeblite("8cde67d6-29ae-4c32-a684-aa15e5c2c14a");
    handleUpdatingStore("");
  }
  //handle update of a specific webltie
  const [webliteToUpdate, setWebliteToUpdate] = useState();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const updateWeblite = (weblite) => {
    setWebliteToUpdate(weblite);
    setTriggerUpdate(!triggerUpdate);
  }
  useUpdateWeblite(triggerUpdate, "f9cdd1d5-7d16-454b-8cc0-548dc1712c26", webliteToUpdate);
  //render UI
  return (
    <main className="bg-gray-50" >
      <section aria-labelledby="form-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <WebliteError getWeblite={getWebliteCategories} />
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">Inventory management <span className="italic font-normal">{updatingStore.status ? `| ${updatingStore.action}` : ""} </span></h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 md:grid-cols-3">
          {/* CATEGORY FORM */}
          <Transition.Root show={openCategoryForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={closeCategoryFormRef} onClose={setOpenCategoryForm}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                      <div>
                        <div className="mt-3 text-left sm:mt-3">
                          <form onSubmit={handleSubmitCategoryForm}>
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                              {/* Category name */}
                              <div className="sm:col-span-6">
                                <label htmlFor="category-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Category name
                                </label>
                                <div className="mt-2">
                                  <input
                                    required
                                    type="text"
                                    name="category-name"
                                    id="category-name"
                                    autoComplete="category-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              {/* Category description */}
                              <div className="col-span-full">
                                <label htmlFor="category-description" className="block text-sm font-medium leading-6 text-gray-900">
                                  Category description
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    required
                                    id="category-description"
                                    name="category-description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                  />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a description for the new product.</p>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                              >
                                Add Category
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                onClick={() => setOpenCategoryForm(false)}
                                ref={closeCategoryFormRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root >
          {/* PRODUCT FORM */}
          < form className='mt-8 md:col-span-1' onSubmit={handleSubmitProcutForm} >
            <div className="space-y-12">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                {/* SELECT CATEGORY */}
                <div className="sm:col-span-6">
                  <div className="mt-2">
                    <WebliteLoading getWeblite={getWebliteCategories}>
                      <div >Loading ...</div>
                    </WebliteLoading>
                    <WebliteData getWeblite={getWebliteCategories}>
                      {
                        (categories) => (
                          <>
                            <label htmlFor="product-category" className="block text-sm font-medium leading-6 text-gray-900">
                              Category
                            </label>
                            <div className='flex flex-row space-x-4'>
                              <select
                                onChange={handleChangeSelectedCategory}
                                id="product-category"
                                name="product-category"
                                autoComplete="product-category"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                {
                                  categories.map((category) => (
                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >{category.name}</option>
                                  ))

                                }
                              </select>
                              <WebliteValidation getWeblite={getWebliteCategories} />
                            </div>
                          </>
                        )
                      }
                    </WebliteData>
                  </div>
                </div>
                <WebliteData getWeblite={getWebliteCategories}>
                  {
                    () => (
                      <div className="sm:col-span-6 grid grid-cols-6 -my-4 space-x-4">
                        <div className="col-span-3">
                          <button
                            type="button"
                            onClick={() => { setOpenCategoryForm(true) }}
                            className={`w-full rounded-md ${updatingStore.status ? "bg-slate-200 hover:bg-slate-200" : "bg-indigo-600 hover:bg-indigo-500"} px-3 py-2 text-xs font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          >
                            Add Category
                          </button>
                        </div>
                        <div className="col-span-3">
                          <button
                            type="button"
                            onClick={removeCategory}
                            className={`w-full rounded-md ${updatingStore.status ? "bg-slate-200 hover:bg-slate-200" : "bg-orange-600 hover:bg-orange-500"} px-3 py-2 text-xs font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          >
                            Remove Category
                          </button>
                        </div>
                      </div>
                    )
                  }
                </WebliteData>
                {/* REST OF THE FORMS */}
                <WebliteData getWeblite={getWebliteCategories}>
                  {
                    () => (
                      <>
                        {/* Product name */}
                        <div className="sm:col-span-6">
                          <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Product name
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              type="text"
                              name="product-name"
                              id="product-name"
                              autoComplete="product-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        {/* Product description */}
                        <div className="col-span-full">
                          <label htmlFor="product-description" className="block text-sm font-medium leading-6 text-gray-900">
                            Product description
                          </label>
                          <div className="mt-2">
                            <textarea
                              required
                              id="product-description"
                              name="product-description"
                              rows={3}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={''}
                            />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-gray-600">Write a description for the new product.</p>
                        </div>
                        {/* Product price */}
                        <div className="sm:col-span-6">
                          <label htmlFor="product-price" className="block text-sm font-medium leading-6 text-gray-900">
                            Product price
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              type="number"
                              name="product-price"
                              id="product-price"
                              autoComplete="product-price"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        {/* Product favorite */}
                        <div className="sm:col-span-6">
                          <div className="mt-2">
                            <label htmlFor="product-favorite" className="block text-sm font-medium leading-6 text-gray-900">
                              Favorite
                            </label>
                            <select
                              id="product-favorite"
                              name="product-favorite"
                              autoComplete="product-favorite"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value={0} defaultValue>No</option>
                              <option value={1}>Yes</option>
                            </select>
                          </div>
                        </div>
                        {/* Product create */}
                        <div className="sm:col-span-6">
                          <button
                            disabled={updatingStore.status}
                            type="submit"
                            className={`rounded-md ${updatingStore.status ? "bg-slate-200 hover:bg-slate-200" : "bg-indigo-600 hover:bg-indigo-500"} px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          >
                            Add Product
                          </button>
                        </div>
                      </>
                    )
                  }
                </WebliteData>
              </div>
            </div>
          </form >
          {/* PRODUCT TABLE */}
          <div className="mt-8 md:col-span-2" >
            <div className="lg:px-8">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Store products</h2>
              <WebliteLoading getWeblite={getWebliteProducts}>
                <Table data={[]} loading={true} />
              </WebliteLoading>
              <WebliteData getWeblite={getWebliteProducts} returnOnlyRows={false}>
                {
                  (products) => (
                    <>
                      <Table data={products} removeRow={removeProduct} disabled={updatingStore.status} />
                      <WebliteValidation getWeblite={getWebliteProducts} />
                    </>
                  )
                }
              </WebliteData>
            </div>
          </div >
        </div >
      </section >
    </main >
  )
}
