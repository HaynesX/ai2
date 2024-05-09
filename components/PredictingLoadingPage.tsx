"use client";

import React, { useEffect } from "react";
import {Progress, Spacer} from "@nextui-org/react";

import VerticalCollapsibleSteps from "./vertical-collapsible-steps";
import SupportCard from "./support-card";
import {Input} from "@nextui-org/react";
import {Select, SelectItem, Button} from "@nextui-org/react";
import { useMyContext } from '@/components/myContext';
import { Icon } from '@iconify/react';


export default function PredictingLoadingPage({onNavigate, handleDetailsSubmit, currentStep, setCurrentStep}: any) {
    const { state, dispatch } = useMyContext();


    const tryAgain = () => {
      dispatch({type: 'SET_ALL_NULL'})
      setCurrentStep(0)
      onNavigate('main')
    }


    useEffect(() => {
        if (state.vehicleDetails.make || state.vehicleDetails.model || state.vehicleDetails.year) {
            setCurrentStep(1);
        }
    }, [state.vehicleDetails]);


  const years = Array.from({length: 126}, (_, i) => new Date().getFullYear() - i);

const steps = [
  {
    title: "Vehicle Prediction",
    description:
      "Using a custom trained model, the details of the car will be predicted.",
    details: {
        component: (
            <div className="flex flex-col w-full px-5 gap-2">
                <Progress
                    size="sm"
                    color="secondary"
                    isIndeterminate
                    aria-label="Loading..."
                    className="w-full mb-4"
                    />
            </div>
        )
    }
  },
  {
    title: "Confirm Details",
    description: "Confirm or adjust the details of the vehicle.",
    details: {
        component: (
            <div className="flex flex-col w-full px-5 gap-2">

                <div className="flex flex-row gap-1 items-center">

                    {state.vehicleDetails.generatedWithModel === 'OpenAI' ? (
                        <>
                            <Icon icon="ri:openai-fill" width="18" className="text-default-500/50"/>
                            <p className="text-default-500/50 text-xs font-mono">Generated with OpenAI</p>
                        </>
                        
                    ) : (
                        <>
                            <Icon icon="carbon:model" width="18" className="text-default-500/50"/>
                            <p className="text-default-500/50 text-xs font-mono">Generated with VGG16</p>
                        </>
                    )}


                    
                </div>


                <Input
              fullWidth
              size="lg"
              isRequired
              minLength={3}
              maxLength={18}
              type="text"
              variant={'underlined'}
              label="Make"
              placeholder="Enter the brand of vehicle"
              value={state.vehicleDetails.make}
                onChange={(e) => dispatch({type: 'SET_VEHICLE_DETAILS', payload: {...state.vehicleDetails, make: e.target.value}})}
            />
            <Input
              fullWidth
              isRequired
              size="lg"
              type="text"
              maxLength={18}
              minLength={1}
              variant={'underlined'}
              label="Model"
              
              placeholder="Enter the model of vehicle"
              value={state.vehicleDetails.model}
              onChange={(e) => dispatch({type: 'SET_VEHICLE_DETAILS', payload: {...state.vehicleDetails, model: e.target.value}})}
            />
            <Select
              items={years.map((year) => ({label: year.toString(), value: year}))}
              label="Year"
              isRequired
              selectionMode="single"
              selectedKeys={
                state.vehicleDetails.year
                  ? [state.vehicleDetails.year]
                  : []
              }
              size="lg"
              variant="underlined"
              placeholder="Select a year"
              className="mb-2"
                value={state.vehicleDetails.year}
                onChange={(e) => dispatch({type: 'SET_VEHICLE_DETAILS', payload: {...state.vehicleDetails, year: e.target.value}})}
            >
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                    {year.toString()}
                </SelectItem>
                ))}
            </Select>

    <Button className="mb-4" color="secondary" variant="shadow" onPress={handleDetailsSubmit}>
        Confirm Details
      </Button>  

            </div>
        )
    }
  },
  {
    title: "Pricing Results",
    description:
      "Pricing & details of the vehicle will be retrieved based on the details provided.",
      details: {
        component: (
            <div className="flex flex-col w-full px-5 gap-2">
                <Progress
                    size="sm"
                    color="secondary"
                    isIndeterminate
                    aria-label="Loading..."
                    className="w-full mb-4"
                    />
            </div>
        )
    }
  },
  
];



  return (
    <section className="max-w-sm py-6">
        <div style={{
        WebkitFilter: 'blur(200px)',
        filter: 'blur(200px)',
        opacity: 0.35,
        backgroundColor: '#dd10ddb3',
        overflow: 'hidden',
        borderRadius: '50%',
        height: '641px',
        position: 'absolute',
        width: '100%',
        transform: 'perspective(1200px)',

        

       }}></div>
      <h1 className="mb-2 text-xl font-medium" id="getting-started">
       Analysing Vehicle Details
      </h1>
      <p className="mb-5 text-small text-default-500">
        The vehicle details are being analysed. Please wait while the details are being processed.
      </p>
      <Progress
      color="secondary"
        classNames={{
          base: "px-0.5 mb-5",
          label: "text-small",
          value: "text-small text-default-400",
        }}
        label="Steps"
        maxValue={steps.length - 1}
        minValue={0}
        showValueLabel={true}
        size="md"
        value={currentStep}
        valueLabel={`${currentStep + 1} of ${steps.length}`}
      />
      <VerticalCollapsibleSteps
        currentStep={currentStep}
        steps={steps}
        onStepChange={setCurrentStep}
      />
      <Spacer y={4} />
      <SupportCard className="!m-0 border border-default-200 !bg-default-50 px-2 shadow-none dark:border-default-100 dark:!bg-default-50/50" />
      <Button size="sm" onPress={tryAgain} color="secondary" className="mt-4" variant="ghost" startContent={
            <Icon icon="humbleicons:arrow-go-back" />
          }>Try Again</Button>
    </section>
  );
}
