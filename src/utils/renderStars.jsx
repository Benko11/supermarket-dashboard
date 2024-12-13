import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

export default function renderStars(rating) {
  const fullStars = Array(rating)
    .fill(null)
    .map((_, index) => <FontAwesomeIcon key={index} icon={faStar} />);

  const emptyStars = Array(5 - rating)
    .fill(null)
    .map((_, index) => (
      <FontAwesomeIcon key={fullStars.length + index} icon={faStarOutline} />
    ));

  return [...fullStars, ...emptyStars];
}
