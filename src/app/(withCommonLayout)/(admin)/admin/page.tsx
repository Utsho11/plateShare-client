"use client";
import { FollowerIcon, FollowingIcon } from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="h-[100vh-100px] text-white bg-[#170F21] py-8 px-5 rounded">
      <h1 className="font-[600] text-[28px]">My Profile </h1>
      <hr className="my-4 text-white" />
      <div className="my-8">
        <div className="grid grid-cols-2 justify-between">
          <p className="text-[20px] font-[600]">Full Name:</p>
          <p className="text-[20px] font-[600]">Email:</p>
        </div>
        <div className="grid grid-cols-2 justify-between">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <hr className="my-4 text-white" />
      <div className="my-8">
        <div className="grid grid-cols-2 justify-between">
          <p className="text-[20px] font-[600]">User Role:</p>
          <p className="text-[20px] font-[600]">Mobile Number:</p>
        </div>
        <div className="grid grid-cols-2 justify-between">
          <p>{user?.role}</p>
          <p>{user?.mobileNumber}</p>
        </div>
      </div>
      <hr className="my-4 text-white" />
      <div className="my-8">
        <div className="grid grid-cols-2 justify-between">
          <p className="text-[20px] font-[600] flex gap-3 items-center">
            <FollowerIcon />
            Followers:<span>{user?.followers?.length}</span>
          </p>
          <p className="text-[20px] font-[600] flex gap-3 items-center">
            <FollowingIcon />
            Followings:<span>{user?.followings?.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
