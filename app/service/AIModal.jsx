import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = "AIzaSyBfObm3Qb7RIaY8I4tzMON_bSfDohBvwXo";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://www.theD.com/images/hotel/the-d-exterior.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1424\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in downtown Las Vegas, known for its lively atmosphere and proximity to Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70-$150 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/wp-content/uploads/2018/11/Golden-Nugget-Las-Vegas-Hotel-Exterior.jpg\",\n      \"geoCoordinates\": \"36.1697, -115.1426\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A classic casino hotel with a vibrant atmosphere, featuring an impressive shark tank and a variety of dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/content/dam/MGMResorts/CircusCircus/images/hotel-overview/exterior-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1189, -115.1732\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A family-friendly hotel with a carnival theme, featuring a circus act, midway games, and affordable dining options.\"\n    },\n    {\n      \"hotelName\": \"The Strat Hotel, Casino & SkyPod\",\n      \"hotelAddress\": \"2000 S Las Vegas Blvd, Las Vegas, NV 89104\",\n      \"price\": \"$60-$120 per night\",\n      \"hotelImageUrl\": \"https://www.thestrat.com/content/dam/MGMResorts/TheStrat/images/hotel-overview/exterior-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1067, -115.1609\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A unique hotel with a tower offering panoramic views of the city and an observation deck with thrill rides.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Fremont Street Experience\",\n      \"placeDetails\": \"Explore the vibrant pedestrian mall with its dazzling light shows, street performers, and casinos.\",\n      \"placeImageUrl\": \"https://www.vegasexperience.com/media/uploads/2020/02/Fremont-Street-Experience-Las-Vegas.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1424\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Neon Museum\",\n      \"placeDetails\": \"Visit this outdoor museum featuring a collection of iconic Las Vegas signs.\",\n      \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2020/11/Neon-Museum-Exterior-01.jpg\",\n      \"geoCoordinates\": \"36.1665, -115.1506\",\n      \"ticketPricing\": \"$20-$30 per person\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Free Show on the Strip\",\n      \"placeDetails\": \"Catch a free show at one of the casinos on the Las Vegas Strip, such as the Bellagio Fountains or the Mirage Volcano.\",\n      \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGMResorts/Bellagio/images/hotel-overview/fountain-show-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1114, -115.1735\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Hoover Dam\",\n      \"placeDetails\": \"Take a day trip to this iconic engineering marvel and marvel at its grandeur.\",\n      \"placeImageUrl\": \"https://www.nps.gov/hdam/learn/nature/images/hoover-dam-from-black-canyon-park.jpg\",\n      \"geoCoordinates\": \"36.0045, -114.9921\",\n      \"ticketPricing\": \"$30 per person\",\n      \"timeToTravel\": \"3-4 hours (including travel time)\"\n    },\n    \"day2\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Red Rock Canyon National Conservation Area\",\n      \"placeDetails\": \"Explore the scenic landscapes of this national conservation area with hiking trails and rock formations.\",\n      \"placeImageUrl\": \"https://www.redrockcanyonlv.org/images/red-rock-canyon-national-conservation-area-main-header-background.jpg\",\n      \"geoCoordinates\": \"36.1086, -115.2855\",\n      \"ticketPricing\": \"$15 per vehicle\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Downtown Container Park\",\n      \"placeDetails\": \"Enjoy a casual dining experience at this unique outdoor mall made from shipping containers.\",\n      \"placeImageUrl\": \"https://www.containerpark.com/images/slider/Container-Park-night-3.jpg\",\n      \"geoCoordinates\": \"36.1674, -115.1417\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n      \"placeDetails\": \"Admire the stunning floral displays in this beautiful indoor garden.\",\n      \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGMResorts/Bellagio/images/attractions/conservatory-botanical-garden/conservatory-botanical-garden-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1114, -115.1735\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"The LINQ Promenade\",\n      \"placeDetails\": \"Stroll along this outdoor shopping and dining area, featuring the High Roller observation wheel.\",\n      \"placeImageUrl\": \"https://www.caesars.com/content/dam/caesars/linq/images/attractions/linq-promenade/linq-promenade-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1102, -115.1712\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Free Show on the Strip (different from Day 1)\",\n      \"placeDetails\": \"Catch a different free show at a different casino on the Strip, such as the Wynn Lake of Dreams or the Caesars Palace Roman Forum.\",\n      \"placeImageUrl\": \"https://www.wynnlasvegas.com/content/dam/wynn/wynn/images/attractions/lake-of-dreams/lake-of-dreams-hero-image-2-2.jpg\",\n      \"geoCoordinates\": \"36.1113, -115.1717\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    }\n  }\n}\n```\n\n**Notes:**\n\n* **Hotel prices:** These are approximate and can vary depending on the time of year and availability.\n* **Ticket prices:** Prices are subject to change. It's always best to check the official websites for the most up-to-date information.\n* **Time to travel:** These are estimations and may vary depending on traffic and transportation.\n* **Best time to visit:** The best time to visit Las Vegas is during the spring (March-May) or fall (September-November) for pleasant weather and fewer crowds.\n* **Transportation:** You can use public transportation (RTC buses) or ride-sharing services like Uber or Lyft to get around.\n* **Food:** Las Vegas offers a wide range of affordable dining options, including buffets, food trucks, and casual restaurants.\n* **Activities:** This itinerary focuses on free or low-cost activities, but you can also find deals on attractions like shows and tours.\n\nThis itinerary is just a suggestion, and you can customize it to fit your interests and budget. Have a wonderful time in Las Vegas!\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Hyderabad, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Treebo Trend The Emerald\",\n      \"hotelAddress\": \"Plot No. 113, 1st Floor, Rd Number 1, Banjara Hills, Hyderabad, Telangana 500034\",\n      \"price\": \"$25-$40 per night\",\n      \"hotelImageUrl\": \"https://images.treebo.com/hotels/trend-the-emerald-hyderabad/exterior.jpg\",\n      \"geoCoordinates\": \"17.4214, 78.4086\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A modern and comfortable hotel in Banjara Hills, offering clean rooms and amenities at an affordable price.\"\n    },\n    {\n      \"hotelName\": \"OYO Townhouse 082 Banjara Hills\",\n      \"hotelAddress\": \"Plot No. 112, Rd Number 1, Banjara Hills, Hyderabad, Telangana 500034\",\n      \"price\": \"$20-$35 per night\",\n      \"hotelImageUrl\": \"https://cdn.oyo.com/web/assets/images/hotels/48879/OYO_Townhouse_082_Banjara_Hills_2_08.jpg\",\n      \"geoCoordinates\": \"17.4213, 78.4084\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A well-maintained hotel in a central location, offering comfortable rooms and basic amenities.\"\n    },\n    {\n      \"hotelName\": \"FabHotel Shiva Grand\",\n      \"hotelAddress\": \"Plot No. 195, Road No. 1, Banjara Hills, Hyderabad, Telangana 500034\",\n      \"price\": \"$15-$30 per night\",\n      \"hotelImageUrl\": \"https://cdn.fabhotels.com/media/images/hotels/16813/fabhotel-shiva-grand-hyderabad-exterior.jpg\",\n      \"geoCoordinates\": \"17.4208, 78.4079\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A budget-friendly hotel with clean and functional rooms, located close to shopping and dining options.\"\n    },\n    {\n      \"hotelName\": \"Capital O 40028 Hotel City View\",\n      \"hotelAddress\": \"1-8-286/1/A, Road No 10, Banjara Hills, Hyderabad, Telangana 500034\",\n      \"price\": \"$10-$25 per night\",\n      \"hotelImageUrl\": \"https://cdn.oyo.com/web/assets/images/hotels/40028/OYO_40028_Hotel_City_View_4_01.jpg\",\n      \"geoCoordinates\": \"17.4225, 78.4101\",\n      \"rating\": \"2.5 stars\",\n      \"description\": \"A basic and affordable hotel, offering clean rooms and essential amenities.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Charminar\",\n      \"placeDetails\": \"Visit this iconic monument, a symbol of Hyderabad, and explore the surrounding markets.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Charminar_Hyderabad.jpg/1280px-Charminar_Hyderabad.jpg\",\n      \"geoCoordinates\": \"17.3621, 78.4740\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Laad Bazaar\",\n      \"placeDetails\": \"Shop for traditional Hyderabadi jewelry, textiles, and handicrafts in this bustling market.\",\n      \"placeImageUrl\": \"https://www.holidify.com/images/cmsuploads/2022/Dec/20/aad-bazaar_1671529919.jpg\",\n      \"geoCoordinates\": \"17.3619, 78.4738\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Birla Mandir\",\n      \"placeDetails\": \"Visit this serene Hindu temple, offering panoramic views of the city.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Birla_Mandir_Hyderabad_02.jpg/1280px-Birla_Mandir_Hyderabad_02.jpg\",\n      \"geoCoordinates\": \"17.4028, 78.4508\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Qutb Shahi Tombs\",\n      \"placeDetails\": \"Explore the magnificent tombs of the Qutb Shahi dynasty, showcasing intricate architecture.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Qutb_Shahi_Tombs_Hyderabad.jpg/1280px-Qutb_Shahi_Tombs_Hyderabad.jpg\",\n      \"geoCoordinates\": \"17.3769, 78.4672\",\n      \"ticketPricing\": \"₹10 per person\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Salar Jung Museum\",\n      \"placeDetails\": \"Visit this museum housing a vast collection of art, artifacts, and manuscripts from around the world.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Salar_Jung_Museum_Hyderabad.jpg/1280px-Salar_Jung_Museum_Hyderabad.jpg\",\n      \"geoCoordinates\": \"17.3719, 78.4716\",\n      \"ticketPricing\": \"₹50 per person\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Hussain Sagar Lake\",\n      \"placeDetails\": \"Enjoy a leisurely evening stroll or a boat ride on this scenic lake.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hussain_Sagar_Lake_Hyderabad.jpg/1280px-Hussain_Sagar_Lake_Hyderabad.jpg\",\n      \"geoCoordinates\": \"17.3822, 78.4809\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1-2 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Golconda Fort\",\n      \"placeDetails\": \"Explore the ruins of this ancient fort, known for its impressive architecture and history.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Golconda_Fort_Hyderabad.jpg/1280px-Golconda_Fort_Hyderabad.jpg\",\n      \"geoCoordinates\": \"17.3915, 78.4564\",\n      \"ticketPricing\": \"₹50 per person\",\n      \"timeToTravel\": \"2-3 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Ramoji Film City\",\n      \"placeDetails\": \"Spend an afternoon at this sprawling film studio, with various attractions and entertainment options.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Ramoji_Film_City_%281%29.jpg/1280px-Ramoji_Film_City_%281%29.jpg\",\n      \"geoCoordinates\": \"17.4341, 78.4463\",\n      \"ticketPricing\": \"₹700 per person\",\n      \"timeToTravel\": \"4-5 hours (including travel time)\"\n    },\n    \"day3\": {\n      \"time\": \"Evening (5:00 PM - 8:00 PM)\",\n      \"placeName\": \"Paradise Restaurant\",\n      \"placeDetails\": \"Indulge in the famous Hyderabadi biryani at this popular restaurant.\",\n      \"placeImageUrl\": \"https://media-cdn.tripadvisor.com/media/photo-s/0f/d1/b6/83/paradise-restaurant.jpg\",\n      \"geoCoordinates\": \"17.4226, 78.4156\",\n      \"ticketPricing\": \"N/A\",\n      \"timeToTravel\": \"1-2 hours\"\n    }\n  }\n}\n```\n\n**Notes:**\n\n* **Hotel prices:** These are approximate and can vary depending on the time of year and availability.\n* **Ticket prices:** Prices are subject to change. It's always best to check the official websites for the most up-to-date information.\n* **Time to travel:** These are estimations and may vary depending on traffic and transportation.\n* **Best time to visit:** Hyderabad is pleasant throughout the year, but the best time to visit is during the winter months (October-March) for comfortable weather.\n* **Transportation:** You can use public transportation (TSRTC buses) or ride-sharing services like Ola or Uber to get around.\n* **Food:** Hyderabad is famous for its biryani and other Hyderabadi delicacies, which you can enjoy at various budget-friendly restaurants and street food stalls.\n\nThis itinerary is just a suggestion, and you can customize it to fit your interests and budget. Have a wonderful time in Hyderabad!\n"},
        ],
      },
    ],
  });


  