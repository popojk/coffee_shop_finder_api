import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from 'react';
import ShopsAPI from '@/api/shops';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { userState } from '@/states';
import ReviewAPI from '@/api/review';
import type { User } from '../login/Login';

type Review = {
	userId: number;
	username: string;
	avatar: string;
	content: string;
	updated_at: Date;
};

type ShopDetail = {
	seat: number;
	longitude: number;
	quiet: number;
	limited_time: boolean;
	id: string;
	tasty: number;
	socket: boolean;
	name: string;
	cheap: number;
	standing_desk: boolean;
	city: string;
	music: number;
	mrt: string;
	district: string;
	url: string;
	open_time: string;
	wifi: number;
	address: string;
	latitude: number;
	reviews: Review[];
};

type Props = {
	shopId: string;
};

const DetailArea = ({ shopId }: Props) => {
	const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null);
	const [reviewList, setReviewList] = useState<Review[]>([]);
	const [user, setUser] = useRecoilState<User | null>(userState);

	const [reviewText, setReviewText] = useState<string>('')

	const router = useRouter();

	useEffect(() => {
		try {
			const shopAPI = new ShopsAPI();
			shopAPI.getShopById(shopId).then((response) => {
				if (response.status === 200) {
					setShopDetail(response.data);
					setReviewList(response.data.reviews);
				} else {
					throw new Error('cannot find shops');
				}
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	const handleReviewTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault()
		setReviewText(e.target.value);
	};

	const handleSendReview = () => {
		const reviewAPI = new ReviewAPI();
		reviewAPI.postReview(reviewText, user!.id, shopId, user!.token)
		.then((response) => {
			console.log(response)
		})
		.catch((err) => console.log(err))
	}

	return (
		<div className='mt-[40px] h-auto bg-neutral-100 rounded-lg shadow-md max-h-[80vh] overflow-y-auto'>
			<div className='mx-5'>
				<div className='text-2xl font-bold py-2'>{shopDetail?.name}</div>
				<div className='mt-3 mb-2 border-b-2 text-neutral-400'>
					{shopDetail?.city} {shopDetail?.district}
				</div>
				<div className='grid grid-cols-2 border-b-2 mb-2'>
					<div className='grid grid-cols-6  mt-1'>
						<div className='col-start-1 col-end-3'>wifi穩定</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.wifi}</div>
					</div>
					<div className='grid grid-cols-6 mt-1'>
						<div className='col-start-1 col-end-3'>通常有位</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.seat}</div>
					</div>
					<div className='grid grid-cols-6 mt-1'>
						<div className='col-start-1 col-end-3'>安靜程度</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.quiet}</div>
					</div>
					<div className='grid grid-cols-6 mt-1'>
						<div className='col-start-1 col-end-3'>美味程度</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.tasty}</div>
					</div>
					<div className='grid grid-cols-6 mt-1'>
						<div className='col-start-1 col-end-3'>價格便宜</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.cheap}</div>
					</div>
					<div className='grid grid-cols-6 mt-1'>
						<div className='col-start-1 col-end-3'>音樂好聽</div>
						<div className='col-end-7 text-[#D1590B]'>{shopDetail?.music}</div>
					</div>
				</div>
				<div className='text-xl font-bold mt-2'>店家資訊</div>
				<div className='grid grid-cols-2 border-b-2 mb-2'>
					<div className='grid grid-cols-6  mt-1'>
						<div className='col-start-1 col-end-3'>有wifi</div>
						<div className='col-end-7'>
							{shopDetail?.wifi !== null ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#45E13B'
									className='size-4'
								>
									<path
										fillRule='evenodd'
										d='M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#F81F0D'
									className='size-4'
								>
									<path
										fill-rule='evenodd'
										d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
										clip-rule='evenodd'
									/>
								</svg>
							)}
						</div>
					</div>
					<div className='grid grid-cols-6  mt-1'>
						<div className='col-start-1 col-end-3'>有插座</div>
						<div className='col-end-7'>
							{shopDetail?.socket ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#45E13B'
									className='size-4'
								>
									<path
										fillRule='evenodd'
										d='M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#F81F0D'
									className='size-4'
								>
									<path
										fill-rule='evenodd'
										d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
										clip-rule='evenodd'
									/>
								</svg>
							)}
						</div>
					</div>
					<div className='grid grid-cols-6  mt-1'>
						<div className='col-start-1 col-end-3'>不限時</div>
						<div className='col-end-7'>
							{shopDetail?.limited_time ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#45E13B'
									className='size-4'
								>
									<path
										fillRule='evenodd'
										d='M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#F81F0D'
									className='size-4'
								>
									<path
										fill-rule='evenodd'
										d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
										clip-rule='evenodd'
									/>
								</svg>
							)}
						</div>
						<div></div>
					</div>
					<div className='grid grid-cols-6  mt-1'>
						<div className='col-start-1 col-end-3'>高腳椅</div>
						<div className='col-end-7'>
							{shopDetail?.standing_desk ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#45E13B'
									className='size-4'
								>
									<path
										fillRule='evenodd'
										d='M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#F81F0D'
									className='size-4'
								>
									<path
										fill-rule='evenodd'
										d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
										clip-rule='evenodd'
									/>
								</svg>
							)}
						</div>
						<div></div>
					</div>
				</div>
				<div className='border-b-2'>
					<div className='mt-1'>
						官網:
						<span className='ml-1'>
							<a href={shopDetail?.url} className='text-blue-500'>
								{shopDetail?.url}
							</a>
						</span>
					</div>
					<div className='mt-1'>
						捷運站:
						<span className='ml-1'>{shopDetail?.mrt}</span>
					</div>
					<div className='mt-1'>
						地址:
						<span className='ml-1'>{shopDetail?.address}</span>
					</div>
				</div>
				<div className='text-xl font-bold mt-2'>留下評論</div>
				<div>
					<section className='bg-neutral-100 py-3 antialiased'>
						<div className='max-w-2xl'>
							{user === null ? (
								<div className='mb-2'>
									先
									<span
										className='text-blue-500 cursor-pointer'
										onClick={() => router.push('/login')}
									>
										登入
									</span>
									才能留言喔
								</div>
							) : (
								<form className='mb-6' onSubmit={handleSendReview}>
									<div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
										<textarea
											id='comment'
											className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none'
											placeholder='寫下評論...'
											value={reviewText}
											onChange={handleReviewTextChange}
											required
										></textarea>
									</div>
									<button
										type='submit'
										className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#D1590B] rounded-lg focus:ring-4 hover:bg-[#F18741]'
									>
										送出評論
									</button>
								</form>
							)}

							{reviewList.length === 0 ? (
								<div>目前尚無留言</div>
							) : (
								reviewList.map((review: Review) => {
									return (
										<article className='p-6 my-2 text-base bg-white rounded-lg'>
											<footer className='flex justify-between items-center mb-2'>
												<div className='flex items-center'>
													<p className='inline-flex items-center mr-3 text-sm text-gray-900 font-semibold'>
														<img
															className='mr-2 w-6 h-6 rounded-full'
															src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
															alt='Michael Gough'
														/>
														{review.username}
													</p>
													<p className='text-sm text-gray-600 dark:text-gray-400'>
														Feb. 8, 2022
													</p>
												</div>
												<button
													id='dropdownComment1Button'
													data-dropdown-toggle='dropdownComment1'
													className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50'
													type='button'
												>
													<svg
														className='w-4 h-4'
														aria-hidden='true'
														xmlns='http://www.w3.org/2000/svg'
														fill='currentColor'
														viewBox='0 0 16 3'
													>
														<path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
													</svg>
													<span className='sr-only'>
														Comment settings
													</span>
												</button>
												<div
													id='dropdownComment1'
													className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
												>
													<ul
														className='py-1 text-sm text-gray-700 dark:text-gray-200'
														aria-labelledby='dropdownMenuIconHorizontalButton'
													>
														<li>
															<a
																href='#'
																className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
															>
																Edit
															</a>
														</li>
														<li>
															<a
																href='#'
																className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
															>
																Remove
															</a>
														</li>
														<li>
															<a
																href='#'
																className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
															>
																Report
															</a>
														</li>
													</ul>
												</div>
											</footer>
											<p className='text-gray-500 dark:text-gray-400'>
												{review.content}
											</p>
										</article>
									);
								})
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default DetailArea;
