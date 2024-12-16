import TableFooter from "../TableFooter";
import TableNavigation from "../TableNavigation";

export default function DataTable({
  headers,
  selectable = false,
  pageSize,
  page,
  data,
  handlers,
  classHandlers,
  totalSize,
  onPrev,
  onNext,
}) {
  function generateClasses(index) {
    const classes = [];
    const conditionalClasses = classHandlers[index];
    if (conditionalClasses != null)
      conditionalClasses.map((c) => classes.push(c));

    return classes.join(" ");
  }

  return (
    <>
      <table className="data">
        <thead>
          <tr>
            {selectable && <th></th>}
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {selectable && (
                <td>
                  <label htmlFor={`product-${item.id}`}>
                    <input type="checkbox" id={`product-${item.id}`} />
                  </label>
                </td>
              )}
              {handlers.map((handler, index) =>
                Object.keys(handler).map((h) => {
                  const fn = handler[h];
                  return (
                    <td key={h} className={generateClasses(index)}>
                      {fn(item.id, item[h])}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
        <TableFooter filteredLength={data.length} totalLength={totalSize} />
      </table>

      <TableNavigation
        onPrev={onPrev}
        onNext={onNext}
        total={totalSize}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
}
