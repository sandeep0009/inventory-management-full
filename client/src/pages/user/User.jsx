import React, { useState } from 'react';
import Breadcums from '../../components/Breadcums';
import Modal from '../user/components/Modal';
import { useGetAllConsumersQuery } from '../../queries/Consumer.query';
import Card from './components/Card.user';
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useSearchParams } from 'react-router-dom';

const User = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const { data, isLoading, isError } = useGetAllConsumersQuery({ query: searchParams.get("query") || '', page: searchParams.get("page") || 1 });

  const handleModal = () => {
    setVisible(!visible);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const onHandleNextPage = () => {
    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page + 1}`;
    } else {
      string = `?page=${page + 1}`;
    }
    navigate(`/user${string}`);
  }

  const onPreviousHandle = () => {
    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page - 1}`;
    } else {
      string = `?page=${page - 1}`;
    }
    navigate(`/user${string}`);
  }

  const onSearchHandle = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }

    let string = `?query=${search}&page=${1}`;
    navigate('/user' + string);
  }

  return (
    <div>
      <Breadcums PageLink="/users" PageName="Users" />
      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button onClick={handleModal} className="px-2 py-2 bg-purple-500 text-white rounded-sm">
          Add User
        </button>
      </div>

      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <form onSubmit={onSearchHandle}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm border py-3 px-5 outline-none"
            placeholder="Search user"
          />
        </form>
      </div>

      {(Number(searchParams.get("page")) || 1) > 1 && <button onClick={onPreviousHandle} title='Prev Page' className="text-black text-xl lg:text-3xl p-2"><BsArrowLeftCircle /></button>}

      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button onClick={onHandleNextPage} title='Next Page' className="text-black py-3 text-xl lg:text-3xl"><BsArrowRightCircle /></button>
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

      {visible && <Modal visible={visible} setVisible={setVisible} />}
    </div>
  );
};

export default User;
