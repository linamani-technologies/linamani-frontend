import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { usePerson } from "./PersonContext";
import axios from "axios";

export function PDFForm() {
  const { personId: personId } = usePerson();
  const url = `http://0.0.0.0:8080/${personId}/i-140`;

  return (
    <div>
      {
        <iframe
          src={url}
          width="100%"
          height="1600px"
          title="PDF Viewer"
        ></iframe>
      }
    </div>
  );
}
