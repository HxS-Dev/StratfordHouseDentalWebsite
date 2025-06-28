import { allFeesQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const FeesDropdown = () => {

  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState<any[]>([]);

  useEffect(() => {
       const fetchFees = async () => {
            try {
                 const data = await sanityClient.fetch(allFeesQuery);
                 setFees(data);
            } catch (error) {
                 console.error('Error fetching fees:', error);
            } finally {
                 setLoading(false);
            }
       };

       fetchFees();
  }, []);


  return (
    <div className="relative inline-block text-left group">
      <Link href={"/fees"} className=" cursor-pointer text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block hover:text-blue-1000">
        Fees
      </Link>

      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {fees.map((fees) => (
            <Link
              key={fees._id}
              href={`/fees/${fees.slug.current}`}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-1000 transition-colors duration-200"
            >
              {fees.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeesDropdown;