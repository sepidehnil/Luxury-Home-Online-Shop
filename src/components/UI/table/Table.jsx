function Table(props) {
  return (
    <div className="w-screen m-8 rounded-lg">
      <div className="bg-white py-6 px-5 rounded-lg flex gap-10">
        {props.children}
      </div>
    </div>
  );
}
export default Table;
