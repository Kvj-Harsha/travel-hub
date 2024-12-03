// components/TripCard.js

import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaTrain, FaDollarSign } from "react-icons/fa";
import { MdHotel, MdOutlineDateRange, MdOutlineSchedule } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";

const TripCard = ({ tripData }) => {
  const { tripName, destination, startDate, endDate, travelers, accommodationPreference, transportationPreference, budget, hotelOptions, itinerary } = tripData;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Trip Overview */}
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{tripName}</h2>
          <FaMapMarkerAlt className="text-blue-500 ml-2" />
        </div>
        <p className="text-gray-600 mb-4 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {destination}
        </p>

        {/* Travel Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Start Date: {startDate}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> End Date: {endDate}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" /> Travelers: {travelers}
          </div>
          <div className="flex items-center">
            <MdHotel className="mr-2" /> Accommodation: {accommodationPreference}
          </div>
          <div className="flex items-center">
            <FaTrain className="mr-2" /> Transportation: {transportationPreference}
          </div>
          <div className="flex items-center">
            <FaDollarSign className="mr-2" /> Budget: ${budget}
          </div>
        </div>

        {/* Hotel Options */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Hotel Options</h3>
          <div className="grid grid-cols-1 gap-4">
            {hotelOptions.map((hotel, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-100 rounded-lg shadow">
                <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="w-20 h-20 rounded mr-4" />
                <div>
                  <h4 className="text-lg font-semibold">{hotel.hotelName}</h4>
                  <p className="text-sm text-gray-600">{hotel.hotelAddress}</p>
                  <p className="text-sm text-gray-500">Price: {hotel.price}</p>
                  <p className="text-sm text-yellow-500">Rating: {hotel.rating}</p>
                  <p className="text-sm text-gray-500">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Itinerary</h3>
          {Object.keys(itinerary).map((dayKey, dayIndex) => {
            const day = itinerary[dayKey];
            return (
              <div key={dayIndex} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <MdOutlineDateRange className="text-blue-500 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">{day.date}</h4>
                </div>
                <p className="text-gray-600 flex items-center mb-1">
                  <MdOutlineSchedule className="mr-2" /> {day.time}
                </p>
                <p className="text-gray-800 font-medium flex items-center mb-1">
                  <FaMapMarkerAlt className="mr-2" /> {day.placeName}
                </p>
                <p className="text-gray-500">{day.placeDetails}</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <AiOutlineClockCircle className="mr-2" /> Travel Time: {day.timeToTravel}
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  <IoMdPricetags className="mr-2" /> Ticket Price: {day.ticketPricing}
                </div>
                <div className="mt-2">
                  <img src={day.placeImageUrl} alt={day.placeName} className="w-full h-32 object-cover rounded-lg" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
