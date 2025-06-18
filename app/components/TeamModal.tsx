import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { urlFor } from '@/lib/imageBuilder'
import { PortableText } from '@portabletext/react'
import { motion } from "framer-motion";
import { XMarkIcon } from '@heroicons/react/24/outline';

type TeamModalProps = {
  isOpen: boolean
  closeModal: () => void
  member: any
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="lg:w-1/2 lg:max-h-[464px] h-auto img-wrap-cms">
          <img
            src={urlFor(value).url()}
            alt={value.alt || ''}
            className="w-full h-full lg:max-h-[464px] object-cover"
          />
        </div>
      )
    },
  },
}

export default function TeamModal({ isOpen, closeModal, member }: TeamModalProps) {
  if (!member) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <motion.div
                className="bg-white border border-blue-100 rounded-2xl shadow-2xl p-0 md:p-10 p-4 relative w-full max-w-2xl md:max-w-3xl mx-auto animate-fadeIn"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-blue-100 p-2 shadow transition-colors border border-blue-100 focus:outline-none"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-6 w-6 text-blue-900" />
                </button>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <motion.div
                    className="md:w-1/3 w-full flex-shrink-0"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <img
                      src={member?.mainImage ? urlFor(member.mainImage).url() : "images/team-img1.png"}
                      alt={member?.mainImage?.alt || member?.title || ''}
                      className="w-full h-[320px] md:h-[400px] object-cover rounded-xl border border-blue-50 shadow-md"
                    />
                  </motion.div>
                  <div className="md:w-2/3 w-full text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl md:text-3xl font-bold leading-7 text-blue-1300 mb-1"
                    >
                      {member?.title || ''}
                    </Dialog.Title>
                    <h4 className="text-lg md:text-xl text-blue-1000 mb-2 font-medium tracking-wide">{member?.position || ''}</h4>
                    <p className="text-sm md:text-base text-blue-700 mb-4 font-semibold">GDC No: <span className="font-normal text-blue-900">{member?.gdn_no || ''}</span></p>
                    <hr className="my-3 border-blue-100" />
                    {member?.body && (
                      <div className="prose max-w-none max-h-[240px] md:max-h-[280px] overflow-auto text-gray-700">
                        <PortableText value={member.body} components={components} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-100 px-5 py-2 text-base font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-5 w-5" /> Close
                  </button>
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}