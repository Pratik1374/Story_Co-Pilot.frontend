import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

export const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <header className="top-0 absolute bg-gray-800 text-white p-4 border-b border-gray-700 w-screen h-[60px] flex items-center">
      <div className="w-full flex items-center justify-between">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          <h1 className="text-xl font-bold text-purple-700">Story_Co-Pilot</h1>
          <div className="flex gap-3 items-center">
            <button
              className="hover:text-white bg-gray-700 px-4 py-2 rounded-full"
              onClick={onOpen}
            >
              New Story
            </button>
            <button className="hover:text-white bg-gray-700 px-4 py-2 rounded-full">
              Generate Images
            </button>
            <div className="rounded-full w-8 h-8 overflow-hidden flex items-center justify-center">
              <img
                src="https://www.gravatar.com/avatar/?d=mp"
                alt="Profile Image"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-screen">
          <h1 className="text-xl font-bold text-purple-700">Story_Co-Pilot</h1>
          <div className="flex gap-3 items-center">
            <Popover>
              <PopoverTrigger>
                <div className="flex flex-col gap-[3px] p-2">
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2 w-[200px] items-center justify-center py-4 bg-gray-900 rounded-md">
                  <button
                    className="w-[90%] bg-gray-700 py-1 px-3 rounded-full"
                    onClick={onOpen}
                  >
                    New Story
                  </button>
                  <button className="w-[90%] bg-gray-700 py-1 px-3 rounded-full">
                    AI Assistant
                  </button>
                  <button className="w-[90%] bg-gray-700 py-1 px-3 rounded-full">
                    Generate Images
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="rounded-full w-8 h-8 overflow-hidden">
              <img
                src="https://www.gravatar.com/avatar/?d=mp"
                alt="Profile Image"
                className="object-cover"
              />
            </div>
          </div>
        </div>
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
                  className="my-4 w-full h-10 bg-gray-200 p-1 rounded-lg text-black"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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
