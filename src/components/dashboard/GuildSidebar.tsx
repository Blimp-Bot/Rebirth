// import { Guild } from "discord.js";
// import { Card } from "../ui/card";
// import {
//   Blocks,
//   ChevronDown,
//   ChevronsUp,
//   Cog,
//   Command,
//   Folder,
//   Hand,
//   Layers,
//   MessageSquare,
//   ShieldPlus,
//   SmilePlus,
//   Stars,
//   Ticket,
//   TicketCheck,
// } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "../ui/accordion";
// import { Badge } from "../ui/badge";
// import { capitlize } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { useAvailableGuildStore } from "@/lib/stores";
// import { useState } from "react";
// import { GuildAvatar } from "../Avatar";

import { useAvailableGuildStore, useGuildStore } from "@/lib/stores";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { Guild } from "discord.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { GuildAvatar } from "../Avatar";
import { SeparatorHorizontal, User } from "lucide-react";
import { limitSentence } from "@/lib/utils";

// export const TABS = {
//   all: [
//     {
//       name: "Dashboard",
//       href: "/",
//       icon: <Blocks width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Settings",
//       href: "/settings",
//       icon: <Cog width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Subscription",
//       href: "/subscription",
//       icon: <Stars width={17} height={17} />,
//       pro: false,
//     },
//   ],
//   engagement: [
//     {
//       name: "Welcome & Goodbye",
//       href: "/welcome-and-goodbye",
//       icon: <Hand width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Embed & Messages",
//       href: "/embed-and-messages",
//       icon: <MessageSquare width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Leveling",
//       href: "/leveling",
//       icon: <ChevronsUp width={17} height={17} />,
//       pro: false,
//     },
//   ],
//   management: [
//     {
//       name: "Logging",
//       href: "/logging",
//       icon: <Folder width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Moderation",
//       href: "/leveling",
//       icon: <ShieldPlus width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Commands",
//       href: "/commands",
//       icon: <Command width={17} height={17} />,
//       pro: false,
//     },
//   ],
//   utilites: [
//     {
//       name: "Reaction Roles",
//       href: "/reaction-roles",
//       icon: <SmilePlus width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Custom Commands",
//       href: "/custom-commands",
//       icon: <Layers width={17} height={17} />,
//       pro: false,
//     },
//     {
//       name: "Ticketing",
//       href: "/tickets",
//       icon: <TicketCheck width={17} height={17} />,
//       pro: false,
//     },
//   ],
// };

// export type GuildSidebarProps = {
//   guild: Guild;
// };

// export default function GuildSidebar(props: GuildSidebarProps) {
//   return (
//     <Card className="rounded-none bg-dark-foreground border-blimp-border overflow-y-scroll flex h-screen top-0 left-0 right-0 bottom-0 flex-col gap-2 py-[2rem] px-[0.75rem] min-w-[17rem] max-w-[17rem] ">
//       <GuildList guild={props.guild} />
//       <Accordion type="multiple" defaultValue={[...Object.keys(TABS)]}>
//         {Object.keys(TABS).map((k, i) => {
//           if (k.toLowerCase() === "all") {
//             return (
//               <div key={i} className="flex flex-col gap-2 mt-[1rem]">
//                 {TABS[k as keyof typeof TABS].map((tab, i) => {
//                   return (
//                     <a
//                       href={`/dashboard/${props.guild.id}${tab.href}`}
//                       key={i}
//                       className={`flex flex-row justify-between px-[0.7rem] group bg-transparent hover:bg-gray-200/5 py-[0.7rem] rounded-md smooth_transition ${i === TABS[k as keyof typeof TABS].length - 1 ? "mb-[1rem]" : ""}`}
//                     >
//                       <div className="flex items-center gap-2 opacity-65 group-hover:opacity-100 smooth_transition">
//                         <span className="mt-[2px]">{tab.icon}</span>
//                         <p className="font-semibold text-sm">
//                           {capitlize(tab.name)}
//                         </p>
//                       </div>

//                       {tab.pro && (
//                         <div>
//                           <Badge variant={"pro"}>Pro</Badge>
//                         </div>
//                       )}
//                     </a>
//                   );
//                 })}
//               </div>
//             );
//           } else {
//             return (
//               <AccordionItem className="mb-[0.45rem]" key={i} value={k}>
//                 <AccordionTrigger className="cursor-pointer bg-transparent hover:bg-gray-100/5 py-[0.5rem] px-[0.5rem] font-black text-xs">
//                   {k.toUpperCase()}
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-2 mt-[1rem]">
//                   {TABS[k as keyof typeof TABS].map((tab, i) => {
//                     return (
//                       <a
//                         href={`/dashboard/${props.guild.id}${tab.href}`}
//                         key={i}
//                         className="flex flex-row justify-between px-[0.7rem] group bg-transparent hover:bg-gray-200/5 py-[0.7rem] rounded-md smooth_transition"
//                       >
//                         <div className="flex gap-2 opacity-65 group-hover:opacity-100 smooth_transition">
//                           <span className="mt-[1.5px]">{tab.icon}</span>
//                           <p className="font-semibold text-sm">
//                             {capitlize(tab.name)}
//                           </p>
//                         </div>

//                         {tab.pro && (
//                           <div>
//                             <Badge variant={"pro"}>Pro</Badge>
//                           </div>
//                         )}
//                       </a>
//                     );
//                   })}
//                 </AccordionContent>
//               </AccordionItem>
//             );
//           }
//         })}
//       </Accordion>
//     </Card>
//   );
// }

// export type GuildListProps = {
//   guild: Guild;
// };

// export function GuildList(props: GuildListProps) {
//   const availableGuilds = useAvailableGuildStore((s) => s.guilds);
//   const [open, setOpen] = useState(false);
//   return (
//     <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
//       <DropdownMenuTrigger asChild>
//         <Card className="cursor-pointer p-[0.7rem] border-blimp-border shadow-sm bg-blimp-active items-center  flex flex-row justify-between">
//           <div className="flex flex-row gap-2">
//             <GuildAvatar
//               size={25}
//               iconHash={props.guild.icon}
//               id={props.guild.id}
//               name={props.guild.name}
//             />
//             {props.guild.name}
//           </div>
//           <ChevronDown
//             className={`opacity-60 smooth_transition ${open ? "rotate-180" : "rotate-0"}`}
//             width={17}
//             height={17}
//           />
//         </Card>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[15.4rem] bg-blimp-active border-blimp-border p-[0.25rem]">
//         {availableGuilds
//           ?.filter((f) => f.id !== props.guild.id)
//           .map((av, i) => (
//             <a
//               key={i}
//               href={`/dashboard/${av.id}`}
//               className="w-[100%] cursor-pointer p-[0.7rem] items-center bg-transparent rounded-md hover:bg-dark-foreground flex flex-row gap-2 smooth_transition"
//             >
//               <GuildAvatar
//                 size={25}
//                 iconHash={av.icon}
//                 id={av.id}
//                 name={av.name}
//               />
//               {av.name}
//             </a>
//           ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

export type GuildSidebarProps = {
  guild: Guild;
};
export default function GuildSidebar(props: GuildSidebarProps) {
  const { guilds } = useAvailableGuildStore();
  return (
    <div className="flex flex-col w-[30vw] border-r border-blimp-border bg-dark-foreground h-[100vh] p-1 overflow-y-scroll overflow-x-hidden">
      <GuildSidebarSelector guild={props.guild} guilds={guilds as Guild[]} />
    </div>
  );
}

export type GuildSidebarSelectorProps = {
  guild: Guild;
  guilds: Guild[];
};
export function GuildSidebarSelector({
  guild,
  guilds,
}: GuildSidebarSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent outline-none w-full hover:bg-blimp-active smooth_transition cursor-pointer rounded-md shadow-none hover:shadow-md flex gap-3  items-center justify-between p-2 border border-transparent hover:border-blimp-border mt-1">
        <div className="flex flex-row gap-2 items-center">
          <GuildAvatar
            size={35}
            className="rounded-md"
            iconHash={guild.icon}
            id={guild.id}
            name={guild.name}
          />
          <h1 className="text-sm font-semibold">{limitSentence(guild.name, 17)}</h1>
        </div>
        <div>
          <SeparatorHorizontal className="w-[20px] text-blimp-abstract-text" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-blimp-active flex flex-col gap-2 border border-blimp-border w-[100%] p-2 shadow-lg">
        {guilds
          .filter((f) => f.id !== guild.id)
          .map((g, i) => (
            <a
              href={`/dashboard/${g.id}`}
              key={g.id}
              className="flex bg-transparent hover:bg-dark-foreground p-2 rounded-md cursor-pointer smooth_transition flex-row gap-2 items-center"
            >
              <GuildAvatar
                size={35}
                className="rounded-md"
                iconHash={g.icon}
                id={g.id}
                name={g.name}
              />
              <h1 className="text-sm font-semibold">{limitSentence(g.name, 17)}</h1>
            </a>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
