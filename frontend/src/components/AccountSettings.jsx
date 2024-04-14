import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AccountSettings = () => {
  return (
       <div className="bg-gray-50 min-h-screen flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
            <div className='flex justify-between'>
            <div className='flex items-center'>
            <h1 className="text-md font-semibold mb-4">Account Settings</h1>
            </div>
            <div className='flex justify-between'>
            <MdEdit />
            <MdDelete />
            </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                <h1 className='text-xs font-semibold mb-2'>First Name</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="First Name"
                />
            </div>
            <div className="w-full md:w-1/2 px-2">
                <h1 className='text-xs font-semibold mb-2'>Last Name</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="Last Name"
                />
            </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                <h1 className='text-xs font-semibold mb-2'>Email</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="Email"
                />
            </div>
            <div className="w-full md:w-1/2 px-2">
                <h1 className='text-xs font-semibold mb-2'>Phone No</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="Phone No"
                />
            </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-full px-2 mb-2 md:mb-0">
                <h1 className='text-xs font-semibold mb-2'>Mailing Address</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="Mailing Address"
                />
            </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
                <h1 className='text-xs font-semibold mb-2'>City</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="City"
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <h1 className='text-xs font-semibold mb-2'>State</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="State"
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <h1 className='text-xs font-semibold mb-2'>Zipcode</h1>
                <input
                className="passwordinput text-grey-darker"
                type="text"
                placeholder="Zipcode"
                />
            </div>
            </div>
            <div className="flex items-center justify-between mt-8 mb-8">
                <div className="flex-1 ml-3 text-xs">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-1/2">
                    Save
                    </button>
                </div>
            </div>
        </div>
        </div>
  )
}

export default AccountSettings
