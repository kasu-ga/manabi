import Image from "next/image";

import { Gravatar } from "@/lib/gravatar";
import { getSessionData } from "@/services/session";

export async function NavbarUserAvatar() {
  const { user } = await getSessionData();
  const avatar = Gravatar.url(user.email);
  return (
    <div className="relative w-10 aspect-square">
      <Image
        className="object-cover rounded-full"
        fill
        src={avatar}
        alt="Profile user picture."
      />
    </div>
  );
}
