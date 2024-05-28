import React from 'react';

const Login = () => (
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
				<form className='space-y-6' action='#' method='POST'>
					<div>
						<label className='block text-sm font-medium leading-6 text-gray-900'>
							Email
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label className='block text-sm font-medium leading-6 text-gray-900'>
								Password
							</label>
							<div className='text-sm'>
								<a
									href='#'
									className='font-semibold text-[#D1590B] hover:text-[#F18741]'
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-[#D1590B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#F18741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign in
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm text-gray-500'>
					還不是會員?🤨
					<a
						href='#'
						className='font-semibold leading-6 text-[#D1590B] hover:text-[#F18741]'
					>
					    註冊吧
					</a>
				</p>
			</div>
		</div>
	</div>
);

export default Login;
