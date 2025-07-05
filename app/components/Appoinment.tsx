'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { bookingLinkQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';

function Appoinment() {
    const [bookingLink, setBookingLink] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            const data = await sanityClient.fetch(bookingLinkQuery);
            setBookingLink(data?.bookingLink || '');
        };
        fetchLink();
    }, []);

    return (
        <section className="md:mx-5 mx-4 md:py-16 pt-10">
            <div className="xl:max-w-[1230px] relative w-full max-w-[952px] bg-blue-1200 md:py-[90px] py-[34px] md:px-20 px-4 mx-auto">
                <h2 className="md:text-2xl text-xl font-medium leading-[125%] md:mb-5 mb-4 text-white max-w-[823px]">
                    We welcome all new and existing patients, Register Online for an initial patient consultation, Book An Appointment, or call 01908 313109 to speak to us.
                </h2>
                <Link
                    href={bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:text-base transition-all duration-300 hover:bg-blue-1400 text-sm bg-blue-1500 font-semibold leading-[150%] text-blue-1300 inline-block py-[14px] px-6"
                >
                    Book Appointment Now
                </Link>
                <div className="absolute bottom-0 right-0">
                    <img src="images/cube-img3.png" className="md:w-auto w-[98px]" alt="" />
                </div>
            </div>
        </section>
    );
}

export default Appoinment;
