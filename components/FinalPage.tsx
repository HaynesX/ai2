"use client";



import {Button, Spacer} from "@nextui-org/react";

import EbayCard, { EbayCardType } from "./EbayCard";
import { JSX, HTMLAttributes, RefAttributes, Key, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useMyContext } from "./myContext";
import { toast } from "sonner";

export default function FinalPage({onNavigate, setCurrentStep}: any) {

  const { state, dispatch } = useMyContext();

  const [avgPrice, setAvgPrice] = useState(0);
  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {

    
    // check if empty object
    if (Object.keys(state.ebayResult).length === 0) {
      return
    }

    if (state.ebayResult) {
      // convert price to nice format
      setAvgPrice(state.ebayResult.averagePrice.toFixed(2))
      setItems(state.ebayResult.items)
    }

    console.log('ebayResult state here', state.ebayResult)

  }, [state.ebayResult]);



  const tryAgain = () => {
    dispatch({type: 'SET_ALL_NULL'})
    setCurrentStep(0)
    onNavigate('main')
  }







  return (
    <section className="flex max-w-4xl flex-col items-center sm:py-12">
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium text-secondary">Average Vehicle Price</h2>
        <h1 className="text-4xl font-medium tracking-tight">£{avgPrice}</h1>
        <Spacer y={4} />
        <h2 className="text-large text-default-500">
          Below are found eBay listings of similar vehicles. The average price of these vehicles is £{avgPrice}.
        </h2>
        <Spacer y={4} />
        <div className="flex w-full justify-center gap-2">
          <Button onPress={() => {
            navigator.clipboard.writeText(state.ebayResult.averagePrice.toFixed(2))
            toast.success('Price copied to clipboard')
          }
          } variant="ghost" startContent={
            <Icon icon="tabler:copy" />
          
          }>Copy Price</Button>
          <Button onPress={tryAgain} color="secondary" startContent={
            <Icon icon="humbleicons:arrow-go-back" />
          }>Try Again</Button>
        </div>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EbayCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
