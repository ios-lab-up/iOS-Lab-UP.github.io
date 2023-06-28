window.addEventListener('DOMContentLoaded', (event) => {
    const imageSelector = document.getElementById('imageSelector');
    const colorOptions = document.querySelectorAll('.color-option');
    const downloadLink = document.getElementById('downloadLink');
    const previewImage = document.getElementById('previewImage');
  
    function updatePreview() {
      const imageFileName = imageSelector.value;
      const color = getSelectedColor();
  
      const img = new Image();
      img.src = imageFileName;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const scaleFactor = 1.3; // Ajusta el factor de escala según tus necesidades
  
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
  
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        const x = (canvas.width - img.width) / 2;
        const y = (canvas.height - img.height) / 2;
  
        ctx.drawImage(img, x, y, img.width, img.height);
  
        const dataURL = canvas.toDataURL('image/png');
        const imageName = `memoji_${imageFileName}`;
        downloadLink.href = dataURL;
        downloadLink.download = imageName;
        downloadLink.style.display = 'block';
  
        previewImage.src = dataURL;
        previewImage.style.display = 'block';
      };
    }
  
    function getSelectedColor() {
      for (const colorOption of colorOptions) {
        if (colorOption.classList.contains('selected')) {
          return colorOption.dataset.color;
        }
      }
      return '';
    }
  
    function selectColor() {
      for (const colorOption of colorOptions) {
        colorOption.addEventListener('click', () => {
          for (const option of colorOptions) {
            option.classList.remove('selected');
          }
          colorOption.classList.add('selected');
          updatePreview();
        });
      }
    }
  
    imageSelector.addEventListener('change', updatePreview);
    selectColor();
  
    // Mostrar la vista previa con los valores iniciales
    updatePreview();
  });
  