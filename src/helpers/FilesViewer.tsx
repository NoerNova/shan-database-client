import { useState, useRef } from 'react';

import { getImagePath, getImageThumbnail } from '@helpers/ImageThumbnail';
import { Image, Loader } from '@mantine/core'

import { indexPropsType } from '@components/SearchBox/searchIndex';
interface propsTypes {
  item: indexPropsType,
  sid: string,
}

const AudioViewer = () => {
  return (
    <div>AudioViewer</div>
  )
}

const ImageViewer = ({ item, sid }: { item: indexPropsType, sid: string }) => {
  return (
    <Image
      alt={item.name}
      radius="md"
      height={500}
      src={getImageThumbnail(item.type, item.path, sid, 640)}
      className={`flex justify-center items-center`}
      withPlaceholder
      placeholder={
        <Loader />
      }
    />
  )
}

const PDFViewer = ({ path, sid }: { path: string, sid: string }) => {
  const { image_path, image_name_path } = getImagePath(path);
  const url = `${import.meta.env.VITE_BASE_URL}/${image_name_path?.[0]}?sid=${sid}&func=get_viewer&source_path=${image_path?.[0]}&source_file=${image_name_path?.[0]}`

  return (
    <div>
      <object data=
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
        width="800"
        height="500">
      </object>
    </div>
  );
}

const VideoViewer = () => {
  return (
    <div>VideoViewer</div>
  )
}
const FilesIconViewer = () => {
  return (
    <div>FilesIconViewer</div>
  )
}

const FilesViewer = ({ item, sid }: propsTypes) => {
  switch (item.type) {
    case "mp3":
    case "wav":
      return <AudioViewer />;
    case "pdf":
      return <PDFViewer path={item.path} sid={sid} />;
    case "mp4":
    case "webm":
    case "ogg":
      return <VideoViewer />;
    case "jpeg":
    case "jpg":
    case "gif":
    case "png":
    case "svg":
    case "bmp":
    case "ico":
      return <ImageViewer item={item} sid={sid} />;
    default:
      return <FilesIconViewer />;

  }
}

export default FilesViewer;
