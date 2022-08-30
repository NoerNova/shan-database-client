import { useContext, Suspense, useState } from 'react';
import { Modal, Image, Loader, Button } from '@mantine/core';
import { ViewportWide } from 'tabler-icons-react';

import { ModalPreviewContext } from "./modalReducer";

import { getImageThumbnail, getImagePath } from "@helpers/ImageThumbnail";
import { dateFormat } from "utils/date";

import FilesViewer from '@helpers/FilesViewer';

const RenderPreview = () => {

  const { modalState, modalDispatch } = useContext(ModalPreviewContext);

  const [mouseHover, setMouseHover] = useState(false);
  const [imageViewer, setImageViewer] = useState(false);

  const { item, user } = modalState;

  const handleCloseModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  }

  return (
    <Modal
      opened={modalState.opened}
      onClose={() => handleCloseModal()}
      centered
      size="70%"
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-4 gap-12">
          <div
            onMouseOver={() => setMouseHover(true)}
            onMouseLeave={() => { setMouseHover(false) }}
            className="relative flex col-span-2 justify-center align-center items-center">
            <div className={`flex justify-center items-center ${mouseHover ? "opacity-80" : "opacity-100"}`}>
              <FilesViewer item={item} sid={user.sid} />
            </div>
            <div className={`absolute bg-gray-200/[.5] rounded-full ${mouseHover ? "visible" : "invisible"}`}>
              <Button onClick={() => setImageViewer(true)} leftIcon={<ViewportWide />} variant="default" radius="xl" color="dark">
                View
              </Button>
            </div>
          </div>
          <div className="col-span-2">
            <div className="pb-5">
              <div className="font-bold text-2xl">{item.name}</div>
            </div>
            <div className="pb-3">
              <p className="font-bold text-l">File type: </p>
              <p>{item.type}</p>
            </div>
            <div className="pb-3">
              <p className="font-bold text-l">create date: </p>
              <p className="font-medium">{dateFormat(item.create_time.$date)}</p>
            </div>
            <div className="">
              <p className="font-bold text-l">modifiled date: </p>
              <p className="font-medium">{dateFormat(item.modifiled_time.$date)}</p>
            </div>
          </div>
        </div>
        <div className="absolute">
          <Modal
            opened={imageViewer}
            onClose={() => setImageViewer(false)}
            centered
            size="70%"
            overflow="outside"
            lockScroll
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
          >
            <Image
              alt={item.name}
              radius="md"
              src={getImageThumbnail(item.type, item.path, user.sid, 640)}
              withPlaceholder
              placeholder={
                <Loader />
              }
            />
          </Modal>
        </div>
      </Suspense>
    </Modal>
  )
}

export default RenderPreview;
