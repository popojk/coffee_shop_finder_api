import Link from 'next/link';
import Layout from '@/components/Layout';
import FilterArea from '@/components/filterArea/FilterArea';
import ResultListArea from '@/components/resultListArea/ResultListArea';

const IndexPage = () => (
	<Layout title='Home'>
		<div className='px-[30%]'>
			<FilterArea />
			<ResultListArea />
		</div>
	</Layout>
);

export default IndexPage;
