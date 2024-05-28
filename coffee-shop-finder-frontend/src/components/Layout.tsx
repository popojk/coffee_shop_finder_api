import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import SearchBar from './navbar/SearchBar';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'coffee shop finder' }: Props) => (
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
					<SearchBar />
					<Link
						href=''
						className='font-serif ml-auto text-[#D1590B] hover:text-[#F18741]'
					>
						登入/註冊
					</Link>
				</nav>
			</header>
			{children}
		</div>
	</div>
);

export default Layout;
