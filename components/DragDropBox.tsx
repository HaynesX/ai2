import React, {
    useCallback
    
} from 'react'
import { useDropzone } from 'react-dropzone'
import { useMyContext } from './myContext';
import {cn} from "./cn";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const DragDropBox = () => {
    const { state, dispatch } = useMyContext(); 

    const onDrop = useCallback((acceptedFiles: any[]) => {
      // Since only one file is accepted, we can directly access the first file
      const file = acceptedFiles[0];

      if (!file) {
          toast.error('Only images are allowed');
          return;
      }

      // check if size exists on file
      if (!file.size) {
          toast.error('Only images are allowed');
          return;
      }
  
      // Check if file size is under 50MB and is an image
      if (file.size <= 50 * 1024 * 1024 && file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
              const binaryStr = reader.result
              console.log(binaryStr)
  
              const file = new File(
                  [binaryStr as BlobPart],
                  'imageName'
              );
  
              dispatch({ type: 'SET_IMAGE_FILES', payload: [file] });
          }
          reader.readAsArrayBuffer(file)
      } else {
          if (!file.type.startsWith('image/')) {
              toast.error('File is not an image');
          } else {
              console.log('File size exceeds 50MB');
              toast.error('File size exceeds 50MB');
          }
      }
  }, [])
  
  
  
      
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false})

      const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                delay: 1, 
                duration: 0.5,  
                ease: "easeInOut"
            } 
        }
    };
    


  return (
    
<motion.form
  onSubmit={(e) => e.preventDefault()}
  className="flex h-full items-center w-full lg:w-2/3 mt-4 justify-start"
  initial="hidden"
  animate="visible"
  variants={fadeInVariants}
>
  <label
    htmlFor="dropzone-file"
    className={cn(
      'group relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg dark:border-gray-600 transition',
      { 'dark:border-slate-400 dark:bg-slate-800': isDragActive }
    )}
  >
    <div
      {...getRootProps()}
      className='relative w-full h-full flex flex-col items-center justify-center'
    >
      <div
        className="absolute inset-0 cursor-pointer"
        onDragEnter={(e) => {}}
        onDragLeave={(e) => {}}
        onDragOver={(e) => {}}
        onDrop={(e) => {}}
      />

      <Icon icon="ph:images-duotone" width={50} className="text-gray-500 dark:text-gray-400 mb-2" />

      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> 
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        or drag and drop
      </p>


      <input
        {...getInputProps()}
        
        accept="image/jpeg, image/jpg, image/png, image/webp, image/heic, image/heif"
        type="file"
        
        className="hidden"
      />
    </div>
  </label>
</motion.form>
  )
}

export default DragDropBox