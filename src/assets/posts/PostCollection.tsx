import TattooRemovalData from './tattoo-removal/TattooRemoval.data';
import CloudFormationData from './cloud-formation/CloudFormation.data';
import InfiniteMadnessData from './infinite-madness/InfiniteMadness.data';
import GoogleSearchData from './google-search/GoogleSearch.data';
import TypeScript37Data from './typescript3.7/TypeScript3.7.data';
import OriginOfSayingsDataPt1 from './origin-of-sayings/part-one/OriginOfSayings.pt1.data';
import OriginOfSayingsDataPt2 from './origin-of-sayings/part-two/OriginOfSayings.pt2.data';
import { IPostCollection } from '../../model/PostCollection.model';

export const PostCollection: IPostCollection[] = [
  CloudFormationData,
  InfiniteMadnessData,
  TattooRemovalData,
  GoogleSearchData,
  TypeScript37Data,
  OriginOfSayingsDataPt1,
  OriginOfSayingsDataPt2,
];
