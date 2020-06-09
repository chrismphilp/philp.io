import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../../components/subject-page/SubjectPage';
import content from './OriginOfSayings.pt1.data';

const OriginOfSayingsPt1: FunctionComponent = () => {
  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <p>
        The English language is full of nuanced sayings that are used every day, whilst being rooted in history. Some
        you may even use yourself have some bizarre beginnings; so let’s investigate.
      </p>

      <h3>Baker’s Dozen</h3>

      <p>
        A baker’s dozen is commonly understood to mean 13. If we travel back to Medieval England we get a greater
        understanding as to its origins. Common law dictated at the time that the price of bread was related to the cost
        of the wheat used in its production. Any baker found to be selling overpriced loaves was subject to punishment,
        including large fines and flogging. Thus, to account for anomalies in the baking process, bakers would bake an
        extra loaf to ensure they were free from prosecution.
      </p>

      <h3>Shambles</h3>

      <p>
        A shambles nowadays commonly references a situation or state of total disorder, and its origins are similarly
        grimy. Butchers in the 16-17th century would display and sell their goods on a table or stall in the street,
        which was known as a <b>shamble</b>. This led to the collective noun representing the street where butchers
        operated being known as the <b>shambles</b> (this street name survives in many towns to this day). However, as
        butchers would throw offal into the streets where they worked, the meaning began to be associated with being a
        place of
        <b>untidiness or disorganisation</b>.
      </p>

      <h3>Humble Pie</h3>

      <p>
        In the 14th century the <b>numbles</b> was the name given to the less appetizing parts (heart, liver, entrails,
        etc. – what we now know as offal) of an animal – and by the 15th century this had migrated to <b>umbles</b>. The{' '}
        <b>umbles</b> were commonly used as a primary ingredient in pies given their relatively low cost at the time, so
        were often eaten by the lower classes, whilst the upper classes would take the more valued cuts. The adjective{' '}
        <b>humble</b> was derived separately, meaning of lower class or low estimation of one’s importance. The
        similarity in the two words likely led to its current idiomatic meaning –{' '}
        <b>make a humble apology and accept humiliation</b>.
      </p>

      <h3>Goodbye</h3>

      <p>
        This is relatively simple one, but interesting nonetheless. In the 15th century a common farewell was ‘God be
        with thee’. Over 300 years this eventually got compounded; ‘God be with yee’ in the 16th century; ‘God b'wee’ in
        the 17th century; and eventually ‘Goodbye’ in the late 17th century.
      </p>

      <h3>Beyond the Pale</h3>

      <p>
        What we know today as pale (light in colour) is far different from its now obsolete early English meaning – a
        stake or pointed piece of wood, also known as a fencepost. In turn the Pale began to be associated with the area
        enclosed by these pale posts, such as a settlement. Therefore, anyone wanting to go outside of these safe areas
        were said to be going ‘beyond the Pale’ – to go outside agreed standard of decency.
      </p>
    </SubjectPage>
  );
};

export default OriginOfSayingsPt1;
