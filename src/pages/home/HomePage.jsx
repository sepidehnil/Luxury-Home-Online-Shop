import book1 from "../../assets/images/bookscase/billy-bookcase-white__1051924_pe845813_s5.jpg";
function HomePage() {
  return (
    <div>
      <section>
        <h1 className="text-3xl font-semibold font-secondary">سالن نشیمن</h1>
        <div className="flex p-4 w-[300px] justify-center bg-slate-400">
          <div className="w-[300px]">
            <img src={book1} />
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
