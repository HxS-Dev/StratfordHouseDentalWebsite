'use client'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import Image from 'next/image'

const languages = [
  { id: 1, name: 'English', code: 'en', countryCode: 'us' },
  { id: 2, name: 'Spanish', code: 'es', countryCode: 'es' },
  { id: 3, name: 'French', code: 'fr', countryCode: 'fr' },
  { id: 4, name: 'German', code: 'de', countryCode: 'de' },
  { id: 5, name: 'Italian', code: 'it', countryCode: 'it' },
]

const getFlagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`

export default function LangDropdown() {
  const [selected, setSelected] = useState(languages[0])

  return (
    <div className="w-38">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative flex w-full cursor-pointer transition-all duration-300 hover:bg-blue-1400/80 items-center bg-blue-1400 py-2 pl-3 text-left text-base font-medium text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        >
          <Image
            src={getFlagUrl(selected.countryCode)}
            alt={`${selected.name} flag`}
            width={20}
            height={20}
            className="mr-2 w-5 h-5 object-cover rounded-full"
          />
          <span>{selected.name}</span>
        
          <svg
           className="group pointer-events-none absolute right-3 size-3"
            aria-hidden="true"
          width={10}
          height={6}
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--button-width) border border-white/5 bg-blue-1400 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {languages.map((language) => (
            <ListboxOption
              key={language.code}
              value={language}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <Image
                src={getFlagUrl(language.countryCode)}
                alt={`${language.name} flag`}
                width={20}
                height={15}
                className="mr-2"
              />
              <div className="text-sm/6 text-white">{language.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}