import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { urlFor } from '@/lib/imageBuilder'
import { PortableText } from '@portabletext/react'
import { motion } from "framer-motion";
import { XMarkIcon } from '@heroicons/react/24/outline';

type TeamModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  member: any;
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
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-blue-100 rounded-2xl shadow-2xl p-0 relative w-full max-w-5xl h-[90vh] max-h-[90vh] mx-auto animate-fadeIn flex flex-col md:flex-row overflow-hidden"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 rounded-full bg-white/80 hover:bg-blue-100 p-2 shadow transition-colors border border-blue-100 focus:outline-none"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-6 w-6 text-blue-900" />
                </button>
                {/* Sidebar image */}
                <div className="hidden md:flex flex-col items-center justify-start bg-blue-50 h-full w-1/3 min-w-[220px] max-w-[300px] p-6 border-r border-blue-100">
                  <img
                    src={member?.mainImage ? urlFor(member.mainImage).url() : 'images/team-img1.png'}
                    alt={member?.mainImage?.alt || member?.title || ''}
                    className="w-full h-[260px] object-cover rounded-xl border border-blue-50 shadow-md mb-4"
                  />
                  <div className="w-full text-center mt-2">
                    <h3 className="text-xl font-bold text-blue-1300">{member?.title || ''}</h3>
                    <p className="text-blue-1000 text-base font-medium">{member?.position || ''}</p>
                    <p className="text-blue-700 text-sm font-semibold mt-1">GDC No: <span className="font-normal text-blue-900">{member?.gdn_no || ''}</span></p>
                  </div>
                </div>
                {/* Main content */}
                <div className="flex-1 flex flex-col h-full max-h-full overflow-y-auto p-6 md:p-10 text-left">
                  {/* Mobile image and info */}
                  <div className="md:hidden flex flex-col items-center mb-4">
                    <img
                      src={member?.mainImage ? urlFor(member.mainImage).url() : 'images/team-img1.png'}
                      alt={member?.mainImage?.alt || member?.title || ''}
                      className="w-full max-w-[220px] h-[180px] object-cover rounded-xl border border-blue-50 shadow-md mb-2"
                    />
                    <h3 className="text-xl font-bold text-blue-1300">{member?.title || ''}</h3>
                    <p className="text-blue-1000 text-base font-medium">{member?.position || ''}</p>
                    <p className="text-blue-700 text-sm font-semibold mt-1">GDC No: <span className="font-normal text-blue-900">{member?.gdn_no || ''}</span></p>
                  </div>
                  {/* Body content */}
                  {member?.body && (
                    <div className="prose max-w-none text-gray-700 overflow-auto prose-li:marker:text-blue-1300 prose-ul:pl-6 prose-ol:pl-6 prose-li:pl-1">
                      <PortableText value={member.body} components={{
                        block: {
                          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-blue-1300">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 text-blue-1200">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 text-blue-1100">{children}</h3>,
                          normal: ({ children }) => <p className="mb-4 text-base text-gray-700">{children}</p>,
                        },
                        types: {
                          image: ({ value }) => (
                            <div className="my-6">
                              <img
                                src={urlFor(value).url()}
                                alt={value.alt || ''}
                                className="w-full max-w-[350px] max-h-[350px] object-contain rounded-xl shadow"
                              />
                            </div>
                          ),
                        },
                        marks: {
                          link: ({ children, value }) => {
                            const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
                            const target = !value.href.startsWith('/') ? '_blank' : undefined;
                            return (
                              <a href={value.href} target={target} rel={rel} className="text-blue-600 hover:underline">
                                {children}
                              </a>
                            );
                          },
                        },
                        list: {
                          bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                          number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({ children }) => <li className="mb-1">{children}</li>,
                          number: ({ children }) => <li className="mb-1">{children}</li>,
                        },
                      }} />
                    </div>
                  )}

                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}