import React from "react";

const UserComp = () => {
  return (
    <>
      <img src="/images/player-2.jpg" className="rounded-xl md:h-90 object-cover" alt="" />
      <p className="text-lg mt-2 font-bold">Emmanuel Babalola</p>
      <p className="my-2 text-sm text-[#6C6C6C]">Central Midfielder</p>
      <div className="bg-[#F4F4F4] p-3 rounded-xl grid grid-cols-3 gap-2">
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Age</p>
          <p className="font-bold mt-3 text-lg">20</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Height</p>
          <p className="font-bold mt-3 text-lg">200cm</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Weight</p>
          <p className="font-bold mt-3 text-lg">20kg</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Dominant Foot</p>
          <p className="font-bold mt-3 text-lg">Right</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Jersey Number</p>
          <p className="font-bold mt-3 text-lg">7</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Gender</p>
          <p className="font-bold mt-3 text-lg">Male</p>
        </div>
      </div>
    </>
  );
};

export default UserComp;
