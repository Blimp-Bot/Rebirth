"use client";

import { Check, Cross, MessageCircleQuestion } from "lucide-react";
// https://sonner.emilkowal.ski/styling

import React from "react";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  icon?: keyof typeof ToastIconStyles;
  title?: React.ReactElement | React.ReactNode | string;
  description: React.ReactElement | React.ReactNode | string;
}

export function toast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      icon={toast.icon}
      id={id}
      title={toast.title}
      description={toast.description}
    />
  ));
}

export type ToastIconProps = {
  style: keyof typeof ToastIconStyles;
};

export const ToastIconStyles = {
  success: (
    <div className="bg-emerald-500 bg-opacity-10 rounded-md px-[2px]">
      <Check className="w-[20px]" />
    </div>
  ),
  info: (
    <div className="bg-blue-500 bg-opacity-10 rounded-md px-[2px]">
      <MessageCircleQuestion className="w-[20px]" />
    </div>
  ),
  error: (
    <div className="bg-red-500 bg-opacity-10 rounded-md px-[2px]">
      <Cross className="w-[20px]" />
    </div>
  ),
};

export function ToastIcon(props: ToastIconProps) {
  return <>{ToastIconStyles[props.style]}</>;
}

function Toast(props: ToastProps) {
  const { title, description, icon } = props;

  return (
    <div className="flex rounded-lg border  border-blimp-border bg-dark-foreground shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <div className={`flex flex-row gap-2 items-center ${title && "mb-3"}`}>
            {icon !== undefined && <ToastIcon style={icon} />}
            <p className="text-sm font-medium text-white">
              {title ? title : description}
            </p>
          </div>
          {title && <p className="mt-1 text-sm text-white/60">{description}</p>}
        </div>
      </div>
    </div>
  );
}

// export default function Example() {
//   return (
//     <button
//       className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
//       onClick={() => {
//         toast({
//           title: "This is a headless toast",
//           description:
//             "You have full control of styles and jsx, while still having the animations.",
//           button: {
//             label: "Reply",
//             onClick: () => sonnerToast.dismiss(),
//           },
//         });
//       }}
//     >
//       Render toast
//     </button>
//   );
// }
