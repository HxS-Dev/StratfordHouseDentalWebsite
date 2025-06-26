"use client";

import React, { useState } from "react";
import { PortableText } from "@portabletext/react";

// Minimal components for rendering accordion body
const accordionComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-2">{children}</p>,
    h4: ({ children }: any) => <h4 className="font-semibold text-lg mb-2">{children}</h4>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export default function AccordionBlock({ value }: { value: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-2 w-full border border-blue-200 rounded-2xl shadow-md bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left text-blue-1200 font-semibold text-lg focus:outline-none transition-colors hover:bg-blue-200 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <svg className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          <span>{value.title}</span>
        </span>
        <svg
          className={`w-6 h-6 ml-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 bg-white px-6 ${open ? 'max-h-[1000px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'} overflow-hidden border-t border-blue-100`}
      >
        <div className="prose max-w-none text-inherit">
          <PortableText value={value.body} components={accordionComponents} />
        </div>
      </div>
    </div>
  );
}
