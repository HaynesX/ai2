
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';




export async function POST(request: NextRequest, response: NextResponse) {

    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
      });


    let data;
    try {
        data = await request.json()
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({}, { status: 401 });
    }

    if (!data.image) {
        return NextResponse.json({
            error: "No image provided"
        }, { status: 401 });
    }



    const responseAi = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "You are a helpful assistant designed to output JSON and identify what car is in images and to give details back about the given car in a strict json format. You will give back JSON with the following keys: make, model, year, description, colour, is_vehicle, confidence_in_mmy. The is_vehicle attribute should be true or false depending if the image is actually of a vehicle that is meant to be on road, such as a car bike van etc, and its a real life vehicle, not fictional. The confidence_in_mmy should be a value between 0 and 1 indicating how confident you are with the given make model year. If you can't identify a make model year, make the values you cant find null. What’s in this image?" },
              {
                type: "image_url",
                image_url: {
                    "url": data.image,
                },
                },
            ],
          },
        ],
      });

    //   '"{\\n  \\"make\\": \\"Tesla\\",\\n  \\"model\\": \\"Model S…ehicle\\": true,\\n  \\"confidence_in_mmy\\": 0.9\\n}"'

    if (!responseAi.choices[0].message.content) {
        return NextResponse.json({
            error: "No response from AI"
        }, { status: 401 });
    }


    
    try {
        const toJson = JSON.parse(responseAi.choices[0].message.content)

        return NextResponse.json({ outputFromModel: toJson }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Error parsing AI response"
        }, { status: 401 });
    }

}