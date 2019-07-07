import React from 'react';
import TattooRemovalPost from './tattoo-removal/tattooRemoval.json';
import TattooRemoval from './tattoo-removal/TattooRemoval';

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

export const PostCollection: [IPostCollection] = [
  TattooRemovalPost
];

const postReferences: Map<string, any> = new Map<string, any>();
postReferences.set('tattooRemoval', <TattooRemoval/>);
export const PostReferences = postReferences;