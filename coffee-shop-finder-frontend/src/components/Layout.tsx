import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'coffee shop finder' }: Props) => {
	const [user, setUser] = useRecoilState(userState);

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) {
			setUser(user)
		}
	}, [])

	const handleLogout = async () => {
		localStorage.removeItem('user');
		await setUser(null);
	};

	return (
		<div className='min-h-screen w-full'>
			<Head>
				<title>跑咖咖</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<link rel='icon' href='/coffee-cup-icon.png' />
			</Head>
			<div className='absolute inset-0 bg-[url("/coffee_beans.jpg")] opacity-70'></div>
			<div className='relative z-10'>
				<header>
					<nav className='h-[55px] bg-[#f8d943] flex items-center px-[30%] shadow-md'>
						<Link href='/' passHref className='flex items-center'>
							<Image src='/coffee-cup-icon.png' alt='Logo' width={50} height={50} />
							<span className='ml-2 font-serif text-[#D1590B] hover:text-[#F18741]'>
								首頁
							</span>
						</Link>
						<Link
							href=''
							className='font-serif ml-[10px] text-[#D1590B] hover:text-[#F18741]'
						>
							推薦
						</Link>
						<div className='flex justify-end ml-auto'>
							{user === null ? (
								<>
									<Link
										href='/login'
										className='font-serif text-[#D1590B] hover:text-[#F18741]'
									>
										登入
									</Link>
									<span className='font-serif mx-2 text-[#D1590B] hover:text-[#F18741]'>
										{' '}
										/{' '}
									</span>
									<Link
										href='/register'
										className='font-serif text-[#D1590B] hover:text-[#F18741]'
									>
										註冊
									</Link>
								</>
							) : (
								<div
									className='font-serif text-[#D1590B] hover:text-[#F18741]'
									onClick={handleLogout}
								>
									登出
								</div>
							)}
						</div>
					</nav>
				</header>
				{children}
			</div>
		</div>
	);
};

export default Layout;
