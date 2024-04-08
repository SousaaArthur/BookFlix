const pdfUrl = './books/Harry-Potter-e-a-pedra-filosofal.pdf';
const pdfContainer = document.getElementById('pdf-container');

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: .9 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            page.render({
                canvasContext: context,
                viewport: viewport
            }).promise.then(() => {
                pdfContainer.appendChild(canvas);
            });
        });
    }
});