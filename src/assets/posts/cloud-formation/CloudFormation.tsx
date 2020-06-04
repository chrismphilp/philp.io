import React, { FunctionComponent } from 'react';
import PostContent from '../../../components/subject-page/PostContent';
import content from './CloudFormation.data';
import PostParagraph from '../../../components/subject-page/PostParagraph';

const CloudFormation: FunctionComponent = () => {
  return (
    <PostContent content={content}>
      <>
        <PostParagraph subTitle={'Let\'s rain in on some facts'}>
          Warning, there will be a <i>blizzard</i> of cloud related puns in this article.
        </PostParagraph>
        <PostParagraph subTitle={'So lets (rain)drop into the facts.'}>
          Clouds are made of up of water droplets and ice crystals, small and light
          enough to float in the air. However, how does this water vapour remain together? That is through something
          known as the <i>condensation nuclei</i>. This is a particle such as a piece of pollen or dust, which the water
          vapour condense onto. When billions of these particles collect together they form a visible cloud.
        </PostParagraph>
        <PostParagraph subTitle={'Moving on'}>
          Hopefully by this point you&apos;re on <i>cloud nine</i>, and most importantly, have vastly improved your
          knowledge of the billions of droplets that hang over you every day.
        </PostParagraph>
      </>
    </PostContent>
  );
};

export default CloudFormation;
