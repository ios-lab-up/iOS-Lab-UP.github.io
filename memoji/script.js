window.addEventListener('DOMContentLoaded', (event) => {
    const imageSelector = document.getElementById('imageSelector');
    const colorOptions = document.querySelectorAll('.color-option');
    const downloadLink = document.getElementById('downloadLink');
    const previewImage = document.getElementById('previewImage');

    // Airtable API configuration
    const airtableAccessToken = 'patFDG5uPjcvnkGly.ca995164d73ec3e4a2252cde5070d2cd5d04dba3afaa3b28135b90d7983970c8'; // Reemplaza con tu token de acceso de Airtable
    const airtableBaseId = 'app9coyi6b3ku4kSZ'; // ID de tu base de Airtable
    const airtableTableId = 'tbld8PGoBCQ99W3VO'; // ID de tu tabla de Airtable

    function fetchAirtableData() {
        const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

        console.log('Fetching data from:', airtableUrl);

        axios.get(airtableUrl, {
            headers: {
                Authorization: `Bearer ${airtableAccessToken}`
            }
        })
        .then(response => {
            console.log('Data fetched successfully:', response.data);
            const records = response.data.records;
            populateImageSelector(records);
        })
        .catch(error => {
            if (error.response) {
                console.error('Error fetching data from Airtable:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            console.error('Error config:', error.config);
        });
    }

    function populateImageSelector(records) {
        records.forEach(record => {
            if (record.fields.Memoji && record.fields.Memoji.length > 0) {
                const option = document.createElement('option');
                option.value = record.fields.Memoji[0].url; // Asegúrate de que el campo de Airtable se llame "Memoji"
                option.textContent = record.fields.Name; // Asegúrate de que el campo de Airtable se llame "Name"
                imageSelector.appendChild(option);
            } else {
                console.warn(`Record ${record.id} is missing the Memoji field or it's empty.`);
            }
        });
    }

    function updatePreview() {
        const imageFileName = imageSelector.value;
        const color = getSelectedColor();

        if (imageFileName) {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Permite CORS
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

                try {
                    const dataURL = canvas.toDataURL('image/png');
                    const imageName = `memoji_${imageFileName.split('/').pop()}`;
                    downloadLink.href = dataURL;
                    downloadLink.download = imageName;
                    downloadLink.style.display = 'block';

                    previewImage.src = dataURL;
                    previewImage.style.display = 'block';
                } catch (e) {
                    console.error('SecurityError:', e);
                }
            };
        } else {
            previewImage.style.display = 'none';
            downloadLink.style.display = 'none';
        }
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

    // Fetch data from Airtable and populate the image selector
    fetchAirtableData();
});
