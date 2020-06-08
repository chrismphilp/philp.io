import TattooRemovalData from './tattoo-removal/TattooRemoval.data';
import CloudFormationData from './cloud-formation/CloudFormation.data';
import InfiniteMadnessData from './infinite-madness/InfiniteMadness.data';
import GoogleSearchData from './google-search/GoogleSearch.data';
import TypeScript37Data from './typescript3.7/TypeScript3.7.data';
import { IPostCollection } from '../../model/PostCollection.model';

export const PostCollection: IPostCollection[] = [
  CloudFormationData,
  InfiniteMadnessData,
  TattooRemovalData,
  GoogleSearchData,
  TypeScript37Data,
];
