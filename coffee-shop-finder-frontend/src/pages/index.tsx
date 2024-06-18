import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Layout from '@/components/Layout';
import FilterArea from '@/components/filterArea/FilterArea';
import ResultListArea from '@/components/resultListArea/ResultListArea';
import SearchBar from '@/components/navbar/SearchBar';
import { keyWordState } from '@/states';

const IndexPage = () => {
	const [keyWord, setKeyWord] = useRecoilState(keyWordState);

	return (
		<Layout title='Home'>
			<div className='px-[30%]'>
				<SearchBar />
				<FilterArea />
				<ResultListArea />
			</div>
		</Layout>
	);
};

export default IndexPage;
