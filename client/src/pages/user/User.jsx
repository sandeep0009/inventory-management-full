import React, { useState } from 'react';
import Breadcums from '../../components/Breadcums';
import Modal from '../user/components/Modal';
import { useGetAllConsumersQuery } from '../../queries/Consumer.query';
import Card from './components/Card.user';

const User = () => {
  const [visible, setVisible] = useState(false);
  const { data, isLoading, isError } = useGetAllConsumersQuery();
  
  const handleModal = () => {
    setVisible(!visible);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <Breadcums PageLink="/users" PageName="Users" />
      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button onClick={handleModal} className="px-2 py-2 bg-purple-500 text-white rounded-sm">
          Add User
        </button>
      </div>

      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <form>
          <input
            type="text"
            className="w-full rounded-sm border py-3 px-5 outline-none"
            placeholder="Search user"
          />
        </form>
      </div>

      <div className="w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <div className="relative overflow-x-auto shadow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Mobile</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.length > 0 &&
                  data.data.map((c, i) => <Card key={i} id={i + 1} user={c} />)
                  
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

      {console.log(data.data)}

      {

       
        console.log(data._id)
      }
     

      {visible && <Modal visible={visible} setVisible={setVisible} />}
    </div>
  );
};

export default User;
