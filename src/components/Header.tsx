import { useAuth } from "@/context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import { lobster, acme } from "../utils/fonts";
import Link from "next/link";
import toast from "react-hot-toast";
import DotLoader from "./DotLoader";

interface HeaderProps {
  set_is_assistant_drawer_open?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = (props) => {
  const { set_is_assistant_drawer_open } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [storyName, setStoryName] = useState("");
  const { user, getLatestToken, logout } = useAuth();
  const [creatingNewStory, setCreatingNewStory] = useState(false);
  const [onStoryMainPage, setOnStoryMainPage] = useState(false);

  useEffect(() => {
    if (set_is_assistant_drawer_open !== undefined) {
      setOnStoryMainPage(true);
    }
  }, []);

  const handleSave = async () => {
    if (storyName === "") {
      toast.error("Please enter story name", {
        style: {
          fontWeight: "bold",
          border: "3px solid red",
          borderRadius: "50px",
          backgroundColor: "white",
        },
      });
      return;
    }
    setCreatingNewStory(true);
    const token = await getLatestToken();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/add-new-story`,
        {
          story_name: storyName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const storyId = response.data.story_id;
        router.push(`/story/${storyId}`);
      } else {
        console.error("Error making API call");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong", {
        style: {
          fontWeight: "bold",
          border: "3px solid red",
          borderRadius: "50px",
          backgroundColor: "white",
        },
      });
    } finally {
      setCreatingNewStory(false);
    }
  };

  return (
    <header className="top-0 absolute bg-gray-950 text-white border-b border-gray-700 h-[60px] flex items-center w-full px-4 z-50">
      <div className="w-full flex items-center justify-between">
        {/* Desktop View */}

        <div className="hidden md:flex items-center justify-between w-full">
          <Link
            href="/"
            className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer`}
          >
            Story_Co-Pilot
          </Link>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <button
                  className={`${acme.className} hover:bg-gray-700 bg-gray-800 px-4 py-2 rounded-full`}
                  onClick={onOpen}
                >
                  New Story
                </button>
                {onStoryMainPage && (
                  <button
                    className={`${acme.className} hover:bg-gray-700 bg-gray-800 px-4 py-2 rounded-full`}
                  >
                    Generate Images
                  </button>
                )}

                <UserDropdown />
              </>
            ) : (
              <>
                <button
                  className="shooting-star-border"
                  onClick={() => router.push("/login")}
                >
                  <span className="spark__container">
                    <span className="spark" />
                  </span>
                  <span className="backdrop" />
                  <span className="text">Login</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-screen">
          <Link
            href="/"
            className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer`}
          >
            Story_Co-Pilot
          </Link>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                {onStoryMainPage ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <div className="flex flex-col gap-[3px] p-2">
                        <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                        <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                        <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="new_story_dropdown"
                        aria-label="new story"
                      >
                        <button
                          className="w-full bg-gray-700 py-1 px-3 rounded-md"
                          onClick={onOpen}
                        >
                          New Story
                        </button>
                      </DropdownItem>
                      <DropdownItem
                        key="ai_assistant_dropdown"
                        aria-label="ai assistant"
                      >
                        <button
                          className="w-full bg-gray-700 py-1 px-3 rounded-md"
                          onClick={() => {
                            if (set_is_assistant_drawer_open !== undefined) {
                              set_is_assistant_drawer_open(true);
                            }
                          }}
                        >
                          AI Assistant
                        </button>
                      </DropdownItem>
                      <DropdownItem
                        key="generate_images_dropdown"
                        aria-label="generate images"
                      >
                        <button className="w-full bg-gray-700 py-1 px-3 rounded-md">
                          Generate Images
                        </button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <button
                    className={`${acme.className} hover:bg-gray-700 bg-gray-800 px-4 py-2 rounded-full`}
                    onClick={onOpen}
                  >
                    New Story
                  </button>
                )}

                <UserDropdown />
              </>
            ) : (
              <>
                <button
                  className="shooting-star-border"
                  onClick={() => router.push("/login")}
                >
                  <span className="spark__container">
                    <span className="spark" />
                  </span>
                  <span className="backdrop" />
                  <span className="text">Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* when save is clicked */}
      <div
        className={
          creatingNewStory
            ? "absolute left-0 top-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center z-50 bg-transparent text-cyan-300 backdrop-blur-sm"
            : "hidden"
        }
      >
        <DotLoader />
        <p className="text-black">Saving...</p>
      </div>

      {/* new story modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <label
                  htmlFor="new_story"
                  className="text-xl font-bold text-white"
                >
                  Enter name of the story
                </label>
                <input
                  type="text"
                  value={storyName}
                  onChange={(e) => setStoryName(e.target.value)}
                  className="my-4 w-full h-10 bg-gray-200 p-1 rounded-lg text-black"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleSave();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  );
};

export default Header;
