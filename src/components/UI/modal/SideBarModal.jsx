import closeBtn from "../../../assets/svg/closeBtn.svg";
import logo from "../../../assets/images/download.png";
import { useState } from "react";

function SideBarModal() {
  const [showSideBar, setSideBar] = useState(flase);
  return (
    <div className="w-[380px] py-[30px] px-[20px] bg-slate-200 h-screen fixed right-0 top-0 z-10 text-md font-secondary ">
      <div className="flex gap-11 items-center">
        <img src={closeBtn} />
        <img src={logo} className="w-[110px] h-[40px]" />
      </div>

      <div className="flex gap-11 mt-8">
        <div>
          <div className="text-transparent">hel</div>
        </div>
        <div className="flex flex-col gap-5">
          <div>محصولات</div>
          <div>سازماندهی خانه و آشپزخانه</div>
          <div>فضای باز</div>
          <div>نورپردازی</div>
          <div>دکور خانه</div>
          <div>اتاق ها</div>
          <div>نوزاد و بچه ها</div>
          <div>خانه هوشمند</div>
          <div>لباسشویی و نظافت</div>
          <div>فرش، حصیر و کفپوش</div>
          <div>گلدان و گیاه</div>
          <div>حیوانات</div>
          <div className="border-b-4 border-white"></div>
          <div>پنل مدیریت</div>
          <div>درباره من</div>
          <div>تماس با ما</div>
        </div>
      </div>
    </div>
  );
}
export default SideBarModal;
