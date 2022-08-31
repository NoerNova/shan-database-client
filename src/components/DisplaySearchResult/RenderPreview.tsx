import { useContext, Suspense, useState, useEffect } from 'react';
import { Modal, Image, Loader, Button } from '@mantine/core';
import { ViewportWide, Download } from 'tabler-icons-react';

import { ModalPreviewContext } from "./modalReducer";

import { getImageThumbnail, getImagePath } from "@helpers/ImageThumbnail";
import { dateFormat } from "utils/date";

import FilesViewer from '@helpers/FilesViewer';

const RenderPreview = () => {

  const { modalState, modalDispatch } = useContext(ModalPreviewContext);

  const [mouseHover, setMouseHover] = useState(false);
  const [imageViewer, setImageViewer] = useState(false);
  const [supportView, setSupportView] = useState(false);

  const image_suffix_supported = ["jpg", "png", "gif", "svg", "bmp", "ico"];

  const { item, user } = modalState;

  const handleCloseModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  }

  const { image_path, image_name_path } = getImagePath(item.path);

  const handleDownload = () => {
    const downloadURL = `${import.meta.env.VITE_DOWNLOAD_URL}&sid=${user.sid}&source_path=${image_path?.[0]}&source_file=${image_name_path?.[0]}&source_total=1`

    return downloadURL;
  }

  const handleViewer = () => {

    let viewerURL = `${import.meta.env.VITE_BASE_URL}/${image_name_path?.[0]}?sid=${user.sid}&func=get_viewer&source_path=${image_path?.[0]}&source_file=${image_name_path?.[0]}`

    if (item.type === 'pdf') {
      window.open(viewerURL, '_blank');
    } else if (image_suffix_supported.includes(item.type)) {
      setImageViewer(true)
    }
  }

  useEffect(() => {
    if (item.type === 'pdf' || image_suffix_supported.includes(item.type)) {
      return setSupportView(true)
    }

    return setSupportView(false)
  }, [item.type])

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
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-4 gap-12 sm:grid-cols-1 sm:gap-2">
          <div
            onMouseOver={() => setMouseHover(true)}
            onMouseLeave={() => { setMouseHover(false) }}
            className="relative flex col-span-2 justify-center align-center items-center">
            <div className={`flex justify-center items-center h-[500px] sm:h-[200px]`}>
              <FilesViewer item={item} sid={user.sid} />
            </div>
            <div className={`absolute bottom-0 left-0 m-2 border-0 bg-gray-200/[.5] rounded-full ${mouseHover && supportView ? "visible" : "invisible"} sm:invisible`}>
              <Button
                onClick={() => handleViewer()}
                leftIcon={<ViewportWide />}
                variant="default"
                radius="xl"
                color="dark"
                styles={() => ({
                  root: {
                    '&:hover': {
                      borderColor: 'white',
                    },
                  }
                })}
              >
                View
              </Button>
            </div>
            <div className={`absolute bottom-0 right-0 m-2 border-0 bg-gray-200/[.5] rounded-full ${mouseHover ? "visible" : "invisible"} sm:invisible`}>
              <Button
                component="a"
                href={handleDownload()}
                target="_blank"
                leftIcon={<Download />}
                variant="default"
                radius="xl"
                color="dark"
                styles={() => ({
                  root: {
                    '&:hover': {
                      borderColor: 'white',
                    },
                  }
                })}
              >
                Download
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
            <FilesViewer item={item} sid={user.sid} />
          </Modal>
        </div>
      </Suspense>
    </Modal>
  )
}

export default RenderPreview;
