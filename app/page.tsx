"use client";
import React, {useState, useEffect, useContext} from 'react';
import { AnimatePresence } from 'framer-motion';
import DragDropPage from "@/components/DragDropPage";
import useTransitionContent from "@/components/TransitionContentUtils/useTransitionContent";
import { TransitionWrapper } from '@/components/TransitionContentUtils/TransitionWrapper';
import { useMyContext } from '@/components/myContext';

import * as tf from '@tensorflow/tfjs';
import LoaderPage from '@/components/LoaderPage';
import PredictingLoadingPage from '@/components/PredictingLoadingPage';
import { toast } from 'sonner';
import FinalPage from '@/components/FinalPage';
import { L1L2Args } from '@tensorflow/tfjs-layers/dist/regularizers';

tf.ENV.set('DEBUG', false);





if (typeof window !== 'undefined') {
  // @ts-ignore
  tf.setBackend('webgl');


  class L2 {

    static className = 'L2';

    constructor(config: L1L2Args | undefined) {
       return tf.regularizers.l1l2(config)
    }
}
tf.serialization.registerClass(L2 as any);

  


}




export default function Component() {
  const { currentPage, navigateTo, navigateBack } = useTransitionContent('loading');

  const [model, setModel] = React.useState<any>(null);
  const { state, dispatch } = useMyContext();

  useEffect(() => {
    async function loadModel() {
      const url = '/models/model.json';
      const modelName = 'my-model';
  
      // Check if the model is already in IndexedDB.
      const modelExists = await tf.io.listModels();
      // check if dictionary is empty
      
      if (Object.keys(modelExists).length !== 0) {
        console.log('Models in IndexedDB:', modelExists);
        // If it's in IndexedDB, use the cached model.
        const model = await tf.loadLayersModel(`indexeddb://${modelName}`);
        setModel(model);
        navigateTo('main');
      } else {
        // If it's not in IndexedDB, fetch it.
        const model = await tf.loadLayersModel(url);
  
        // Save the model to IndexedDB for future use.
        await model.save(`indexeddb://${modelName}`);
  
        setModel(model);
        navigateTo('main');
      }
    }
  
    loadModel();
  }, []);


  const callPredictAPI = async (img: any) => {

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    ctx.drawImage(img, 0, 0);

    // Convert the canvas image to JPG format
    const jpgUrl = canvas.toDataURL('image/jpeg');

    // The jpgUrl is a base64 string of the image in JPG format

    const response = await fetch('/api/predictImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: jpgUrl }),
    });

    if (!response.ok) {
      setTimeout(async () => {

        if (response.status === 429) {
          const responseBody = await response.json();
          const resetTime = responseBody.reset;
          // Check if resetTime is a valid number
          if (!resetTime) {
            toast.error('Error. Please try again later.');
            console.log(response.status, response.statusText);
            dispatch({type: 'SET_ALL_NULL'});
            setCurrentStep(0);
            navigateTo('main');
            return;
          }
        
          const currentTime = Date.now();
          const waitTime = resetTime - currentTime;
          // Ensure a positive wait time; if negative, default to a minimal wait period (e.g., 5 seconds).
          const secondsToWait = Math.max(Math.ceil(waitTime / 1000), 5);
        
          toast.error(`Please wait ${secondsToWait} seconds before trying again.`);
        }

        else if (response.status === 500) {
          const responseBody = await response.json();
          toast.error(responseBody.error);
        }
        
        console.log(response.status, response.statusText);
        dispatch({type: 'SET_ALL_NULL'});
        setCurrentStep(0);
        navigateTo('main');
      }, 1000);
      return;
    }





    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
      navigateTo('main');
      return;
    }


    if (!data.outputFromModel) {
      toast.error('Failed to predict the image');
      navigateTo('main');
      return;
    }

    const dataFromModel = data.outputFromModel;

    if (dataFromModel.is_vehicle === false) {
      toast.error('This is not a vehicle. Please upload an image of a vehicle.');
      navigateTo('main');
      return;
    }


    if (!dataFromModel.make && !dataFromModel.model && !dataFromModel.year) {
      toast.error('Failed to predict the image');
      navigateTo('main');
      return;
    }

    dispatch({type: 'SET_VEHICLE_DETAILS', 
    payload: {
      ...state.vehicleDetails,
      make: dataFromModel.make,
      model: dataFromModel.model,
      year: dataFromModel.year
    }});
  };



  useEffect(() => {
    if (!state.imageFiles) return;
    if (state.imageFiles.length === 0) return;
    if (state.vehicleDetails.make) return;

    navigateTo('predictingLoading');

    const newImgFunc = async () => {
      const img = new Image();
      const imageFile = state.imageFiles[0];

      img.src = URL.createObjectURL(imageFile);

      img.onload = async () => {
        const class_names = [
          'Audi-A3-2021',
          'BMW-M3-2018',
          'Ford-Fiesta-2015',
          'Nissan-Qashqai-2021',
          'Vauxhall-Corsa-2021',
          'Volkswagen-Golf-2017',
          'Z-Junk']
        const class_names_mmy = [
          {
            make: 'Audi',
            model: 'A3',
            year: '2021',
          },
          {
            make: 'BMW',
            model: 'M3',
            year: '2018',
          },
          {
            make: 'Ford',
            model: 'Fiesta',
            year: '2015',
          },
          {
            make: 'Nissan',
            model: 'Qashqai',
            year: '2021',
          },
          {
            make: 'Vauxhall',
            model: 'Corsa',
            year: '2021',
          },
          {
            make: 'Volkswagen',
            model: 'Golf',
            year: '2017',
          },
          {
            make: 'Junk',
            model: 'Junk',
            year: 'Junk',
          },
        ]
    
          let tensor = tf.browser.fromPixels(img).resizeBilinear([224, 224])
          const threshold = 0.75;

          const prediction = await model.predict(tensor.expandDims());
          const predictions = prediction.dataSync();
          console.log('Predictions:', predictions);
          const maxPrediction = Math.max(...predictions);
          const predictedClassIndex = predictions.indexOf(maxPrediction);

          if (predictedClassIndex === 6) {
            await callPredictAPI(img);
          }
          else {
            if (maxPrediction < threshold) {
              console.log('The model is not confident in its prediction.');
              await callPredictAPI(img);
            } else {
              console.log('Predicted Class:', class_names[predictedClassIndex]);
              const make = class_names_mmy[predictedClassIndex].make;
              const model = class_names_mmy[predictedClassIndex].model;
              const year = class_names_mmy[predictedClassIndex].year;

              dispatch({type: 'SET_VEHICLE_DETAILS',
               payload: {...state.vehicleDetails, make, model, year, generatedWithModel: 'custom'}});
            }
          }
      };
    }
    
    newImgFunc();
  }, [state.imageFiles,]);

  const [currentStep, setCurrentStep] = React.useState(0);




  const handleDetailsSubmit = async () => {
    // Destructuring for easier access
    const { make, model, year } = state.vehicleDetails;
  
    // Check if make, model, or year is empty
    if (!make || !model || !year) {
      toast.error('Please confirm all details of the vehicle');
      return;
    }
  
    // Trim input to remove whitespace at the start and end
    const trimmedMake = make.trim();
    const trimmedModel = model.trim();
  
    // Regex to check the input doesn't start or end with whitespace and doesn't have multiple spaces in between
    const regex = /^[^\s]+(\s[^\s]+)*$/;
  
    // Validate trimmed make and model with regex
    if (!regex.test(trimmedMake) || !regex.test(trimmedModel)) {
      toast.error('Please enter a valid make and model');
      return;
    }

    // check if year is a number
    let convertedYear = 0;
    try {
      convertedYear = parseInt(year);
    }
    catch (error) {
      toast.error('Please enter a valid year');
      return;
    }

    // check if year is in the correct range
    if (convertedYear < 1899 || convertedYear > new Date().getFullYear()) {
      toast.error('Please enter a valid year');
      return;
    }
    

    setCurrentStep(2);


    const ebayResponse = await fetch('/api/getEbay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carDetails: { make: trimmedMake, model: trimmedModel, year: year } }),
    });

    if (!ebayResponse.ok) {
      
      toast.error('Failed to get average price');
      dispatch({type: 'SET_ALL_NULL'});
      setCurrentStep(0);
      navigateTo('main');
      return;
    }

    const data = await ebayResponse.json();

    if (data.error) {
      toast.error(data.error);
      dispatch({type: 'SET_ALL_NULL'});
      setCurrentStep(0);
      navigateTo('main');
      return;
    }

    if (!data.ebayReturnResponse.averagePrice) {
      // toast.error('Failed to get average price');
      dispatch({type: 'SET_ALL_NULL'});
      setCurrentStep(0);
      navigateTo('main');
      return;
    }

    // toast.success(`The average price for a ${make} ${model} ${year} is £${data.ebayReturnResponse.averagePrice}`);

    dispatch({type: 'SET_EBAY_RESULT', payload: data.ebayReturnResponse});

    navigateTo('final');


  };



  const pages = {
    main: {
      component: <DragDropPage onNavigate={navigateTo} />,
    },
    loading: {
      component: <LoaderPage onNavigate={navigateTo} />,
    },
    predictingLoading: {
      component: <PredictingLoadingPage onNavigate={navigateTo} handleDetailsSubmit={handleDetailsSubmit} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    },
    final: {
      component: <FinalPage onNavigate={navigateTo} setCurrentStep={setCurrentStep} />
    }
    }



  return (
        <AnimatePresence mode='wait'>
          <TransitionWrapper key={currentPage}>
            <div className="relative h-full flex w-full flex-col text-center sm:h-full sm:justify-center items-center pt-12 px-2 sm:px-0  sm:pt-0">
                {pages[currentPage as keyof typeof pages].component}
            </div>
          </TransitionWrapper>
        </AnimatePresence>
  );
}

