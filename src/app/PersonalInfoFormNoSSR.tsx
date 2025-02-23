import dynamic from "next/dynamic";

const PersonalInfoForm = dynamic(() => import("./PersonalInfoForm"), {
  ssr: false,
});

export default PersonalInfoForm;