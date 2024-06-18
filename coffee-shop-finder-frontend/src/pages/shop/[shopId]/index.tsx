import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import DetailArea from '@/components/DetailArea/DetailArea';

const page = () => {
	const router = useRouter();
	const [shopId, setShopId] = useState<string>('');

	useEffect(() => {
		if (router.isReady) {
			const { shopId } = router.query;
			setShopId(shopId as string);
		}
	}, [router.isReady, router.query]);

	return (
		<Layout title='Home'>
			<div className='px-[30%]'>
				{shopId !== '' ? <DetailArea shopId={shopId} /> : <p>Loading...</p>}
			</div>
		</Layout>
	);
};

export default page;
