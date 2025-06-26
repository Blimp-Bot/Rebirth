"use client";

import { FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";
import { redirect } from "next/navigation";
import { toast } from "@/components/Toast";
import ProdAvatarTransparent from "@/assets/AVATAR_PROD-TRANSPARENT.png";
import { env } from "@/env";
import Loader from "../loader";
import { useSpinDelay } from "spin-delay";
import Image from "next/image";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const { data, isPending, error } = authClient.useSession();
  useEffect(() => {
    if (data && data.user && data.session) {
      return redirect("/dashboard");
    }
  }, [data]);

  const showSpinner = useSpinDelay(isPending, { delay: 500, minDuration: 200 });
  if (showSpinner) return <Loader />;
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-start flex-col bg-dark-foreground border p-[1rem] rounded-md border-blimp-border w-[500px]">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-lg">
            Hey! Thanks for giving Blimp a try.
          </h1>
          <Image
            width={60}
            src={ProdAvatarTransparent}
            alt="Transparent variation of Blimp's production logo"
          />
        </div>
        <p className="opacity-60 mt-1 text-sm">
          We just need a few basic details to get you started—nothing more than
          what's necessary. You're in control, and your privacy is important to
          us.
        </p>
        <Button
          onClick={() => {
            authClient.signIn.social(
              {
                provider: "discord",
                callbackURL: `${env.NEXT_PUBLIC_URL}/dashboard`,
                scopes: ["guilds", "identify"],
                fetchOptions: {},
              },
              {
                onRequest: () => {
                  toast({
                    icon: "info",
                    description: "Redirecting you to discord.",
                  });
                },
                onSuccess: () => {
                  toast({
                    icon: "success",
                    title: "Successfully logged in",
                    description: " You should be redirected soon.",
                  });
                },
                //@ts-ignore
                onError: (ctx) => {
                  toast({
                    icon: "error",
                    title: "Failed to sign you in.",
                    description:
                      "Please try again. If it continues then please report this error in my discord server.",
                  });
                  console.log(ctx);
                },
              }
            );
          }}
          className="flex w-full gap-3 mt-[2rem] items-center justify-center cursor-pointer"
        >
          <FaDiscord />
          Login With Discord
        </Button>
        <p className="text-xs opacity-60 mt-2">
          By continuing, you agree to our <a href="/tos">Terms of Service</a>{" "}
          and <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
