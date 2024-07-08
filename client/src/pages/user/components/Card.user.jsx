import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Button } from 'primereact/button';
import { LuView } from 'react-icons/lu'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { useDeleteConsumerMutation } from '../../../queries/Consumer.query';
import Update from './Update.user';
const Card = ({ user, id }) => {
  const [visible, setVisible] = useState(false);
  const [DeleteConsumer, DeleteConsumerResponse] = useDeleteConsumerMutation()

  const deleteHandler = (_id) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: async () => {

        try {
        

          const { data, error } = await DeleteConsumer(_id)

          if (error) {
            return

          }

        } catch (e) {
          console.log(e.message)
        }

      },
      reject: () => {
        console.log("reject for " + _id);

      }
    });
  };

  return (

    <>

      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id}
        </th>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {user.name}
        </th>
        <td className="px-6 py-4">
          {user.email}
        </td>
        <td className="px-6 py-4">
          {user.mobile}
        </td>
        <td className="px-6 py-4">
          <button onClick={() => setVisible(!visible)} title="View" className="p-4 bg-teal-500 text-white rounded-sm mx-2">
            <LuView className="text-xl" />
          </button>
          <button onClick={() => setVisible(!visible)} title="Edit" className="p-4 bg-orange-400 text-white rounded-sm mx-2">
            <FaRegEdit className="text-xl" />
          </button>
          <Button onClick={() => deleteHandler(user._id)} title="Delete" className="p-4 bg-red-500 text-white rounded-sm mx-2">
            <FaRegTrashAlt className="text-xl" />
          </Button>
        </td>
      </tr>
      <Update visible={visible} setVisible={setVisible} _id={user._id} />
      <ConfirmDialog acceptClassName='' className=' ' contentClassName='py-2 ' closable />

    </>
  );
};

export default Card;
