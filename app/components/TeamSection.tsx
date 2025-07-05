'use client'

import { useState } from 'react'
import { urlFor } from '@/lib/imageBuilder'
import TeamModal from './TeamModal'

type TeamSectionProps = {
  team: any[]
}

export default function TeamSection({ team }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:gap-y-12 md:gap-8 gap-6">
        {team.map((member: any) => (
          <div 
            key={member._id} 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(member)}
          >
            <div className='relative'>
              <img 
                src={member.mainImage ? urlFor(member.mainImage).url() : "images/team-img1.png"} 
                alt={member.mainImage?.alt || member.title} 
                className='w-full h-[231px] object-cover'
              />
              <div className='absolute bottom-0 right-0'>
                <img src="images/cube-icon2.png" className='w-[99px]' alt="" />
              </div>
            </div>
            <h4 className='text-xl font-semibold mt-6 mb-0.5 leading-[30px] text-blue-1300'>{member.title}</h4>
            <h6 className='text-lg leading-7 font-normal mb-4 text-blue-1000'>{member.position}</h6>
            {member.gdn_no && (
              <span className='text-base font-normal leading-6 text-tertiary-600'>GDC No: {member.gdn_no}</span>
            )}
          </div>
        ))}
      </div>
      <TeamModal 
        isOpen={isModalOpen}
        closeModal={closeModal}
        member={selectedMember}
      />
    </>
  )
}