import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './layout/MainLayout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slice/userSlice';
import { axiosinstance } from './utils/axiosinstance';
function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosinstance.get('/api/profile'); 
        dispatch(setUser(data.user));
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    const token = localStorage.getItem('token') || '';

    if (!token) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}

export default App;
