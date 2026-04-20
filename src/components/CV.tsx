import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./CV.css";

const PDF_PATH = "/CV_FINAL.pdf";

GlobalWorkerOptions.workerSrc = pdfWorker;

function CV() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadPdf = async () => {
      setLoading(true);
      setError(null);

      try {
        const doc = await getDocument(PDF_PATH).promise;
        if (!mounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setPageNumber(1);
      } catch {
        if (!mounted) return;
        setError("No se ha podido cargar el CV.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPdf();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.3 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise;
    };

    renderPage().catch(() => setError("No se ha podido renderizar el CV."));
  }, [pdfDoc, pageNumber]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PDF_PATH;
    link.download = "CV_FINAL.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cv-viewer">
      <div className="cv-toolbar">
        <button type="button" className="retro-button" onClick={handleDownload}>
          Descargar CV
        </button>
        <button
          type="button"
          className="retro-button"
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber <= 1 || loading || !!error}
        >
          Anterior
        </button>
        <span className="cv-page-indicator">
          {numPages > 0 ? `Pagina ${pageNumber} de ${numPages}` : "Cargando..."}
        </span>
        <button
          type="button"
          className="retro-button"
          onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          disabled={pageNumber >= numPages || loading || !!error}
        >
          Siguiente
        </button>
      </div>

      <div className="cv-canvas-wrapper">
        {loading && <p>Cargando CV...</p>}
        {error && <p>{error}</p>}
        <canvas ref={canvasRef} className={loading || error ? "hidden-canvas" : ""} />
      </div>
    </div>
  );
}

export default CV;
