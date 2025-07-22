export const validationMessages = {
  en: {
    required: "This field is required",
    date: "Invalid date format (MM/DD/YYYY)",
    gender: "Sex must be Male or Female",
    maritalStatus: "Invalid marital status",
    yesNo: "Must be Yes or No",
    minLength: (field: string, len: number) =>
      `${field} must be at least ${len} characters`,
  },
  es: {
    required: "Este campo es obligatorio",
    date: "Formato de fecha inválido (MM/DD/AAAA)",
    gender: "Debe seleccionar masculino o femenino",
    maritalStatus: "Estado civil inválido",
    yesNo: "Debe responder Sí o No",
    minLength: (field: string, len: number) =>
      `${field} debe tener al menos ${len} caracteres`,
  },
  hi: {
    required: "यह फ़ील्ड आवश्यक है",
    date: "अमान्य दिनांक प्रारूप (MM/DD/YYYY)",
    gender: "लिंग पुरुष या महिला होना चाहिए",
    maritalStatus: "अमान्य वैवाहिक स्थिति",
    yesNo: "उत्तर हां या नहीं होना चाहिए",
    minLength: (field: string, len: number) =>
      `${field} कम से कम ${len} अक्षरों का होना चाहिए`,
  },
};
