import { useContext, Suspense, useState, useEffect } from 'react';
import { Modal, Loader, Button, Divider, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ViewportWide, Download } from 'tabler-icons-react';

import { ModalPreviewContext } from "../context/modalReducer";

import { dateFormat } from "utils/date";

import { handleDownload, handleViewer } from '@helpers/handleMenuFunction';

import FilesViewer from '@helpers/FilesViewer';

const RenderPreview = () => {

  const { modalState, modalDispatch } = useContext(ModalPreviewContext);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [mouseHover, setMouseHover] = useState(false);
  const [imageViewer, setImageViewer] = useState(false);
  const [supportView, setSupportView] = useState(false);
  const matches = useMediaQuery('(max-width: 639px)');

  const image_suffix_supported = ["jpg", "png", "gif", "svg", "bmp", "ico"];

  const { item, user } = modalState;

  const handleCloseModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
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
      size={matches ? "100%" : "70%"}
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
    >
      <Suspense fallback={<Loader />}>
        <div className="grid border-2 p-10 grid-cols-6 gap-12 sm:grid-cols-1 sm:gap-2">
          <div
            onMouseOver={() => setMouseHover(true)}
            onMouseLeave={() => { setMouseHover(false) }}
            className="relative flex col-span-3 justify-center align-center items-center">
            <div className={`flex justify-center items-center h-[500px] sm:h-[200px]`}>
              <FilesViewer item={item} sid={user.sid} />
            </div>
            <div className={`absolute bottom-0 left-0 m-2 border-0 ${dark ? "bg-gray-500/[.7]" : "bg-gray-200/[.5]"} rounded-full ${mouseHover && supportView ? "visible" : "invisible"} sm:invisible`}>
              <Button
                onClick={() => handleViewer({
                  sid: user.sid, type: item.type, path: item.path, setImageViewer: setImageViewer
                })}
                leftIcon={<ViewportWide />}
                variant="default"
                radius="xl"
                color="dark"
                style={{ border: 'none' }}
              >
                View
              </Button>
            </div>
            <div className={`absolute bottom-0 right-0 m-2 border-0 ${dark ? "bg-gray-500/[.7]" : "bg-gray-200/[.5]"} rounded-full ${mouseHover ? "visible" : "invisible"} sm:invisible`}>
              <Button
                onClick={() => handleDownload({ sid: user.sid, path: item.path })}
                leftIcon={<Download />}
                variant="default"
                radius="xl"
                color="dark"
                style={{ border: 'none' }}
              >
                Download
              </Button>
            </div>
          </div>
          <Divider className="col-span-1 sm:hidden" orientation="vertical" />
          <div className="col-span-2 -ml-10 sm:ml-0">
            <div className="pb-5">
              <div className="font-bold text-2xl">{item.name}</div>
            </div>
            <div className="pb-3">
              <p className="font-bold text-l">File type: </p>
              <p>{item.type}</p>
            </div>
            <div className="pb-3">
              <p className="font-bold text-l">Created: </p>
              <p className="font-medium">{dateFormat(item.create_time.$date)}</p>
            </div>
            <div className="">
              <p className="font-bold text-l">Modified: </p>
              <p className="font-medium">{dateFormat(item.modifiled_time.$date)}</p>
            </div>
          </div>
        </div>
        <div className="absolute">
          <Modal
            opened={imageViewer}
            title={<p className="font-bold text-l">{item.name}</p>}
            onClose={() => setImageViewer(false)}
            centered
            size="70%"
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
