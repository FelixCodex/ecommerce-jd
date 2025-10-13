import { useState } from "react";
import { useBeneficiary } from "../hooks/useBeneficiary";
import { Beneficiary } from "../types";
import {
  deleteBeneficiaryRequest,
  payBeneficiaryRequest,
} from "../api/beneficiary";
import { CircleDashed, Trash2 } from "lucide-react";
import { RadialChart } from "./ApexCharts/RadialChart";
import { createDateTextFromLanguage } from "../utils";
import { MiniBadge } from "./MiniBadge";

export function BeneficiaryCard({ beneficiary }: { beneficiary: Beneficiary }) {
  const date = new Date(beneficiary.created_at + " UTC");
  const maxPaidPercent =
    Math.floor((beneficiary.paid / beneficiary.max) * 10000) / 100;
  const { removeBeneficiary, payBeneficiary } = useBeneficiary();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const handleDelete = async () => {
    const answer = confirm("Are you sure you want to delete that beneficiary?");
    if (!answer) return;
    setLoadingDelete(true);
    try {
      const res = await deleteBeneficiaryRequest({ id: beneficiary.id });
      if (res.status == 200) {
        removeBeneficiary(beneficiary.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handlePay = async () => {
    if (beneficiary.accumulation == 0) return;
    setLoadingPay(true);
    try {
      const res = await payBeneficiaryRequest({ id: beneficiary.id });
      if (res.status == 200) {
        payBeneficiary(beneficiary.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPay(false);
    }
  };

  return (
    <div className="w-full flex flex-col p-2 bg-white dark:bg-gray-80 border-2 shadow-md hover:shadow-lg hover:scale-[101%] transition-[scale,box-shadow] border-gray-400 dark:border-gray-5 gap-1 rounded-lg">
      <div className="flex">
        <div className="w-full mx-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-start">
            <p className="w-full text-lg md:text-5xl flex items-start dark:text-gray-5">
              <span className="font-medium ">{beneficiary.name}</span>
            </p>
            <button
              type="submit"
              className="px-4 py-2 mb-4 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handlePay}
              disabled={loadingPay}
            >
              {loadingPay ? (
                <CircleDashed className="loader text-white"></CircleDashed>
              ) : (
                <span>Pagar ${beneficiary.accumulation}</span>
              )}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-3">
              <button
                className="hover:bg-red-100 p-1 rounded-full"
                onClick={handleDelete}
                disabled={loadingDelete}
              >
                {loadingDelete ? (
                  <CircleDashed className="loader text-red-400"></CircleDashed>
                ) : (
                  <Trash2 className="text-red-400"></Trash2>
                )}
              </button>

              <p className="text-lg md:text-2xl flex justify-end  dark:text-gray-5">
                Desde el {createDateTextFromLanguage("es", date)}
              </p>
            </div>
            <div className="flex flex-row justify-end">
              <RadialChart
                label="Premax"
                percent={beneficiary.ratingBeforeMax}
                height={150}
              ></RadialChart>
              <RadialChart
                label="Posmax"
                percent={beneficiary.ratingAfterMax}
                height={150}
              ></RadialChart>
              <RadialChart
                label="Max. pagado"
                percent={maxPaidPercent}
                height={150}
              ></RadialChart>
              <div className="flex flex-col justify-evenly ml-2">
                <MiniBadge
                  text="Total Pagado"
                  stext={`$${beneficiary.paid}`}
                ></MiniBadge>
                <MiniBadge
                  text="Máximo"
                  stext={`$${beneficiary.max}`}
                ></MiniBadge>
                <MiniBadge
                  text="Acumulado"
                  stext={`$${beneficiary.accumulation}`}
                ></MiniBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
