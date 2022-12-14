import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import Error from '../components/Error';
import { deserialize } from 'superjson';
import Loading from '../components/Loading';

enum FormStatus {
  VALID,
  ERROR,
  SUBMITTED
}

type FormState = {
  status: FormStatus,
  message?: string,
}

const Home: NextPage = () => {
  const { mutateAsync, error, isError, isLoading } = trpc.useMutation(['form.create']);
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
  });

  const [formStatus, setFormStatus] = useState<FormState>({ status: FormStatus.VALID });

  useEffect(() => {
    if (error?.data?.zodError) {
      const field = Object.keys(error.data.zodError.fieldErrors)[0];
      setFormStatus({ status: FormStatus.ERROR, message: error.data.zodError.fieldErrors[field!]![0] });
    } else if (error?.message) {
      setFormStatus({ status: FormStatus.ERROR, message: error.message });
    }
  }, [error, isError])




  return (
    <>
      <Head>
        <title>Contribute to an Oppdev project</title>
        <meta name='description' content='Fill this form out to contribute' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {isLoading && <Loading />}

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700'>Contribute</h1>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div aria-live='assertive'>
            {
              formStatus.status === FormStatus.ERROR && <Error message={formStatus.message} />
            }
          </div>
          <div aria-live='polite'>
            {
              formStatus.status === FormStatus.SUBMITTED && <div className='text-center text-lg font-bold'>Thanks for your contribution!</div>
            }
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await mutateAsync({
                name: formData.name,
                username: formData.userName,
                email: formData.email,
              });
              setFormData({
                name: '',
                userName: '',
                email: '',
              });
              setFormStatus({ status: FormStatus.SUBMITTED });
            } catch {
              setFormStatus({ status: FormStatus.ERROR, message: "Something went wrong..." });
            }
          }} >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type='text'
                placeholder='Name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type='text'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Github Username</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type='text'
                placeholder='Github Username'
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
              {/* hint text explaining that the username needs to match what you have set up */}
              <p className='text-gray-600 text-xs italic'>
                This needs to match what you have set up in your git config.
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;