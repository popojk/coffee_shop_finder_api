import React, { ChangeEvent, FormEvent, useState } from 'react';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';
import AuthAPI from '@/api/auth';
import { useRouter } from 'next/router';

export type User = {
	id: number,
	username: string,
	token: string,
}

const Login = () => {
	const [user, setUser] = useRecoilState<User | null>(userState);

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const authAPI = new AuthAPI();
			const response = await authAPI.login(username, password);
			if (response?.status === 200) {
				localStorage.setItem('user', response.data.user);
				const loginUser = {
					id: response.data.user.id,
					username: response.data.user.username,
					token: response.data.user.token,
				}
				await setUser(loginUser);
				router.push('/');
			}
		} catch (err) {
			setError('登入失敗，請檢查帳號密碼');
		}
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
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
						登入帳號吧🥰
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
									required
									value={username}
									onChange={handleEmailChange}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1.5'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>
									密碼
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-[#D1590B] hover:text-[#F18741]'
									>
										忘記密碼?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									required
									value={password}
									onChange={handlePasswordChange}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1.5'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-[#D1590B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#F18741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								登入
							</button>
						</div>
					</form>

					{error && <div className='mt-4 text-center text-sm text-red-600'>{error}</div>}

					<p className='mt-10 text-center text-sm text-gray-500'>
						還不是會員?🤨
						<a
							href='/register'
							className='font-semibold leading-6 text-[#D1590B] hover:text-[#F18741]'
						>
							註冊吧
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
