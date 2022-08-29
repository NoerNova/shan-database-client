import { forEach } from "lodash";
import { suffix } from "@components/SearchBox/suffix";

const getThumbnailFromType = (type: string) => {
  let typeInclude = "";
  let icon = "src/assets/filetypes-pack";
  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

  forEach(suffix, (s) => {
    if (s.includes(type)) {
      typeInclude = Object.keys(suffix)[Object.values(suffix).indexOf(s)];
    }
  });

  switch (typeInclude) {
    case "Compress":
      return `${icon}/zip.png`;
    case "Audios":
      return `${icon}/music.png`;
    case "Documents":
      return `${icon}/text.png`;
    case "Fonts":
      return `${icon}/font-file.png`;
    case "Images":
      return `${icon}/image.png`;
    case "Videos":
      return `${icon}/video.png`;
    default:
      return defaultImageLogo;
  }
};

const getDefaultThumbnail = (type: string) => {
  let icon = "src/assets/filetypes-pack";

  switch (type) {
    case "doc":
    case "docx":
      return `${icon}/doc.png`;
    case "txt":
      return `${icon}/txt.png`;
    case "xls":
    case "xlsx":
      return `${icon}/xls.png`;
    case "psd":
      return `${icon}/psd.png`;
    case "ai":
      return `${icon}/adobe-illustrator.png`;
    case "pdf":
      return `${icon}/pdf.png`;
    case "ppt":
      return `${icon}/ppt.png`;
    case "svg":
      return `${icon}/svg.png`;
    default:
      return getThumbnailFromType(type);
  }
};

export const getImagePath = (path: string) => {
  const image_path = path.match("^(.*(?=[\\/]))");
  const image_name_path = path.match("([^/]+[^\n.]+)$");

  return { image_path, image_name_path };
};

const getThumbnailFromPath = (path: string, sid: string, size?: number) => {
  const thumbURL = import.meta.env.VITE_IMAGE_THUMBNAIL_URL;

  const { image_path, image_name_path } = getImagePath(path);

  const image_thumbnail_url = `${thumbURL}&sid=${sid}&path=${image_path![1]
    }&name=${image_name_path![1]}&size=${size}`;

  return image_thumbnail_url;
};

export const getImageThumbnail = (type: string, path: string, sid: string, size?: number) => {
  switch (type.toLowerCase()) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return getThumbnailFromPath(path, sid, size);
    default:
      return getDefaultThumbnail(type);
  }
};
