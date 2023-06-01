import { StaticImageData } from "next/image";

import Rocket from "../../public/rocket.png";
import Blueprint from "../../public/blueprint.png";
import Compass from "../../public/compass.png";
import Lighthouse from "../../public/lighthouse.png";
import Dartboard from "../../public/dartboard.png";
import Telescope from "../../public/telescope.png";

export interface ProjectInfo {
  id: number;
  name: string;
  project_cover_image: string | null;
  description: string;
  project_lead: OrganizationUser;
}

export const parseProjectCoverImage = (
  cover_image: string | null
): StaticImageData => {
  switch (cover_image) {
    case "Rocket":
      return Rocket;
    case "Blueprint":
      return Blueprint;
    case "Compass":
      return Compass;
    case "Lighthouse":
      return Lighthouse;
    case "Dartboard":
      return Dartboard;
    case "Telescope":
      return Telescope;
    default:
      return Rocket;
  }
};
