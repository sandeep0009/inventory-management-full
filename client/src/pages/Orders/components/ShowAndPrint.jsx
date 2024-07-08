import { Dialog } from 'primereact/dialog';
import moment from 'moment';
import Barcode from 'react-barcode';
import { usePDF } from 'react-to-pdf';
import { useGetInvoiceOrderQuery } from '../../../queries/Order.query';

const ShowAndPrint = ({ setVisible, visible, id }) => {
  const { data, isError, isLoading } = useGetInvoiceOrderQuery(id);
  const { toPDF, targetRef } = usePDF();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Dialog
      draggable={false}
      visible={visible}
      className="w-[90%] mx-auto lg:mx-0 lg:w-1/2"
      onHide={() => setVisible(false)}
    >
      <div ref={targetRef} className="m-0 px-5">
        <div className="flex items-start gap-x-10 py-5 justify-between">
          <div className="w-1/2 flex flex-col gap-y-2">
            <h1 className="font-semibold text-xl capitalize">
              {data?.consumer?.name}
            </h1>
            <p className="text-sm">{data?.consumer?.address}</p>
            <p className="font-semibold">
              Date: {moment(new Date(data?.createdAt)).format('lll')}
            </p>
          </div>
          <div className="w-1/2">
            <Barcode displayValue={false} width={1} height={50} value={data?._id} />
            <h1 className="font-semibold">Supplier: {data?.user?.name}</h1>
          </div>
        </div>
        <div className="items py-2">
          <table className="border w-full">
            <thead className="border">
              <tr>
                <th className="border py-2">ID</th>
                <th className="border py-2">Item</th>
                <th className="border py-2">Price (in ₹)</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.length > 0 &&
                data.items.map((c, i) => (
                  <tr key={i} className="py-2">
                    <td className="border text-center py-2">{i + 1}</td>
                    <td className="border text-center py-2 capitalize">{c.name}</td>
                    <td className="border text-center py-2">₹ {c.price}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} className="border capitalize text-center py-2">
                  Total
                </th>
                <th className="border capitalize text-center py-2">
                  ₹ {data?.items?.reduce((a, c) => a + c.price, 0)} /-
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <footer>
        <button
          className="px-6 py-2 outline-none bg-red-500 rounded-md text-white"
          onClick={() =>
            toPDF({
              method: 'open',
              page: {
                format: 'A4',
              },
            })
          }
        >
          Generate
        </button>
     

        </footer>
</Dialog>
    
  )
}

export default ShowAndPrint