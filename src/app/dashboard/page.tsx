"use client";

import { Card } from "@/components/ui/card";
import { useAvailableGuildStore, useUserStore } from "@/lib/stores";
import { capitlize } from "@/lib/utils";
import ProdAvatarTransparent from "@/assets/AVATAR_PROD-TRANSPARENT.png";
import Image from "next/image";
import { toast } from "@/components/Toast";
import { GuildAvatar } from "@/components/Avatar";
import { PersonStanding, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Guild } from "discord.js";
import { env } from "@/env";

export default function DashboardPage() {
  const { guilds } = useAvailableGuildStore();
  const { user, session } = useUserStore();

  return (
    <div className="mx-auto px-[2rem] mt-[5rem] items-center justify-center gap-[3rem] flex flex-col">
      <div className="flex flex-col items-center">
        <Image
          src={ProdAvatarTransparent}
          className="p-0"
          alt="Transparent Variation of Blimp's Production Logo"
          width={100}
        />
        <h1 className="font-bold text-3xl mt-[-1rem]">
          Welcome to Blimp, {capitlize(user?.name as string)}.
        </h1>
        <p className="text-sm text-center opacity-60 mt-2">
          Below you will find a collection of all servers that you can Manage.{" "}
          <br />
          <span
            className="text-blue-300 cursor-pointer"
            onClick={() =>
              toast({
                title: "Heres why",
                icon: "info",
                description:
                  'We require that you have the "Manage Guild" permission to access your server. Please double check your permissions and then refresh this page.',
              })
            }
          >
            Cant find the server you're looking for?
          </span>
        </p>
      </div>

      <div className="gap-2 flex flex-wrap w-[90vw] items-center justify-center">
        {(() => {
          // Combine all guilds
          const allGuilds = [
            ...(guilds as Guild[]),
            ...JSON.parse(user?.guilds as string),
          ];

          // Create a Map to track guilds by ID, prioritizing those with numeric memberCount
          const guildMap = new Map();

          allGuilds.forEach((guild) => {
            const existingGuild = guildMap.get(guild.id);

            if (!existingGuild) {
              // First time seeing this guild, add it
              guildMap.set(guild.id, guild);
            } else {
              // Guild already exists, keep the one with numeric memberCount
              const hasNumericMemberCount =
                typeof guild.memberCount === "number";
              const existingHasNumericMemberCount =
                typeof existingGuild.memberCount === "number";

              if (hasNumericMemberCount && !existingHasNumericMemberCount) {
                // Replace with the one that has numeric memberCount
                guildMap.set(guild.id, guild);
              }
              // If both have numeric or both don't have numeric, keep the existing one
            }
          });

          // Convert back to array
          return Array.from(guildMap.values());
        })().map((guild, i) => (
          <div
            key={guild.id} // Use guild.id instead of index for better React key
            className="lg:w-[22%] md:w-[48%] sm:w-[100%] p-[1rem] border rounded-md col-span-1 bg-dark-foreground border-blimp-border"
          >
            <div className="flex flex-row gap-3 items-center">
              <GuildAvatar
                size={60}
                className="rounded-md"
                iconHash={guild.icon}
                name={guild.name}
                id={guild.id}
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">{guild.name}</h1>
                {typeof guild.memberCount === "number" && (
                  <p className="flex flex-row gap-1 opacity-60">
                    <User className="w-[17px]" />
                    <span>{guild.memberCount} members</span>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mt-[1.5rem]">
              <Button asChild className="w-full">
                {typeof guild.memberCount === "number" ? (
                  <a href={`/dashboard/${guild.id}`}>Manage</a>
                ) : (
                  <a
                    href={`${env.NEXT_PUBLIC_DISCORD_BOT_INVITE_URL}&guild_id=${guild.id}&disable_guild_select=true`}
                  >
                    Invite to Server
                  </a>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
