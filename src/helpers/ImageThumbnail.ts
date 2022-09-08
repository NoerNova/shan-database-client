import { forEach } from "lodash";
import { suffix } from "@components/SearchBox/suffix";

import zip from "@assets/filetypes-pack/zip.png";
import music from "@assets/filetypes-pack/music.png";
import text from "@assets/filetypes-pack/text.png";
import fontFile from "@assets/filetypes-pack/font-file.png";
import image from "@assets/filetypes-pack/image.png";
import video from "@assets/filetypes-pack/video.png";

import doc from "@assets/filetypes-pack/doc.png";
import txt from "@assets/filetypes-pack/txt.png";
import xls from "@assets/filetypes-pack/xls.png";
import psd from "@assets/filetypes-pack/psd.png";
import ai from "@assets/filetypes-pack/adobe-illustrator.png";
import pdf from "@assets/filetypes-pack/pdf.png";
import ppt from "@assets/filetypes-pack/ppt.png";
import svg from "@assets/filetypes-pack/svg.png";

const getThumbnailFromType = (type: string) => {
  let typeInclude = "";
  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

  forEach(suffix, (s) => {
    if (s.includes(type)) {
      typeInclude = Object.keys(suffix)[Object.values(suffix).indexOf(s)];
    }
  });

  switch (typeInclude) {
    case "Compress":
      return zip;
    case "Audios":
      return music;
    case "Documents":
      return text;
    case "Fonts":
      return fontFile;
    case "Images":
      return image;
    case "Videos":
      return video;
    default:
      return defaultImageLogo;
  }
};

const getDefaultThumbnail = (type: string) => {

  switch (type) {
    case "doc":
    case "docx":
      return doc;
    case "txt":
      return txt;
    case "xls":
    case "xlsx":
      return xls;
    case "psd":
      return psd;
    case "ai":
      return ai;
    case "pdf":
      return pdf;
    case "ppt":
      return ppt;
    case "svg":
      return svg;
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
