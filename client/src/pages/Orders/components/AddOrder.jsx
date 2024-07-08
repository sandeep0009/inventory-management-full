import React from 'react';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import { z } from 'zod';
import {  useGetAllSearchConsumerQuery } from '../../../queries/Consumer.query';
import { useAddOrderMutation } from '../../../queries/Order.query';

const validationSchema = z.object({
    user: z.object({
        _id: z.string(),
    }).nullable("User is required"),
    items: z.array(z.object({
        name: z.string().nullable("Item Name required"),
        price: z.number().nullable("Item Price required"),
    })).optional(),
});

const AddOrderModel = ({ visible, setVisible }) => {

    const [CreateOrder] = useAddOrderMutation();

    const { isLoading, isFetching, data } = useGetAllSearchConsumerQuery({});

    console.log("users data",data)

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className='capitalize'>{option.name} - {moment(new Date(option.dob)).format("L")}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
                {console.log(option.dob)}
                <div>{option.name} - {moment(new Date(option.dob)).format("L")}</div>
            </div>
        );
    };

    const initialValues = {
        user: null,
        items: [],
    };

    const onSubmitHandler = async (e, { resetForm }) => {
        try {
            const parsedData = validationSchema.parse(e);
            const { data, error } = await CreateOrder({ ...parsedData, user: parsedData.user._id });

            if (error) {
                return;
            }

            console.log(data);
            resetForm();
            setVisible(false);
        } catch (err) {
            if (err.errors) {
            } else {
            }
        }
    };

    return (
        <>
            <Dialog draggable={false} header="Add Order" position='top' visible={visible} className="w-full md:w-[70%] lg:w-[60%]" onHide={() => setVisible(false)}>
                <Formik onSubmit={onSubmitHandler} initialValues={initialValues}>
                    {({ values, setFieldValue, handleSubmit }) => (
                        <>
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="mb-3">
                                    <label htmlFor="name">User <span className="text-red-500 text-sm">*</span> </label>
                                    <Dropdown value={values.user} onChange={(e) => setFieldValue('user', e.value)} filterBy='name' options={data.users && data.users} filterPlaceholder='Search User By Name' optionLabel="user" placeholder="Select a User"
                                        emptyFilterMessage="No User Found"
                                        emptyMessage="You Have No User"
                                        filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full my-2 border outline-none ring-0" />
                                    <ErrorMessage name='user' className='text-red-500 capitalize' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name">Items <span className="text-red-500 text-sm">*</span> </label>
                                    <FieldArray name='items'>
                                        {({ push, remove }) => (
                                            <>
                                                <div className="mb-3 flex justify-end">
                                                    <button type='button' onClick={() => { push({ name: '', price: '' }) }} className='bg-purple-500 px-4 text-white py-2 rounded-md'>Add +</button>
                                                </div>
                                                {values.items.length > 0 && values.items.map((_, i) => (
                                                    <div className='w-full flex items-center justify-between gap-x-4' key={i}>
                                                        <div className="w-1/2">
                                                            <Field name={`items[${i}].name`} className="w-full my-2 border outline-none py-3 px-4" placeholder="Item Name" />
                                                        </div>
                                                        <div className="w-1/2">
                                                            <Field type="number" name={`items[${i}].price`} className="w-full my-2 border outline-none py-3 px-4" placeholder="Item Price" />
                                                        </div>
                                                        <div className="">
                                                            <button onClick={() => { remove(i) }} type='button' className="px-3 py-3 rounded-full bg-black text-white"><FaTrashAlt /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </FieldArray>
                                    <ErrorMessage name='items' className='text-red-500 capitalize' component={'p'} />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center">Add Consumer</Button>
                                </div>
                            </form>
                        </>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

export default AddOrderModel;
