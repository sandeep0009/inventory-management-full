import React , {useState  } from 'react'
import Breadcums from '../../components/Breadcums'
import Modal from "../user/components/Modal"

const User = () => {
  const[visible,setVisible]=useState(false);
  const handleModal=()=>{
    setVisible(!visible)
  }
  return (
    <div>
        <Breadcums PageLink='/users' PageName='Users'/>
        <div className="mb-3 flex justify-end w-[90%] mx-auto">
            <button onClick={handleModal} className='px-2 py-2 bg-purple-500 text-white rounded-sm'>
                Add User
            </button>
        </div>

        <div className="mb-3 flex justify-end w-[90%] mx-auto">
          <form >
            <input type="text" className='w-full   rounded-sm border py-3 px-5 outline-none' placeholder='Search user' />
          </form>
        </div>
        <div className="relative overflow-x-auto">


        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    </div>
        {visible && <Modal visible={visible} setVisible={setVisible} />}
 
    </div>
  )
}

export default User