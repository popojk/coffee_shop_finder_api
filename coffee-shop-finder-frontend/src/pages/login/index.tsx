import Link from 'next/link';
import Layout from '@/components/Layout';
import Login from '@/components/login/Login';

const IndexPage = () => (
	<Layout title='Home'>
		<div className='px-[30%]'>
			<Login />
		</div>
	</Layout>
);

export default IndexPage;
