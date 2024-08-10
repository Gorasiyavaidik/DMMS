import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD MMM YYYY");
}


const BTableTwo = ({ data }) => {

  return ( data &&
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="min-w-[440px] py-4 pr-4 pl-0 text-xl font-medium text-black dark:text-white xl:pl-11">Rough Diamond</div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                SerialNo
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Weight
              </th>
             
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,i) => (
              <tr key={i}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.serialNo}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.weight}</p>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{formatDate(item.payment_date)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BTableTwo;
