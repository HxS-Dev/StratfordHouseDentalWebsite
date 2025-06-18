import Link from 'next/link';
import { ReactNode } from 'react';

interface BookAppointmentLinkProps {
     children: ReactNode;
     href?: string;
}


function Button({ children, href = '/' }: BookAppointmentLinkProps) {
     return (
          <Link href={href} className="text-white md:text-base text-sm transtion ease-in-out duration-500 hover:text-blue-1000 hover:bg-transparent border border-blue-1000 font-medium leading-6 p-4 py-3 bg-blue-1000 inline-block">
               {children}
          </Link>
     )
}

export default Button
