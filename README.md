# NeuroCar

Welcome to **NeuroCar**, a sleek car prediction application designed to simplify the process of identifying car details from images. Developed by Brandon Haynes and hosted on Vercel, this app leverages the power of the ResNet50 model and OpenAI's GPT-4o to deliver accurate car identification and provide useful pricing and eBay listings for similar models.

Check out the live site: [NeuroCar](https://neurocar.net)

## Features

**NeuroCar** offers the following features:

- **Car Identification**: Uses a custom-trained ResNet50 neural network model to identify the make, model, and year of cars from uploaded images.
- **Pricing Information**: Integrates pricing data to give users an average price for the identified car model.
- **eBay Listings**: Fetches and displays listings from eBay that match the identified car, providing users with quick access to similar cars available for sale.

## Technology Stack

- **Next.js**: A React framework for building user interfaces and static generation.
- **Vercel**: Hosting and serverless backend services for optimized performance and scalability.
- **ResNet50 Model**: A deep convolutional network used for image recognition tasks.
- **OpenAI's GPT-4V**: Utilized for processing and interpreting complex data inputs to enhance prediction accuracy.
- **App Directory Structure**: Utilizes the Next.js app directory for a streamlined project structure.

## Important Notes

- **OpenAI API Tier Requirement**: To ensure full functionality of the NeuroCar application without service interruptions, you must be subscribed to the **Tier 1** plan of OpenAI's services as **GPT-4 Turbo** is required. Using the Free Tier may result in errors due to API limitations.


## Getting Started

To get **NeuroCar** running locally and on Vercel, follow these detailed steps:

### Prerequisites

1. **Clone the Repository**  
   Start by cloning the NeuroCar repository to your local machine using:
   ```bash
   git clone https://github.com/yourusername/neurocar.git
   cd neurocar
   ```

2. **eBay Developer Account**  
   Ensure you have an eBay developer account. Register for one and create an app to get production credentials (App ID and Cert ID). These are necessary for fetching eBay listings:
   - Visit [eBay Developer Program](https://developer.ebay.com) to sign up.
   - Create a new production application to obtain the `EBAY_APP_ID` and `EBAY_CERT_ID`.

3. **Vercel KV for Rate Limiting**  
   Set up a KV (Key-Value) namespace on Vercel for rate limiting:
   - Go to your Vercel dashboard and create a new KV namespace.
   - Note the `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and `KV_REST_API_READ_ONLY_TOKEN`.

### Configuration

1. **Environment Variables**  
   Configure the necessary environment variables both locally and on Vercel:
   - Create a `.env.local` or `.env.development.local` file in your project root and add the following:
     ```
     OPENAI_API_KEY=your_openai_api_key
     OPENAI_API_MODEL=your_chosen_openai_model
     KV_URL=your_kv_url
     KV_REST_API_URL=your_kv_rest_api_url
     KV_REST_API_TOKEN=your_kv_rest_api_token
     KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token
     EBAY_APP_ID=your_ebay_app_id
     EBAY_CERT_ID=your_ebay_cert_id
     ```

   - Add the same environment variables to your project settings on Vercel.

### Running the Application

1. **Install Dependencies**  
   Install the necessary dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the Development Server**  
   Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Access the application at `http://localhost:3000`.

3. **Deploying to Vercel**  
   When you're ready to deploy, push your changes to your GitHub repository and set up a new project on Vercel by linking your GitHub repository. Ensure all environment variables are set up in your Vercel project settings.

Enjoy building and expanding your car prediction app with **NeuroCar**!
