import { allTreatmentsQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TreatmentsDropdown = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [treatments, setTreatments] = useState<any[]>([]);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const data = await sanityClient.fetch(allTreatmentsQuery);
        setTreatments(data);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, []);

  // Close dropdown when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (window.innerWidth < 1024) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full lg:w-auto group">
      {/* Desktop: Link with hover dropdown */}
      <Link
        href="/treatment"
        className={`hidden lg:block cursor-pointer text-lg font-medium leading-6 transition-all duration-300 rounded-md px-2 ${pathname.startsWith('/treatment') ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`}
      >
        Treatments
      </Link>

      {/* Mobile: Button with click dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden cursor-pointer text-lg font-medium leading-6 block transition-all duration-300 rounded-md px-2 w-full text-left ${pathname.startsWith('/treatment') ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`}
      >
        Treatments
      </button>

      {/* Desktop dropdown (CSS hover) */}
      <div className="hidden lg:block absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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

      {/* Mobile dropdown (JS controlled) */}
      {isOpen && (
        <div className="lg:hidden relative mt-2 w-full bg-white rounded-md">
          <div className="py-1">
            {treatments.map((treatment) => (
              <Link
                key={treatment._id}
                href={`/treatment/${treatment.slug.current}`}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-1000 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {treatment.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TreatmentsDropdown;