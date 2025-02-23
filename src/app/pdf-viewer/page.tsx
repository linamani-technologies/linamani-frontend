"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PDFViewer() {
  const searchParams = useSearchParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = searchParams.get("pdfUrl");
    if (url) {
      setPdfUrl(decodeURIComponent(url));
    }
  }, [searchParams]);

  if (!pdfUrl) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div className="h-screen w-full">
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        className="h-full w-full"
        title="PDF Viewer"
      />
    </div>
  );
}
