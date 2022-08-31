import { getImagePath, getImageThumbnail } from '@helpers/ImageThumbnail';
import { Image, Loader } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { indexPropsType } from '@components/SearchBox/searchIndex';
interface propsTypes {
  item: indexPropsType,
  sid: string,
}

const AudioViewer = ({ url }: { url: string }) => {
  return (
    <audio controls>
      <source src={url} />
      File Not Support.
    </audio>
  )
}

const ImageViewer = ({ item, sid }: { item: indexPropsType, sid: string }) => {
  const mobile = useMediaQuery('(max-width: 639px)');

  return (
    <Image
      alt={item.name}
      radius="md"
      height={mobile ? 200 : 500}
      src={getImageThumbnail(item.type, item.path, sid, 640)}
      className={`flex justify-center items-center h-[500px] sm:h-[200px]`}
      withPlaceholder
      placeholder={
        <Loader />
      }
    />
  )
}

const VideoViewer = ({ url }: { url: string }) => {
  return (
    <video controls>
      <source src={url} />
      File Not Support.
    </video>
  )
}
const FilesIconViewer = ({ item, sid }: { item: indexPropsType, sid: string }) => {

  return (
    <Image
      alt={item.name}
      radius="md"
      height={200}
      src={getImageThumbnail(item.type, item.path, sid, 640)}
      className={`flex justify-center items-center`}
      withPlaceholder
      placeholder={
        <Loader />
      }
    />
  )
}

const FilesViewer = ({ item, sid }: propsTypes) => {
  const { image_path, image_name_path } = getImagePath(item.path);
  const url = `${import.meta.env.VITE_BASE_URL}/${image_name_path?.[0]}?sid=${sid}&func=get_viewer&source_path=${image_path?.[0]}&source_file=${image_name_path?.[0]}`

  switch (item.type) {
    case "mp3":
    case "wav":
    case "amr":
      return <AudioViewer url={url} />;
    case "mp4":
    case "webm":
    case "ogg":
      return <VideoViewer url={url} />;
    case "jpeg":
    case "jpg":
    case "gif":
    case "png":
    case "svg":
    case "bmp":
    case "ico":
      return <ImageViewer item={item} sid={sid} />;
    default:
      return <FilesIconViewer item={item} sid={sid} />;

  }
}

export default FilesViewer;
