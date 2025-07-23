'use client'

import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { X, XCircleIcon } from 'lucide-react';

const players = () => {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]); // Store all fetched players
  const [filters, setFilters] = useState({
    position: '',
    country: '',
    gender: '',
    search: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch all active and not deleted users (no filters in API call)
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/active-not-deleted`);
      setAllPlayers(res.data.data || []);
    } catch (err) {
      setAllPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter players on the frontend
  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let filtered = [...allPlayers];
    if (filters.position) {
      filtered = filtered.filter((p: any) => p.position === filters.position);
    }
    if (filters.country) {
      filtered = filtered.filter((p: any) => p.country === filters.country);
    }
    if (filters.gender) {
      filtered = filtered.filter((p: any) => p.gender === filters.gender);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((p: any) =>
        (p.fullName && p.fullName.toLowerCase().includes(searchLower)) ||
        (p.mainPosition && p.mainPosition.toLowerCase().includes(searchLower)) ||
        (p.country && p.country.toLowerCase().includes(searchLower))
      );
    }
    setPlayers(filtered);
  }, [filters, allPlayers]);

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle player click
  const handlePlayerClick = async (userId: string) => {
    try {
      await api.get(`/users/view/${userId}`);
      // router.push(`/players/${userId}`);
    } catch (err) {
      // handle error if needed
    }
  };

  return (
    <>
      <HeaderNav scroll={true} />
      <section className='p-4 max-w-7xl mx-auto'>
        <div className=' mt-20 bg-[#E5F4FF] mx-auto p-6 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-[44%] my-auto'>
            <h1 className='text-3xl md:text-5xl font-bold'>Discover Football Talent Across the World</h1>
            <p className='text-[#6C6C6C] my-3 text-sm'>Browse profiles of rising footballers on Playeer — from grassroots players to semi-pro talents. Filter by position, country, age group, or performance to find standout profiles.</p>
          </div>
          <img src="/images/three-medal-set.png" className='w-full md:w-auto max-w-xs md:max-w-none mx-auto md:mx-0' alt="" />
        </div>
      </section>
      <section className='p-4 my-10 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between gap-8'>
          <div className='w-full md:w-[30%] md:mr-10 mb-6 md:mb-0'>
            <div className='flex justify-between'>
              <p className='font-bold my-4'>Filter</p>
              <button
                className="w-20 my-auto px-4 rounded-full bg-[#E5F4FF] text-primary flex gap-2 text-xs"
                onClick={() =>
                  setFilters({
                    position: '',
                    country: '',
                    gender: '',
                    search: '',
                  })
                }
              >
                <XCircleIcon />
                <span className='my-auto'>Clear</span>
              </button>
            </div>
            <select name="position" value={filters.position} onChange={handleFilterChange} className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Position</option>
              <option value="forward">Forward</option>
              <option value="midfielder">Midfielder</option>
              <option value="defender">Defender</option>
              <option value="goalkeeper">Goalkeeper</option>
            </select>
            <select name="country" value={filters.country} onChange={handleFilterChange} className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="England">England</option>
              {/* Add more countries as needed */}
            </select>
            {/* <select name="ageGroup" value={filters.ageGroup} onChange={handleFilterChange} className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Age Group</option>
              <option value="U15">U15</option>
              <option value="U18">U18</option>
              <option value="U21">U21</option>
              <option value="Senior">Senior</option>
            </select> */}
            {/* <select name="status" value={filters.status} onChange={handleFilterChange} className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> */}
            <select name="gender" value={filters.gender} onChange={handleFilterChange} className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='w-full'>
            <div className='flex w-full md:w-[25%] ml-auto mb-4 items-center bg-[#F4F4F4] rounded-md'>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className='p-3 rounded-md text-sm bg-[#F4F4F4] focus:outline-none w-full'
                placeholder='Search'
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6C6C6C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {loading ? (
                <div className="col-span-3 text-center py-10">Loading...</div>
              ) : players.length === 0 ? (
                <div className="col-span-3 text-center py-10">No players found.</div>
              ) : (
                players.map((player: any) => (
                  <div key={player._id} className='relative cursor-pointer' onClick={() => handlePlayerClick(player._id)}>
                    <img src={player.profilePicture || "/images/player-2.jpg"} className='object-cover h-80 w-full rounded-xl' alt="" />
                    <div className='blur bg-[#000310] opacity-50 absolute right-0 left-0 rounded-b-xl bottom-0 h-20'></div>
                    <div className='absolute right-0 left-0 bottom-0 p-4 z-10 '>
                      <div className='flex justify-between my-2 text-white'>
                        <p>{player.fullName}</p>
                      </div>
                      <p className='text-xs text-[#D3D3D3]'>{player.mainPosition}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <ContactComp />
      <FooterNav />
    </>
  );
};

export default players;