"use client";

import ContactComp from "@/components/ContactComp";
import FooterNav from "@/components/FooterNav";
import HeaderNav from "@/components/HeaderNav";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { X, XCircleIcon } from "lucide-react";
import { positions } from "@/utils/positions";
import { Country } from "country-state-city";
import { Spin } from "antd";
import PlayerModal from "@/components/Modals/PlayerModal";
import Select from "react-select";
import { useRef } from "react";

const players = () => {
  const [players, setPlayers] = useState([]);
  const [visiblePlayers, setVisiblePlayers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [hasMore, setHasMore] = useState(true);
  const [allPlayers, setAllPlayers] = useState([]); // Store all fetched players
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const [filters, setFilters] = useState({
    position: "",
    country: "",
    gender: "",
    search: "",
  });
  const [countries] = useState(Country.getAllCountries());
  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  const userPosition = positions;

  useEffect(() => {
    let filtered = [...allPlayers];
    if (filters.position) {
      filtered = filtered.filter((p: any) => p.mainPosition === filters.position);
    }
    if (filters.country) {
      filtered = filtered.filter((p: any) => p.country === filters.country);
    }
    if (filters.gender) {
      filtered = filtered.filter((p: any) => p.gender === filters.gender);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p: any) =>
          (p.fullName && p.fullName.toLowerCase().includes(searchLower)) ||
          (p.mainPosition &&
            p.mainPosition.toLowerCase().includes(searchLower)) ||
          (p.country && p.country.toLowerCase().includes(searchLower))
      );
    }
    setPlayers(filtered);
    // Reset pagination on filter changes
    setPage(1);
    setVisiblePlayers(filtered.slice(0, pageSize));
    setHasMore(filtered.length > pageSize);
  }, [filters, allPlayers]);

  // IntersectionObserver to load more
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );
    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Load more when page changes
  useEffect(() => {
    if (page === 1) return;
    const next = players.slice(0, page * pageSize);
    setVisiblePlayers(next);
    setHasMore(players.length > next.length);
  }, [page, players]);

  // Handle filter change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | any
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle player click
  const handlePlayerClick = async (userId: string) => {
    setShowModal(true);
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
      <section className="p-4 max-w-7xl mx-auto">
        <div className=" mt-20 bg-[#E5F4FF] mx-auto p-6 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[44%] my-auto">
            <h1 className="text-3xl md:text-5xl font-bold">
              Discover Football Talent in Africa
            </h1>
            <p className="text-[#6C6C6C] my-3 text-sm">
              Browse profiles of rising footballers on Playeer — from grassroots
              players to semi-pro talents. Filter by position, country, age
              group, or performance to find exceptional players.
            </p>
          </div>
          <img
            src="/images/three-medal-set.png"
            className="w-full md:w-auto max-w-xs md:max-w-none mx-auto md:mx-0"
            alt=""
          />
        </div>
      </section>
      <section className="p-4 my-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-[30%] md:mr-10 mb-6 md:mb-0">
            <div className="flex justify-between">
              <p className="font-bold my-4">Filter</p>
              <button
                className="w-20 my-auto px-4 rounded-full bg-[#E5F4FF] text-primary flex gap-2 text-xs"
                onClick={() =>
                  setFilters({
                    position: "",
                    country: "",
                    gender: "",
                    search: "",
                  })
                }
              >
                <XCircleIcon />
                <span className="my-auto">Clear</span>
              </button>
            </div>
            <select
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
              className="p-3 rounded-md text-sm bg-[#F4F4F4]  focus:outline-none w-full my-2"
            >
              <option value="" className="hidden">
                Position
              </option>
              {positions.map((position) => (
                <option key={position.label} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>

            <Select
              name="country"
              isSearchable
              options={countryOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  border: "none",
                  backgroundColor: "#F4F4F4",
                }),
              }}
              className="w-full p-1 placeholder:text-[#B6B6B6] rounded-md bg-[#F4F4F4]"
              placeholder="Select your country"
              value={countryOptions.find(
                (option) => option.value === filters.country
              )}
              onChange={(selectedOption: any) =>
                handleFilterChange({
                  target: {
                    name: "country",
                    value: selectedOption?.value || "",
                  },
                })
              }
            />
            {/* <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="p-3 rounded-md text-sm bg-[#F4F4F4]  focus:outline-none w-full my-2"
            >
              <option value="" className="hidden">
                Country
              </option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select> */}

            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="p-3 rounded-md text-sm bg-[#F4F4F4]  focus:outline-none w-full my-2"
            >
              <option value="" className="hidden">
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* <option value="other">Other</option> */}
            </select>
          </div>
          <div className="w-full">
            <div className="flex w-full md:w-[25%] ml-auto mb-4 items-center bg-[#F4F4F4] rounded-md">
              <input
                type="text"
                name="search by name"
                value={filters.search}
                onChange={handleFilterChange}
                className="p-3 rounded-md text-sm bg-[#F4F4F4] focus:outline-none w-full"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6C6C6C] mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-2 flex justify-center items-center min-h-[300px]">
                  <Spin size="large" />
                </div>
              ) : players.length === 0 ? (
                <div className="col-span-3 text-center py-10">
                  No players found.
                </div>
              ) : (
                visiblePlayers.map((player: any) => (
                  <div
                    key={player._id}
                    className="relative cursor-pointer"
                    onClick={() => {
                      setData(player), handlePlayerClick(player._id);
                    }}
                  >
                    <img
                      src={player.profilePicture || "/images/player-2.jpg"}
                      className="object-cover h-80 w-full rounded-xl"
                      alt=""
                    />
                    <div className="blur bg-[#000310] opacity-50 absolute right-0 left-0 rounded-b-xl bottom-0 h-20"></div>
                    <div className="absolute right-0 left-0 bottom-0 p-4 z-10 ">
                      <div className="flex justify-between my-2 text-white">
                        <div className="flex items-center gap-1">
                          <p>{player.fullName}</p>
                          {player.plan && player.plan !== "free" && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0095FF" className="w-4 h-4">
                              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {player.country && (
                          <img
                            src={`https://flagcdn.com/24x18/${player.country.toLowerCase()}.png`}
                            alt={`${player.country} flag`}
                            className="inline-block ml-2 mr-1 rounded-sm"
                            width={24}
                            height={18}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>

                      <p className="text-xs text-[#D3D3D3]">
                        {
                          userPosition.find(
                            (pos: any) => pos.value === player?.mainPosition
                          )?.label
                        }
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-10"></div>
            {/* Bottom loader */}
            {hasMore && (
              <div className="flex justify-center items-center py-4 text-sm text-[#6C6C6C]">
                Loading more...
              </div>
            )}
          </div>
        </div>
        <PlayerModal
          data={data}
          open={showModal}
          onClose={() => { setShowModal(false), router.push('/players'); }}
        />
      </section>
      <ContactComp />
      <FooterNav />
    </>
  );
};

export default players;
