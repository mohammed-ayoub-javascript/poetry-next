import Submit from "./components/submit";

export default function Home() {
  return (
    <div className=" w-full h-[90%] flex justify-center items-center flex-col">
      <h1 className=" text-2xl font-extrabold">
        اداة تحسين الابيات الشعرية بالذكاء الاصطناعي
      </h1>
      <Submit />
    </div>
  );
}
