# NeuroCar

Welcome to **NeuroCar**, a sleek car prediction application designed to simplify the process of identifying car details from images. Developed by Brandon Haynes and hosted on Vercel, this app leverages the power of the VGG16 model and OpenAI's GPT-4V to deliver accurate car identification and provide useful pricing and eBay listings for similar models.

Check out the live site: [NeuroCar](https://neurocar.net)

## Features

**NeuroCar** offers the following features:

- **Car Identification**: Uses a custom-trained VGG16 neural network model to identify the make, model, and year of cars from uploaded images.
- **Pricing Information**: Integrates pricing data to give users an average price for the identified car model.
- **eBay Listings**: Fetches and displays listings from eBay that match the identified car, providing users with quick access to similar cars available for sale.

## Technology Stack

- **Next.js**: A React framework for building user interfaces and static generation.
- **Vercel**: Hosting and serverless backend services for optimized performance and scalability.
- **VGG16 Model**: A deep convolutional network used for image recognition tasks.
- **OpenAI's GPT-4V**: Utilized for processing and interpreting complex data inputs to enhance prediction accuracy.
- **App Directory Structure**: Utilizes the Next.js app directory for a streamlined project structure.
