import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableNavigation({
  onPrev,
  onNext,
  currentPage,
  total,
  pageSize,
}) {
  const startItem = currentPage * pageSize;
  const endItem =
    (currentPage + 1) * pageSize >= total
      ? total
      : (currentPage + 1) * pageSize;
  const maxPages = Math.floor(total / pageSize);

  return (
    <nav className="buttons">
      <button onClick={onPrev} disabled={currentPage <= 0}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div>{endItem > 0 && `${startItem + 1}-${endItem}`}</div>
      <button onClick={onNext} disabled={currentPage >= maxPages}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </nav>
  );
}
