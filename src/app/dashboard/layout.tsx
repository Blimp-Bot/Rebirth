"use client";

import ForceHome from "@/components/auth/ForceHome";
import GuildSidebar from "@/components/dashboard/GuildSidebar";
import Loader from "@/components/loader";
import { env } from "@/env";
import { authClient, Session } from "@/lib/auth/client";
import { useAvailableGuildStore, useUserStore } from "@/lib/stores";
import { betterFetch } from "@better-fetch/fetch";
import { useMutation } from "@tanstack/react-query";
import { Guild } from "discord.js";
import React from "react";
import { toast, Toaster } from "sonner";
import { useSpinDelay } from "spin-delay";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Variables for data stores - Reduces amount of api calls required + quicker than api calls.
  const { user, session, setUser, setSession } = useUserStore();
  const { guilds, setGuilds } = useAvailableGuildStore();
  const [loading, setLoading] = React.useState(true);

  // Fetch current session - fetched each child route call incase signed out.
  const { data: sessionData, isPending } = authClient.useSession();

  // Use a mutation so that we dont have to fetch on every child route call.
  const { isError, error, mutateAsync } = useMutation({
    mutationKey: ["getGuilds", "dashboard"],
    mutationFn: (guilds: {id: string, name: string}[]) =>
      betterFetch<{
        ok: boolean;
        data: any[];
      }>(`${env.NEXT_PUBLIC_API_URL}/dash/guilds/in/`, {
        method: "POST",
        body: {
          ids: guilds,
        },
        headers: {
          "bearer-user-id": `${user?.user_id}`,
        },
        onRequest: () => {
          console.log("Sending request to /dash/guilds/in/ with IDs:", guilds);
        },
        onError: (error: any) => {
          console.error("API request failed:", error);
          toast.error(
            "Failed to fetch guilds availability, please refresh to try again."
          );
        },
      }),
  });
  React.useEffect(() => {
    if (sessionData && !session) {
      setSession(sessionData.session as unknown as Session);
      if (sessionData.user && !user) {
        //@ts-ignore
        setUser(sessionData.user);
        try {
          // Parse guild data from session
          //@ts-ignore
          const guildData = JSON.parse(sessionData.user.guilds);
          console.log("Parsed guild data:", guildData);

          // Extract just the IDs regardless of format
          const guildIds = Array.isArray(guildData)
            ? guildData.map((g) => ({id: g.id, name: g.name}))
            : [];

          // Only proceed if we have IDs
          if (guildIds.length > 0) {
            mutateAsync(guildIds)
              .then((r) => {
                console.log("API response:", r);
                if (r.data?.data) {
                  console.log(r.data.data);
                  setGuilds(r.data.data as unknown as Guild[]);
                } else {
                  console.error("No guild data in response");
                }
              })
              .catch((error) => {
                console.error("API call failed:", error);
              });
          } else {
            console.warn("No guild IDs found to send to API");
            setLoading(false);
          }
        } catch (err) {
          console.error("Error parsing guild data:", err);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else if (session) {
      setLoading(false);
    }
  }, [sessionData, session, user, setSession, setUser]);

  // If failed to find session data, then recreate the object.
  const effectiveSession =
    user && session ? { user: user, session: session } : sessionData;

  // Add spinner delay to prevent a blank page load.
  const showSpinner = useSpinDelay(loading || isPending, {
    delay: 500,
    minDuration: 200,
  });

  // Error/use case handling
  if (showSpinner) return <Loader />;

  if (!effectiveSession) return <ForceHome />;

  return (
    <>
      <div className="flex w-full">{children}</div>
    </>
  );
}
