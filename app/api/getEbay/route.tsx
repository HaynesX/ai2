import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import eBayApi from 'ebay-api';

export async function POST(request: NextRequest, response: NextResponse) {
    const eBay = new eBayApi({
        appId: process.env.EBAY_APP_ID as any,
        certId: process.env.EBAY_CERT_ID as any,
        sandbox: false,
        siteId: eBayApi.SiteId.EBAY_GB,
        marketplaceId: eBayApi.MarketplaceId.EBAY_GB,
    });

    let data;
    try {
        data = await request.json()
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({}, { status: 401 });
    }

    if (!data.carDetails) {
        console.log("No carDetails provided")
        return NextResponse.json({
            error: "No carDetails provided"
        }, { status: 401 });
    }

    const { make, model, year } = data.carDetails;

    if (!make && !model && !year) {
        console.log("Make, Model and Year are missing")
        return NextResponse.json({
            error: "Make, Model and Year are missing"
        }, { status: 401 });
    }

    const itemFilter = [];
    const aspectFilter = [];
    let keywords = '';

    if (make) {
        itemFilter.push({ name: 'Manufacturer', value: make });
        aspectFilter.push({ aspectName: 'Manufacturer', aspectValueName: make });
        keywords += make + ' ';
    }

    if (model) {
        itemFilter.push({ name: 'Model', value: model });
        aspectFilter.push({ aspectName: 'Model', aspectValueName: model });
        keywords += model + ' ';
    }

    if (year) {
        itemFilter.push({ name: 'Model Year', value: year });
        aspectFilter.push({ aspectName: 'Model Year', aspectValueName: year });
        keywords += year;
    }

    const ebayResponse = await eBay.finding.findItemsAdvanced({
        siteId: eBayApi.SiteId.EBAY_GB,
        marketplaceId: eBayApi.MarketplaceId.EBAY_GB,
        paginationInput: {
            entriesPerPage: 100,
            pageNumber: 1
        },
        categoryId: '9800',
        keywords
    },{
        headers: {
          'X-EBAY-SOA-GLOBAL-ID': 'EBAY-GB',
        }
    });

    const items = ebayResponse.searchResult.item;

    if (!items) {
        console.log("No items found")
        return NextResponse.json({
            error: "No items found"
        }, { status: 401 });
    }
    let sumPrices = 0;
    const finalItems: { id: any, title: any; price: any; url: any; image: any; condition: any, location: any }[] = [];

    items.forEach((item: any) => {
        sumPrices += item.sellingStatus.currentPrice.value;
        finalItems.push({
            id: item.itemId,
            title: item.title,
            condition: item.condition.conditionDisplayName,
            location: item.location,
            price: item.sellingStatus.currentPrice.value,
            url: item.viewItemURL,
            image: item.galleryURL
        });
    });

    const ebayReturnResponse = {
        averagePrice: sumPrices / items.length,
        items: finalItems
    }

    return NextResponse.json({ ebayReturnResponse }, { status: 200 });
}
