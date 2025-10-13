export function MiniBadge({ text, stext }: { text: string; stext: string }) {
  return (
    <div className="flex flex-row justify-between items-center p-2 gap-4 border-2 border-gray-300 rounded-lg">
      <p
        className="text-md font-[600] text-blue-500"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        font-family="Helvetica, Arial, sans-serif"
      >
        {text}
      </p>
      <p
        className="text-md font-[600] text-blue-500"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        font-family="Helvetica, Arial, sans-serif"
      >
        {stext}
      </p>
    </div>
  );
}
