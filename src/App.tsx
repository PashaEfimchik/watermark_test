import './App.css'

function App () {
    const baseImage = document.getElementById("baseImage") as HTMLImageElement;
    const overlayImage = document.getElementById("overlayImage") as HTMLImageElement;
    const scaleInput = document.getElementById("scale") as HTMLInputElement;
    const opacityInput = document.getElementById("opacity") as HTMLInputElement;
    const xInput = document.getElementById("x") as HTMLInputElement;
    const yInput = document.getElementById("y") as HTMLInputElement;
    const downloadButton = document.getElementById("download__button") as HTMLButtonElement;
    const baseImageUpload = document.getElementById("baseImage__upload")as HTMLInputElement;
    const overlayImageUpload = document.getElementById("overlayImage__upload") as HTMLInputElement;

    const imagePreviewContainer = document.querySelector(".imagePreview__container");
    const result_container = document.getElementById('result__container') as HTMLDivElement;

    baseImageUpload.addEventListener("change", function (e) {
      const file = (e.target as HTMLInputElement).files![0];
      if (file) {
        baseImage.src = URL.createObjectURL(file);

        if (result_container.firstChild) {
          result_container.firstChild.remove();
          imagePreviewContainer?.firstChild?.remove();
        }
        const imgCopy = document.createElement('img');
        imgCopy.src = '';
        imgCopy.src = baseImage.src; 
        imgCopy.id = 'img_copy';
        result_container.appendChild(imgCopy);

        if (baseImage) {
          const baseImgCopy = new Image();
          baseImgCopy.src = baseImage.src;
          imagePreviewContainer?.insertBefore(baseImgCopy, imagePreviewContainer.firstChild);
        }
      }
    });

    overlayImageUpload.addEventListener("change", function (e) {
      const file = (e.target as HTMLInputElement).files![0];

      if (file) {
        overlayImage.src = URL.createObjectURL(file);
       
        const watermark_copy = document.getElementById('watermark_copy') as HTMLImageElement;
        if (watermark_copy) {
          watermark_copy.remove();
          imagePreviewContainer?.lastChild?.remove();
        }

        const imgCopy = document.createElement('img');
        imgCopy.src = overlayImage.src;
        imgCopy.id = 'watermark_copy';
        result_container.appendChild(imgCopy);

        if (imgCopy) {
          const overlayImgCopy = new Image();
          overlayImgCopy.src = imgCopy.src;
          imagePreviewContainer?.appendChild(overlayImgCopy);
        }

      }

    });

    function updateOverlayStyles() {
        const scale = parseFloat(scaleInput.value);
        const opacity = opacityInput.value;
        const x = parseFloat(xInput.value) + "px";
        const y = parseFloat(yInput.value) + "px";
        
        const overlayImageCopy = document.getElementById("watermark_copy") as HTMLImageElement;

        if (overlayImageCopy)
        { 
          overlayImageCopy.style.transform = `scale(${scale})`;
          overlayImageCopy.style.opacity = opacity;
          overlayImageCopy.style.left = x;
          overlayImageCopy.style.top = y;
        }
    }
    
    scaleInput.addEventListener("input", updateOverlayStyles);
    opacityInput.addEventListener("input", updateOverlayStyles);
    xInput.addEventListener("input", updateOverlayStyles);
    yInput.addEventListener("input", updateOverlayStyles);

    downloadButton.addEventListener("click", function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.width = baseImage.width;
        canvas.height = baseImage.height;

        ctx.drawImage(baseImage, 0, 0);

        const scale = parseFloat(scaleInput.value);
        const opacity = parseFloat(opacityInput.value);
        const x = parseFloat(xInput.value);
        const y = parseFloat(yInput.value);

        ctx.globalAlpha = opacity;
        ctx.drawImage(
            overlayImage,
            x - overlayImage.width * scale / 2 + overlayImage.width / 2,
            y - overlayImage.height * scale / 2 + overlayImage.height / 2,
            overlayImage.width * scale,
            overlayImage.height * scale
        );

        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = "result.png";

        downloadLink.click();
    });
  
  return (
    <>
    </>
  )
}

export default App