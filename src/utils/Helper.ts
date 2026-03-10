import RNFS from 'react-native-fs';

const CHUNK_SIZE = 64 * 1024;

async function sendFile(socket, file, onProgress) {

  let position = 0;
  const total = file.size;

  while (position < total) {

    const chunk = await RNFS.read(
      file.uri,
      CHUNK_SIZE,
      position,
      'base64'
    );

    socket.write(chunk);

    position += CHUNK_SIZE;

    onProgress(position / total);
  }

  socket.write('EOF');
}


 function receiveFile(socket, savePath, setReceiveProgress) {
   let totalSize = 0;
   let receivedBytes = 0;
   let metadataReceived = false;
  socket.on('data', async data => {
    const message = data.toString();

    // First message = metadata
    if (!metadataReceived) {
      const meta = JSON.parse(message);

      if (meta.type === "metadata") {
        totalSize = meta.size;
        metadataReceived = true;

        console.log("Receiving:", meta.name);
        return;
      }
    }
    if (data.toString() === 'EOF') {
      console.log('File transfer complete');
      return;
    }

    await RNFS.appendFile(
      savePath,
      data.toString(),
      'base64'
    );
    // Update received bytes
    const chunkBytes = Buffer.from(message, 'base64').length;
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