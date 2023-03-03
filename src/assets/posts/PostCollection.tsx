import { IPostCollection } from '../../model/PostCollection.model';
import TattooRemovalData from './tattoo-removal/TattooRemoval.data';
import InfiniteMadnessData from './infinite-madness/InfiniteMadness.data';
import TypeScript37Data from './typescript3.7/TypeScript3.7.data';
import OriginOfSayingsDataPt1 from './origin-of-sayings/part-one/OriginOfSayings.pt1.data';
import OriginOfSayingsDataPt2 from './origin-of-sayings/part-two/OriginOfSayings.pt2.data';
import HelicopterFlightData from './helicopter-flight/HelicopterFlight.data';

export const PostCollection: IPostCollection[] = [
  InfiniteMadnessData,
  TattooRemovalData,
  TypeScript37Data,
  OriginOfSayingsDataPt1,
  OriginOfSayingsDataPt2,
  HelicopterFlightData,
];
