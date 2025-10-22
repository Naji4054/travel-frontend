"use client"
import React, { useEffect, useState } from 'react';
import { Clock, Calendar, MapPin, ArrowRight, Search, Filter, X } from 'lucide-react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

// Sample data structure - replace with your actual API data
const samplePackages = [
  {
    id: 1,
    title: "DANDELI JUNGLE SAFARI",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    duration: "2 Nights 3 Days",
    availability: "Available on request",
    location: "Dandeli, Karnataka",
    price: null,
    category: "Adventure",
    type: "Domestic"
  },
  {
    id: 2,
    title: "KANHA JUNGLE SAFARI",
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop",
    duration: "2 Nights 3 Days",
    availability: "Available on request",
    location: "Madhya Pradesh",
    price: 11499,
    category: "Wildlife",
    type: "Domestic"
  },
  {
    id: 3,
    title: "BALI BEACH GETAWAY",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    duration: "5 Nights 6 Days",
    availability: "Available on request",
    location: "Bali, Indonesia",
    price: 45999,
    category: "Beach",
    type: "International"
  },
  {
    id: 4,
    title: "GOA GROUP TOUR",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    duration: "3 Nights 4 Days",
    availability: "Available on request",
    location: "Goa, India",
    price: 8999,
    category: "Beach",
    type: "Group"
  },
  {
    id: 5,
    title: "HIMALAYAN TREK",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    duration: "7 Nights 8 Days",
    availability: "Available on request",
    location: "Himachal Pradesh",
    price: 18999,
    category: "Adventure",
    type: "Domestic"
  },
  {
    id: 6,
    title: "DUBAI LUXURY ESCAPE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    duration: "4 Nights 5 Days",
    availability: "Available on request",
    location: "Dubai, UAE",
    price: 55999,
    category: "Luxury",
    type: "International"
  }
];

// Categories and Types for filters
const categories = ["All", "Adventure", "Wildlife", "Beach", "Luxury", "Cultural", "Honeymoon"];
const types = ["All", "Domestic", "International", "Group"];


interface PackageInfo {
    _id: string;
    title : string
    description : string,
    duration: string,
    type: string,
    category: {
      _id: string;
      title: string
    },
    image:{
      url: string,
      altText: string
      isCover: string
    }[],
    status: string,
    price: string,
    location: {
      _id: string
      title: string
    },
}

const TravelPackageCard = ({ pkg }: {pkg: PackageInfo}) => {
    const coverImage = pkg.image.find(img => img.isCover);

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white">
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        
        <img 
          src={`http://localhost:3000/${coverImage?.url}`}
          alt={coverImage?.altText}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
            {pkg.title}
          </h3>
        </div>

        {/* Price Tag */}
        {pkg.price && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-lg">
            <span className="text-base sm:text-lg font-bold text-gray-800">₹ {pkg.price.toLocaleString()}</span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          {pkg.type}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 sm:p-6 space-y-3">
        {/* Duration */}
        <div className="flex items-center gap-3 text-gray-700">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{pkg.duration}</span>
        </div>

        {/* Status*/}
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{pkg.status}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{pkg.location.title}</span>
        </div>

        {/* View Details Button */}
        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-md transition-colors duration-200 group text-sm sm:text-base">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TravelPackagesGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter packages based on search and filters
  const filteredPackages = [1,2]
//   const filteredPackages = samplePackages.filter(pkg => {
//     const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
//     const matchesType = selectedType === 'All' || pkg.type === selectedType;
    
//     return matchesSearch && matchesCategory && matchesType;
//   });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedType('All');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedType !== 'All';

  const [packageList, SetPackageList ] = useState<PackageInfo[]>([])

  const searchParams = useSearchParams()
 
  const search = searchParams.get('category')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const fetchPackage = async () => {
    const res = await axios.get(`${baseUrl}/packages/all-packages`, {
        params: {
            category: search
        }
    })
    .then(res=> {
        console.log(res.data.data)
        SetPackageList(res.data.data)
    }).
    catch(err=>console.error(err))
  }




  useEffect (()=>{
    fetchPackage()
  },[packageList, search])


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Our Packages</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredPackages.length} of {samplePackages.length} trips
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by destination or package name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors mb-4"
          >
            <Filter className="w-4 h-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <X className="w-4 h-4" />
                <span>Clear all filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid - Responsive: 1 col mobile, 2 cols medium, 3 cols large */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {packageList.map((pkg) => (
              <TravelPackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPackagesGrid;