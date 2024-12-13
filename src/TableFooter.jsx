export default function TableFooter({ filteredLength, totalLength }) {
  return (
    <caption>
      Showing {filteredLength} out of {totalLength} items
    </caption>
  );
}
