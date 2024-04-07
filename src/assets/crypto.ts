// source : ryan sims
// https://codepen.io/dulldrums/pen/RqVrRr

function hex(buffer: ArrayBuffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i);
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16);
    // We use concatenation and slice for padding
    var padding = "00000000";
    var paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}

export function handleFile(file: File) {
  return new Promise((resolve) => {
    // files will be an array of files, even if only one file is selected
    const reader = new FileReader();
    // start a new instance of FileReader

    // provide an onload callback for this instance of FileReader
    // this is called once reader.readAsArrayBuffer() is done
    reader.onload = async () => {
      const fileResult = reader.result;
      if (!fileResult || typeof fileResult == "string") return;

      let hash = await crypto.subtle.digest("SHA-256", fileResult);

      let sha256result = hex(hash);
      resolve(sha256result);

      // this should contain your sha-256 hash value
    };

    // calling reader.readAsArrayBuffer and providing a file should trigger the callback above
    // as soon as readAsArrayBuffer is complete
    reader.readAsArrayBuffer(file);
  });
}

// this function was taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Example
