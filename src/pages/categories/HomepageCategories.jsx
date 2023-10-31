function HomepageCategories() {
  return (
    <section className="bg-[#212429] h-screen my-9 relative font-secondary rounded-xl p-10">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-6 text-3xl text-white">
          <div className="bg-white rounded-full w-[140px] h-[140px] flex justify-center items-center">
            <img
              src="https://w7.pngwing.com/pngs/707/429/png-transparent-kitchen-cabinet-kitchenware-cartoon-kitchen-miscellaneous-kitchen-furniture-thumbnail.png "
              className="p-2 w-[120px]"
            />
          </div>
          <h1>آشپزخانه</h1>
        </div>

        <div className="flex items-center gap-6 text-3xl text-white">
          <div className="bg-white rounded-full w-[140px] h-[140px] flex justify-center items-center">
            <img
              src="https://t3.ftcdn.net/jpg/02/00/05/44/360_F_200054498_vYSxX3FCFtQqTZmLerVk7SF9KJSlkgEV.jpg"
              className="p-2 w-[125px]"
            />
          </div>
          <h1>سالن نشیمن</h1>
        </div>

        <div className="flex items-center gap-6 text-3xl text-white">
          <div className="bg-white rounded-full w-[140px] h-[140px] flex justify-center items-center">
            <img
              src="https://t3.ftcdn.net/jpg/01/30/99/06/360_F_130990691_zBt04IcjNvpIkprIPnlANvFcIFUx0Hcq.jpg"
              className="p-2 w-[125px]"
            />
          </div>
          <h1>اتاق خواب</h1>
        </div>

        <div className="flex items-center gap-6 text-3xl text-white">
          <div className="bg-white rounded-full w-[140px] h-[140px] flex justify-center items-center">
            <img
              src="https://us.123rf.com/450wm/jongcreative/jongcreative2006/jongcreative200600933/148712325-classic-bathroom-interior-clean-room-wooden-accent-furniture-flat-design.jpg?ver=6"
              className="p-2 w-[130px]"
            />
          </div>
          <h1>سرویس بهداشتی</h1>
        </div>
      </div>
      <div className="w-[300px] bg-white ">
        <img src="https://www.ikea.com/ext/ingkadam/m/709fbabfcf73898d/original/PH181260-crop001.jpg?f=xxl" />
      </div>
    </section>
  );
}
export default HomepageCategories;
