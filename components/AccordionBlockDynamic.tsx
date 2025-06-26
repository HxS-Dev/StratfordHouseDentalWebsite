"use client";
import dynamic from "next/dynamic";
import React from "react";

const AccordionBlock = dynamic(() => import("./AccordionBlock"));

export default function AccordionBlockDynamic(props: any) {
  return <AccordionBlock {...props} />;
}
