import { userAtom } from "@/store/user";
import { getAge } from "@/utils/ageConverter";
import { positions } from "@/utils/positions";
import { useAtomValue } from "jotai";
import React from "react";

const UserComp = () => {
  const user = useAtomValue(userAtom);
  const userPosition = positions
  const positionLabel = userPosition.find(
    (pos: any) => pos.value === user?.mainPosition
  )?.label;

  return (
    <>
      <img
        src={user?.profilePicture || "/images/player-2.jpg"}
        className="rounded-xl w-full md:h-90 object-cover"
        alt=""
      />
      <p className="text-lg mt-2 font-bold">{user?.fullName}</p>
      <p className="my-2 text-sm text-[#6C6C6C]">{positionLabel}</p>
      <div className="bg-[#F4F4F4] p-3 text-center rounded-xl grid grid-cols-3 gap-2">
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Age</p>
          <p className="font-bold mt-3 text-lg">
            {user?.dateOfBirth && getAge(user.dateOfBirth)}
          </p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Height</p>
          <p className="font-bold mt-3 text-lg">{user?.height}</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Weight</p>
          <p className="font-bold mt-3 text-lg">{user?.weight}</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Dominant Foot</p>
          <p className="font-bold mt-3 capitalize text-lg">
            {user?.dominantFoot}
          </p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Jersey Number</p>
          <p className="font-bold mt-3 text-lg">{user?.jerseyNumber}</p>
        </div>
        <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
          <p className="text-[#6C6C6C] text-xs">Gender</p>
          <p className="font-bold mt-3 capitalize text-lg">{user?.gender}</p>
        </div>
      </div>
    </>
  );
};

export default UserComp;
