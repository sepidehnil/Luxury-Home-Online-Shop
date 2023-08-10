function shipping() {
  return (
    <form>
      <label for="fname">نام خوانوادگی:</label>
      <br />
      <input
        type="text"
        id="fname"
        name="fname"
        className="border-2 border-rose-600 "
      />
      <label for="fname">ایمیل:</label>
      <br />
      <input
        type="email"
        id="femail"
        name="femail"
        className="border-2 border-rose-600 "
      />
      <label for="date">تاریخ تحویل:</label>
      <br />
      <input
        type="date"
        id="date"
        name="date"
        className="border-2 border-rose-600 "
      />
    </form>
  );
}
export default shipping;
