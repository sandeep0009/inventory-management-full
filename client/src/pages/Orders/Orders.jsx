import React, { useState } from 'react';
import Breadcums from '../../components/Breadcums';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddOrder from './components/AddOrder';
import OrderCard from './components/OrderCard';
import { useGetAllOrderQuery } from '../../queries/Order.query';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';

const Orders = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const { data, isLoading, error } = useGetAllOrderQuery({
    query: searchParams.get('query') || '',
    page: searchParams.get('page') || 1,
  });

  const onPrevPageHandler = () => {
    const page = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || '';
    const string = query ? `?query=${query}&page=${page - 1}` : `?page=${page - 1}`;
    navigate(`/orders${string}`);
  };

  const OnNextPageHandler = () => {
    const page = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || '';
    const string = query ? `?query=${query}&page=${page + 1}` : `?page=${page + 1}`;
    navigate(`/orders${string}`);
  };

  const SearchHandler = (e) => {
    e.preventDefault();
    navigate(`/orders?query=${search}&page=1`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Breadcums PageLink="/orders" PageName="Orders" />
      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button onClick={() => setVisible(!visible)} className="px-2 py-2 bg-purple-500 text-white rounded-sm">
          Add Order
        </button>
      </div>

      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <form onSubmit={SearchHandler}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm border py-3 px-5 outline-none"
            placeholder="Search user"
          />
        </form>
      </div>

      <div className={`mb-3 flex ${Number(searchParams.get('page')) || 1 > 1 ? 'justify-between' : 'justify-end'} w-[90%] mx-auto`}>
        {(Number(searchParams.get('page')) || 1) > 1 && (
          <button onClick={onPrevPageHandler} title="Prev Page" className="text-black text-xl lg:text-3xl p-2">
            <BsArrowLeftCircle />
          </button>
        )}

        {data?.more && (
          <button onClick={OnNextPageHandler} title="Next Page" className="text-black text-xl lg:text-3xl p-2">
            <BsArrowRightCircle />
          </button>
        )}
      </div>

      <div className="relative overflow-x-auto shadow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Items</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.orderdata?.length > 0 ? (
              data.orderdata.map((c, i) => <OrderCard key={i} id={i + 1} data={c} />)
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddOrder visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Orders;