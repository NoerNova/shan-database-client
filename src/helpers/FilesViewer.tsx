import { useState } from 'react';

interface propsTypes {
  type: string,
  path: string
}
const FilesViewer = ({ type, path }: propsTypes) => {

  const AudioViewer = () => { }
  const DocumentViewer = () => { }
  const ImageViewer = () => { }
  const PDFViewer = () => { }
  const VideoViewer = () => { }

  switch (type) {
    case "mp3":
    case "wav":
      return AudioViewer();
  }

}
