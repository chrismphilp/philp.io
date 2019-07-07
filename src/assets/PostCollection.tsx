import React from 'react';
import TattooRemovalPost from './tattoo-removal/tattooRemoval.json';
import CloudFormationPost from './cloud-formation/cloudFormation.json';
import TattooRemoval from './tattoo-removal/TattooRemoval';
import CloudFormation from './cloud-formation/CloudFormation';

export interface IPostCollection {
  title: string;
  subTitle: string;
  author: string;
  type: string;
  date: string;
  widgetImage: string;
  widgetImageAlt: string;
  contentKey: string;
}

export const PostCollection: IPostCollection[] = [
  CloudFormationPost,
  TattooRemovalPost
];

const postReferences: Map<string, any> = new Map<string, any>();
postReferences.set('cloudFormation', <CloudFormation/>);
postReferences.set('tattooRemoval', <TattooRemoval/>);
export const PostReferences = postReferences;