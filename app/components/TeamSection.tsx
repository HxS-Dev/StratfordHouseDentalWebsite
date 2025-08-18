'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

  // Add safety check for team data
  if (!team || !Array.isArray(team) || team.length === 0) {
    return (
      <div className="text-center py-10 text-lg text-gray-500">
        No team members available at the moment.
      </div>
    );
  }

  const getImageUrl = (member: any) => {
    try {
      if (member.mainImage && member.mainImage.asset) {
        return urlFor(member.mainImage).url();
      }
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
    return "/images/team-img1.png";
  };

  return (
    <>
      <motion.div 
        className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-y-12 md:gap-8 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {team.map((member: any, index: number) => (
          <motion.div 
            key={member._id || index} 
            className="cursor-pointer hover:opacity-90 transition-opacity bg-white"
            onClick={() => openModal(member)}
            style={{ minHeight: '300px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className='relative bg-gray-100'>
              <img 
                src={getImageUrl(member)}
                alt={member.mainImage?.alt || member.title || 'Team member'} 
                className='w-full h-[231px] object-cover bg-gray-200'
                onError={(e) => {
                  e.currentTarget.src = '/images/team-img1.png';
                }}
                loading="lazy"
              />
              <div className='absolute bottom-0 right-0'>
                <img 
                  src="/images/cube-icon2.png" 
                  className='w-[99px]' 
                  alt="" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="py-4">
              <h4 className='text-xl font-semibold mt-2 mb-0.5 leading-[30px] text-blue-1300'>
                {member.title || 'Team Member'}
              </h4>
              <h6 className='text-lg leading-7 font-normal mb-4 text-blue-1000'>
                {member.position || 'Position'}
              </h6>
              {member.gdn_no && (
                <span className='text-base font-normal leading-6 text-tertiary-600'>
                  GDC No: {member.gdn_no}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <TeamModal 
        isOpen={isModalOpen}
        closeModal={closeModal}
        member={selectedMember}
      />
    </>
  )
}