import ProductionAvatarTransparent from "@/assets/AVATAR_PROD-TRANSPARENT.png"
import Image from "next/image"

export default function GuildNavigationBar() {
    return <div className="flex flex-row justify-between p-2 w-full bg-dark-foreground border-b border-blimp-border">
        <div className="flex items-center justify-center">
            <Image width={50} src={ProductionAvatarTransparent} alt="Transparent variation of Blimp's production logo"/>
            <h1 className="font-semibold text-sm">Blimp</h1>
        </div>
        
    </div>
}