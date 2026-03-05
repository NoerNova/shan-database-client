import pdfIcon from "@assets/filetypes-pack/pdf.png";
import docIcon from "@assets/filetypes-pack/doc.png";
import xlsIcon from "@assets/filetypes-pack/xls.png";
import pptIcon from "@assets/filetypes-pack/ppt.png";
import txtIcon from "@assets/filetypes-pack/txt.png";
import musicIcon from "@assets/filetypes-pack/music.png";
import videoIcon from "@assets/filetypes-pack/video.png";
import zipIcon from "@assets/filetypes-pack/zip.png";
import aiIcon from "@assets/filetypes-pack/adobe-illustrator.png";
import psdIcon from "@assets/filetypes-pack/psd.png";
import svgIcon from "@assets/filetypes-pack/svg.png";
import fontIcon from "@assets/filetypes-pack/font-file.png";
import textIcon from "@assets/filetypes-pack/text.png";

const IMAGE_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "gif", "bmp", "ico", "cr2", "eps", "tif",
]);

export const isImageType = (type: string) =>
  IMAGE_EXTENSIONS.has(type.toLowerCase());

export const getFileTypeIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case "pdf": return pdfIcon;
    case "doc": case "docx": case "wps": case "odt": return docIcon;
    case "xls": case "xlsx": return xlsIcon;
    case "ppt": case "pptx": case "pmd": return pptIcon;
    case "txt": return txtIcon;
    case "mp3": case "wav": case "m4a": case "m4b": case "amr": case "aac": return musicIcon;
    case "mp4": case "mov": case "wmv": case "vob": case "bup": case "ifo": case "flv": case "3gp": return videoIcon;
    case "zip": case "rar": case "part": return zipIcon;
    case "ai": return aiIcon;
    case "psd": return psdIcon;
    case "svg": return svgIcon;
    case "ttf": case "woff": case "woff2": return fontIcon;
    default: return textIcon;
  }
};
