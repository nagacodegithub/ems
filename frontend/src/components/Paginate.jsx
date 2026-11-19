export default function Paginate({
  currentPage,
  totalPage,
  limit,
  getPaginatedData,
  prevPage,
  nextPage,
}) {
  function getPageNumbers(currentPage, totalPage) {
    const delta = 2;
    let ranges = [];
    let rangeDots = [];
    let prevPage;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i == 1 ||
        i == totalPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        ranges.push(i);
      }
    }
    ranges.forEach((page) => {
      if (page - prevPage == 1) {
        rangeDots.push(page);
      } else if (page - prevPage > 1) {
        rangeDots.push("...");
        rangeDots.push(page);
      } else {
        rangeDots.push(page);
      }
      prevPage = page;
    });
    return rangeDots;
  }
  return (
    <>
      {totalPage && (
        <div className="paginate">
          <nav className="page-items">
            <ul className="flex page-links cursor-pointer">
              {currentPage > 1 ? (
                <li
                  onClick={() => prevPage(currentPage, limit)}
                  className="flex items-center text-blue-500 px-4 py-2 rounded-l-md bg-white border border-r-0 border-blue-500"
                >
                  prev
                </li>
              ) : (
                <li className="flex items-center text-gray-500 px-4 py-2 rounded-l-md bg-gray-200 border border-r-0 border-gray-300">
                  prev
                </li>
              )}
              {getPageNumbers(currentPage, totalPage).map((page) => {
                const activeCls =
                  currentPage == page ? "bg-blue-500 text-white" : "bg-white";
                return (
                  <li
                    key={page}
                    onClick={() => getPaginatedData(page, limit)}
                    className={
                      "flex items-center  px-4 py-2 border border-r-0 border-blue-500 " +
                      activeCls
                    }
                  >
                    {page}
                  </li>
                );
              })}
              {currentPage < totalPage ? (
                <li
                  onClick={() => nextPage(currentPage, totalPage, limit)}
                  className="flex items-center text-blue-500 px-4 py-2 rounded-r-md border  bg-white"
                >
                  Next
                </li>
              ) : (
                <li
                  className="flex items-center  text-gray-500 px-4 py-2 rounded-r-md bg-gray-200 border 
                border-gray-300"
                >
                  Next
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}