import Link from 'next/link';
import Layout from '@/components/Layout';
import Register from '@/components/register/Register';

const IndexPage = () => (
	<Layout title='Home'>
		<div className='px-[30%]'>
			<Register />
		</div>
	</Layout>
);

export default IndexPage;
