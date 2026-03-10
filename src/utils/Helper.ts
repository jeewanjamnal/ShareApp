import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

const CHUNK_SIZE = 64 * 1024;

export async function sendFile(socket, file, onProgress) {

  const path = file.uri.replace('file://', '');

  const base64Data = await RNFS.readFile(path, 'base64');

  const totalLength = base64Data.length;
  let offset = 0;

  while (offset < totalLength) {

    const chunk = base64Data.slice(offset, offset + CHUNK_SIZE);

    socket.write(chunk);

    offset += CHUNK_SIZE;

    if (onProgress) {
      onProgress(offset / totalLength);
    }

    await new Promise(r => setTimeout(r, 0));
  }

  socket.write('EOF');
}

const getSavePath = (fileName) => {
  if (Platform.OS === 'android') {
    return `${RNFS.DownloadDirectoryPath}/${fileName}`;
  } else {
    return `${RNFS.DocumentDirectoryPath}/${fileName}`;
  }
};

function receiveFile(socket, setReceiveProgress) {

  let totalSize = 0;
  let receivedBytes = 0;
  let metadataReceived = false;
  let savePath="";

  socket.on('data', async (data) => {

    const message = data.toString();

    // 1️⃣ Handle metadata
    if (!metadataReceived) {
      try {
        const meta = JSON.parse(message);

        if (meta.type === "metadata") {

          metadataReceived = true;
          totalSize = meta.size;

           savePath = getSavePath(meta.name)
          // Create empty file
          await RNFS.writeFile(savePath, '', 'base64');

          return;
        }
      } catch (e) {
        console.log("Metadata parse failed");
      }
    }

    // 2️⃣ Handle EOF
    if (message === 'EOF') {
      console.log('File transfer complete');
      return;
    }

    // 3️⃣ Append chunk
    await RNFS.appendFile(savePath, message, 'base64');

    console.log("Saved file path>>>>>>>>>", savePath);

    // 4️⃣ Update progress
    const chunkBytes = (message.length * 3) / 4;
    receivedBytes += chunkBytes;

    const progress = receivedBytes / totalSize;

    if (setReceiveProgress) {
      setReceiveProgress(progress);
    }

  });
}

export {
  sendFile,
  receiveFile
}