import closeBtn from "../../../assets/svg/closeBtn.svg";
import logo from "../../../assets/images/download.png";

function SideBarModal(props) {
  return (
    <div className="backdrop-blur-md fixed z-10 bg-white/10 w-full h-full">
      <div className="w-[380px] py-[30px] px-[20px] bg-slate-200 h-screen right-0 top-0 text-md font-secondary">
        <div className="flex gap-11 items-center">
          <img src={closeBtn} onClick={props.onClose} />
          <img src={logo} className="w-[110px] h-[40px]" />
        </div>

        <div className="flex gap-11 mt-8">
          <div>
            <div className="text-transparent">hel</div>
          </div>
          <div className="flex flex-col gap-5">
            <div>اتاق خواب</div>
            <div>سالن نشیمن</div>
            <div>آشپزخانه</div>
            <div>سرویس بهداشتی</div>
            <div className="border-b-4 border-white"></div>
            <div>پنل مدیریت</div>
            <div>درباره من</div>
            <div>تماس با ما</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBarModal;
