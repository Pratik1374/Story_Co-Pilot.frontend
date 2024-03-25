import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogOut = async () => {
    await logout();
    alert("logged out");
  };

  function handleAllStoriesClick(): void {
    router.push(`/all_stories/${user?.uid}`);
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="rounded-full w-8 h-8 overflow-hidden cursor-pointer">
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#ad04bf] to-[#cc93f5]",
              icon: "text-black/80",
            }}
            size="sm"
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new_story_dropdown">
          <button className="w-full bg-gray-700 py-1 px-3 rounded-md">
            Profile
          </button>
        </DropdownItem>
        <DropdownItem key="ai_assistant_dropdown">
          <button
            className="w-full bg-gray-700 py-1 px-3 rounded-md"
            onClick={() => handleAllStoriesClick()}
          >
            All Stories
          </button>
        </DropdownItem>
        <DropdownItem key="generate_images_dropdown">
          <button
            className="w-full bg-gray-700 py-1 px-3 rounded-md"
            onClick={() => handleLogOut()}
          >
            Log Out
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
