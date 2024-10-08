"use client";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/user.provider";
import { useUserSubscription } from "@/src/hooks/auth.hook";
import { IUser } from "@/src/types";
import { useGetUsers } from "@/src/hooks/users.hook";

const SubscriptionPage = () => {
  const { user } = useUser();
  const { data: userData, isLoading } = useGetUsers();
  const { mutate: handleUserSubscription, isPending } = useUserSubscription();

  // Check if data is still loading
  if (isLoading || !userData || !user) {
    return <div>Loading...</div>;
  }

  const currentUser = userData?.data?.filter((u: IUser) => u._id === user._id);

  const handleSubscription = (id: string) => {
    handleUserSubscription({
      cus_name: user?.name,
      cus_email: user?.email,
      cus_phone: user?.mobileNumber,
      amount: 50,
      userId: id,
    });
  };

  return (
    <div className="h-full flex w-full flex-col bg-[#170F21] text-white p-8 rounded items-center justify-center">
      {currentUser[0]?.role === "PREMIUM" ? (
        <div className="text-center">
          <h1 className="text-3xl">You have been already subscribed.</h1>
          <p className="text-sm">Thank for subscribing us.</p>
        </div>
      ) : (
        <div className="border-1 border-dotted border-red-500 rounded-lg flex flex-col justify-center items-center space-y-5 p-8">
          <h1 className="text-center text-3xl font-semibold">
            Subscription Plan
          </h1>
          <p className="text-center text-sm text-stone-300">
            Unlock all features with our Pro Plan. Get unlimited access to all
            content, priority support, and much more.
          </p>
          <p className="text-xl font-semibold">
            <span>Price: </span>BDT 50 / month
          </p>
          <Button
            color="primary"
            isLoading={isPending}
            onClick={() => handleSubscription(user?._id as string)}
          >
            Buy Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
