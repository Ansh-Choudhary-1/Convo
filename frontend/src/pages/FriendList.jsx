import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { UserCheckIcon, UsersIcon } from "lucide-react";
import NoFriendsFound from "../components/NoFriendsFound";
import Sidebar from "../components/Sidebar";
import ThemeSelector from "../components/ThemeSelector";
import useAuthUser  from "../hooks/useAuthUser";
import { Link } from "react-router";

const FriendList = () => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const { user } = useAuthUser();

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <UsersIcon className="h-6 w-6 text-primary" />
              Friends
            </h1>
            <div className="flex items-center gap-4">
              {user && (
                <div className="avatar w-10 h-10 rounded-full bg-base-300">
                  <img src={user.profilePic} alt={user.fullName} />
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {friends && friends.length > 0 ? (
                <section className="space-y-4">
                  <div className="space-y-3">
                    {friends.map((friend) => (
                        <Link to = {`/chat/${friend._id}`} key={friend._id}>
                      <div
                        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img src={friend.profilePic} alt={friend.fullName} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{friend.fullName}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {friend.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {friend.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : (
                <NoFriendsFound />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FriendList;
