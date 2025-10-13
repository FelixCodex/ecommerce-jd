import { CircleCheck, CircleDashed, CircleX } from "lucide-react";
import { useRef, useState } from "react";

export function ProductInputRar({
  identifier,
  loadingFile,
  setLoadingFile,
  name,
  placeholder,
  required,
  file,
  setFile,
}: {
  identifier: string;
  loadingFile: boolean;
  setLoadingFile: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  placeholder: string;
  required: boolean;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile == null) return;
    if (loadingFile) return;
    setFile(selectedFile);

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.addEventListener("loadstart", () => {
      setLoadingFile(true);
      setSuccess(null);
      setProgress(0);
    });

    reader.addEventListener("progress", (e) => {
      const carga = Math.round((e.loaded / selectedFile.size) * 100);
      setProgress(carga);
      console.log(carga);
    });

    reader.addEventListener("loadend", () => {
      setLoadingFile(false);
      setSuccess(true);
    });
  };

  const handleClick = () => {
    inputFile.current?.click();
  };

  return (
    <div className="relative">
      <label
        htmlFor={identifier}
        className="absolute top-[-14px] left-3 px-1 bg-gray-50  text-lg"
      >
        {name}
      </label>
      <span
        className={`cursor-pointer flex items-center w-3xl h-16 text-2xl ${
          file ? "text-gray-800" : "text-gray-500"
        } ${
          loadingFile ? "rounded-t-md" : "rounded-md"
        } overflow-hidden bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 p-1.5`}
        onClick={handleClick}
      >
        {file ? (
          <>
            {loadingFile ? (
              <CircleDashed className="absolute right-3 w-9 h-9 loader"></CircleDashed>
            ) : (
              <>
                {success != null &&
                  (success ? (
                    <CircleCheck className="absolute right-3 w-9 h-9 text-green-400"></CircleCheck>
                  ) : (
                    <CircleX className="absolute right-3 w-9 h-9 text-red-400"></CircleX>
                  ))}
              </>
            )}
            <span className="overflow-ellipsis max-w-full overflow-hidden">
              {file.name}
            </span>
          </>
        ) : (
          placeholder
        )}
      </span>
      <input
        ref={inputFile}
        style={{ display: "none" }}
        type="file"
        required={required}
        name={identifier}
        id={identifier}
        accept=".rar"
        onProgress={() => console.log("progress")}
        onChange={handleFileChange}
        placeholder={placeholder}
        min={0}
      />
      <div
        className={`absolute ${
          loadingFile ? "flex" : "hidden"
        } top-[97%] w-full h-[5px] bg-gray-400 overflow-hidden rounded-b-md`}
      >
        <div
          className={`bg-blue-500 transition-[width]`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// const cargarArchivo = (ar: File) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(ar);
//   reader.addEventListener("load", () => {
//     const url = URL.createObjectURL(ar);
//     const img = document.createElement("IMG");
//     img.setAttribute("src", url);
//     document.querySelector(".res").appendChild(img);
//   });

//   const reader = new FileReader();
//   reader.readAsArrayBuffer(ar);

//   reader.addEventListener("progress", (e) => {
//     const carga = Math.round((e.loaded / ar.size) * 100);
//     zona.textContent = `${carga}%`;
//     document.querySelector(".barra-carga").style.padding = `75px 20px`;
//     document.querySelector(".barra-carga").style.width = `${carga / 3.8}%`;
//   });

//   reader.addEventListener("loadend", (e) => {
//     changeStyle(zona, "4f9");
//     document.querySelector(".barra-carga").style.background = "#4f9";
//     zona.style.color = "#fff";
//     zona.style.animation = "aparecer 1s forwards";
//     zona.textContent = "Carga Completa";
//   });

//   reader.addEventListener("load", (e) => {
//     const video = new Blob([new Uint8Array(e.currentTarget.result)], {
//       type: "video/mp4",
//     });
//     const url = URL.createObjectURL(video);
//     const img = document.createElement("VIDEO");
//     img.setAttribute("src", url);
//     document.querySelector(".res").appendChild(img);
//     img.play();
//   });
// };
