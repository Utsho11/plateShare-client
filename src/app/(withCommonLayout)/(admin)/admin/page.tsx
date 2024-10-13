"use client";
import { FollowerIcon, FollowingIcon } from "@/src/components/icons";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

export default function Profile() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: userData, isLoading } = useGetUsers();

  if (!user || isLoading || isUserLoading) {
    return <Loading />;
  }

  if (!user || !userData) {
    return <h1 className="text-5xl font-semibold">NO DATA FOUND!!!</h1>;
  }

  const currentUser =
    userData && userData?.data?.filter((u: IUser) => u?._id === user?._id);

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
          <p>{currentUser[0]?.name}</p>
          <p>{currentUser[0]?.email}</p>
        </div>
      </div>
      <hr className="my-4 text-white" />
      <div className="my-8">
        <div className="grid grid-cols-2 justify-between">
          <p className="text-[20px] font-[600]">User Role:</p>
          <p className="text-[20px] font-[600]">Mobile Number:</p>
        </div>
        <div className="grid grid-cols-2 justify-between">
          <p>{currentUser[0]?.role}</p>
          <p>{currentUser[0]?.mobileNumber}</p>
        </div>
      </div>
      <hr className="my-4 text-white" />
      <div className="my-8">
        <div className="grid grid-cols-2 justify-between">
          <p className="text-[20px] font-[600] flex gap-3 items-center">
            <FollowerIcon />
            Followers:<span>{currentUser[0]?.followers?.length}</span>
          </p>
          <p className="text-[20px] font-[600] flex gap-3 items-center">
            <FollowingIcon />
            Followings:<span>{currentUser[0]?.followings?.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
