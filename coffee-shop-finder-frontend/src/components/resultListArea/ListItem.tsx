import React from 'react';
import ConditionCheck from './ConditionCheck';

type Props = {
	name: string;
	address: string;
	rating: number;
	hasWifi: boolean;
	hasSocket: boolean;
	hasNoLimitedTime: boolean;
	isLiked: boolean;
	reviewCount: number;
};
const ListItem = ({
	name,
	address,
	rating,
	hasWifi,
	hasSocket,
	hasNoLimitedTime,
	isLiked,
}: Props) => (
	<div className='flex mx-[30px] my-[5px] rounded-lg py-[15px] border-b-2 hover:bg-slate-200'>
		<div className='w-[90%]'>
			<div className='font-serif text-lg text-[#D1590B]'>{name}</div>
			<div className='text-sm '>{address}</div>
			<div className='mt-[5px] flex'>
				<ConditionCheck isCheck={hasWifi} title={'WIFI'} />
				<ConditionCheck isCheck={hasSocket} title={'插座'} />
				<ConditionCheck isCheck={hasNoLimitedTime} title={'無限時'} />
			</div>
		</div>
		<div className='w-[10%] pt-2'>
			<div className='flex justify-end group'>
				<div className='bg-[#E56F61] mr-2 w-10 rounded-md flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='#F5EB0F'
						className='size-4 ml-0.5'
					>
						<path
							fill-rule='evenodd'
							d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
							clip-rule='evenodd'
						/>
					</svg>
					<div className='ml-0.5 text-sm'>{rating}</div>
				</div>
				{isLiked ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='#EE1262'
						className='size-6 group-hover:fill-[#E66D99]'
					>
						<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='#EE1262'
						className='size-6 group-hover:stroke-[#E66D99]'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
						/>
					</svg>
				)}
			</div>
		</div>
	</div>
);

export default ListItem;
