import { getImagePath } from "@helpers/ImageThumbnail";

interface menuTypes {
  sid: string;
  type?: string;
  path: string;
  setImageViewer?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleDownload = ({ sid, path }: menuTypes) => {
  const { image_path, image_name_path } = getImagePath(path);

  const downloadURL = `${
    import.meta.env.VITE_DOWNLOAD_URL
  }&sid=${sid}&source_path=${image_path?.[0]}&source_file=${
    image_name_path?.[0]
  }&source_total=1`;

  return window.open(downloadURL, "_blank");
};

export const handleViewer = ({
  sid,
  type,
  path,
  setImageViewer,
}: menuTypes) => {
  const { image_path, image_name_path } = getImagePath(path);

  const image_suffix_supported = ["jpg", "png", "gif", "svg", "bmp", "ico"];

  let viewerURL = `${import.meta.env.VITE_BASE_URL}/${
    image_name_path?.[0]
  }?sid=${sid}&func=get_viewer&source_path=${image_path?.[0]}&source_file=${
    image_name_path?.[0]
  }`;

  if (type === "pdf") {
    window.open(viewerURL, "_blank");
  } else if (image_suffix_supported.includes(type!)) {
    setImageViewer && setImageViewer(true);
  }
};
