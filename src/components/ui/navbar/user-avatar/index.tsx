import Image from "next/image";

import { Gravatar } from "@/lib/gravatar";

export async function NavbarUserAvatar({ email }: { email: string }) {
  const avatar = Gravatar.url(email);
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
