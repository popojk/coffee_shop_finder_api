import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import AuthAPI from '@/api/auth';
import { userState } from '@/states';

const Register = () => {
	const router = useRouter();

	const [user, setUser] = useRecoilState(userState);

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const authAPI = new AuthAPI();
			const response = await authAPI.register(username, password);
			if (response?.status === 200) {
				localStorage.setItem('token', response.data.token);
				await setUser(response.data.user);
				router.push('/login');
			}
		} catch (err) {
			setError('登录失败，请检查您的凭证。');
		}
	};

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className='mt-[20px] h-[70vh] bg-neutral-100 rounded-lg shadow-md'>
			<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						className='mx-auto h-20 w-20'
						src='/coffee-cup-icon.png'
						alt='Your Company'
					/>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						註冊帳號吧🥰
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label className='block text-sm font-medium leading-6 text-gray-900'>
								帳號/Email
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									value={username}
									onChange={handleUsernameChange}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1.5'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>
									密碼
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									value={password}
									onChange={handlePasswordChange}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1.5'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-[#D1590B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#F18741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								註冊
							</button>
						</div>
					</form>

					{error && <div className='mt-4 text-center text-sm text-red-600'>{error}</div>}

					<p className='mt-10 text-center text-sm text-gray-500'>
						已經有帳號?
						<a
							href='/login'
							className='font-semibold leading-6 text-[#D1590B] hover:text-[#F18741]'
						>
							登入吧
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
