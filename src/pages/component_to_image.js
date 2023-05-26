import html2canvas from "html2canvas";

export const html2image = async (element) => {
  const canvas = await html2canvas(element, {
    allowTraint: true,
    useCORS: true,
  });
  const image = canvas.toDataURL("image/png", 1.0);
  return image
}

export const exportAsImage = async (el, imageFileName) => {
  console.log("IMAGE")
  console.log(image)
  downloadImage(image, imageFileName);
};

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};



