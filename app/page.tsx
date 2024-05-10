"use client";
import React, {useState, useEffect, useContext} from 'react';
import { AnimatePresence } from 'framer-motion';
import useTransitionContent from "@/components/TransitionContentUtils/useTransitionContent";
import { TransitionWrapper } from '@/components/TransitionContentUtils/TransitionWrapper';
import Main from '@/components/Main';





export default function Component() {
  const { currentPage, navigateTo, navigateBack } = useTransitionContent('main');



  const pages = {
    main: {
      component: <Main />,
    },
   
    }



  return (
        <AnimatePresence mode='wait'>
          <TransitionWrapper key={currentPage}>
            <div className="relative flex w-full flex-col text-center h-full justify-center items-center pt-12 px-2 sm:px-0 sm:pt-0">
                {pages[currentPage as keyof typeof pages].component}
            </div>
          </TransitionWrapper>
        </AnimatePresence>
  );
}

