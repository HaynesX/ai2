"use client";
import React, { useEffect } from 'react'
import NeuroCarTitle from './NeuroCarTitle';
import NeuroCarDescription from './NeuroCarDescription';
import DragDropBox from './DragDropBox';
import { useMyContext } from './myContext';

export type DragDropPageProps = React.HTMLAttributes<HTMLFormElement> & {
  onNavigate?: (destination: string) => void;
};


const DragDropPage = React.forwardRef<HTMLFormElement, DragDropPageProps>(({ className, onNavigate, ...props }, ref: any) => {

  const { state, dispatch } = useMyContext();

  useEffect(() => {
    dispatch({type: 'SET_ALL_NULL'});
  }, [])

    return (
      <div className="flex flex-col gap-4 justify-center items-center">

        <div className='flex justify-center gap-2 flex-col items-center max-w-[700px]'>
          <NeuroCarTitle />
          <NeuroCarDescription />
        </div>

        <DragDropBox />

      </div>
    );
  },
);

DragDropPage.displayName = "DragDropPage";

export default DragDropPage;
