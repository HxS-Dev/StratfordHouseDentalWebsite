import { allTreatmentsQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const TreatmentsDropdown = () => {

  const [loading, setLoading] = useState(true);
  const [treatments, setTreatments] = useState<any[]>([]);

  useEffect(() => {
       const fetchTreatments = async () => {
            try {
                 const data = await sanityClient.fetch(allTreatmentsQuery);
                 setTreatments(data);
            } catch (error) {
                 console.error('Error fetching treatments:', error);
            } finally {
                 setLoading(false);
            }
       };

       fetchTreatments();
  }, []);


  return (
    <div className="relative inline-block text-left group">
      <Link href={"/treatment"} className=" cursor-pointer text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block hover:text-blue-1000">
        Treatments
      </Link>

      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {treatments.map((treatment) => (
            <Link
              key={treatment._id}
              href={`/treatment/${treatment.slug.current}`}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-1000 transition-colors duration-200"
            >
              {treatment.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TreatmentsDropdown;