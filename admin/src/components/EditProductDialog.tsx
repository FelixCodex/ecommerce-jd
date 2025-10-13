import { FormEvent, useEffect, useState } from "react";
import { CircleDashed } from "lucide-react";
import { editRequest } from "../api/products";
import { ProductInfo } from "../types";
import { toast } from "sonner";

export function EditProductDialog({
  isOpen,
  productInfo,
  setIsOpen,
  updateProduct,
}: {
  isOpen: boolean;
  productInfo: ProductInfo;
  setIsOpen: (bool: boolean) => void;
  updateProduct: ({
    id,
    title,
    description,
    personal,
    professional,
    driveId,
    weight,
  }: ProductInfo) => void;
}) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [personal, setPersonal] = useState(0);
  const [professional, setProfessional] = useState(0);
  const [driveId, setDriveId] = useState("");
  const [weight, setWeight] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loadingSubmit) {
      setLoadingSubmit(true);
      const toastId = toast.loading("Producto enviado a editar");
      try {
        const res = await editRequest({
          id,
          title,
          description,
          personal,
          professional,
          driveId,
          weight,
        });
        console.log(res);

        if (res.status == 200) {
          updateProduct({
            id,
            title,
            description,
            personal,
            professional,
            driveId,
            weight,
          });
          setIsOpen(false);
          toast.success("Producto guardado", { id: toastId });
        } else {
          toast.error("Ocurrio un error", { id: toastId });
        }
      } catch (error) {
        console.log(error);
        toast.error("Ocurrio un error", { id: toastId });
      } finally {
        setLoadingSubmit(false);
      }
    }
  };

  useEffect(() => {
    setId(productInfo.id);
    setTitle(productInfo.title);
    setDescription(productInfo.description);
    setPersonal(productInfo.personal);
    setProfessional(productInfo.professional);
    setDriveId(productInfo.driveId ? productInfo.driveId : "");
    setWeight(productInfo.weight ? productInfo.weight : 0);
  }, [productInfo]);

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 bg-[#0202025d]`}
      onMouseDown={() => setIsOpen(false)}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="bg-white w-lg h-fit rounded-lg shadow flex flex-col p-4 "
          onMouseDown={(e) => e.stopPropagation()}
        >
          <form
            className="flex flex-col items-start w-full"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" className="text-md text-gray-500 ">
              Title
            </label>
            <input
              id="title"
              title="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
            />

            <label htmlFor="description" className="text-md text-gray-500 ">
              Description
            </label>
            <input
              id="description"
              title="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
            />

            <label htmlFor="personal" className="text-md text-gray-500 ">
              {`Personal (€)`}
            </label>
            <input
              id="price"
              title="price"
              type="number"
              value={personal}
              onChange={(e) => setPersonal(Number(e.target.value))}
              required
              className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
            />

            <label htmlFor="professional" className="text-md text-gray-500 ">
              {`Professional (€)`}
            </label>
            <input
              id="price"
              title="price"
              type="number"
              value={professional}
              onChange={(e) => setProfessional(Number(e.target.value))}
              required
              className={`mb-5 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
            />

            <label htmlFor="driveUrl" className="text-md text-gray-500 ">
              Drive Url
            </label>
            <input
              id="driveUrl"
              title="driveUrl"
              type="text"
              value={driveId}
              onChange={(e) => setDriveId(e.target.value)}
              required
              className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
              placeholder="Link del archivo"
            />

            <label htmlFor="weight" className="text-md text-gray-500 ">
              {`Weight (en MB)`}
            </label>
            <input
              id="weight"
              title="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
              className={`mb-5 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
            />

            <button
              type="submit"
              disabled={loadingSubmit}
              className={`group h-12 relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loadingSubmit ? (
                <CircleDashed className="h-5 w-5 loader"></CircleDashed>
              ) : (
                <span>Editar Producto</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
