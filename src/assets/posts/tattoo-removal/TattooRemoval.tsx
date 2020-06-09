import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../components/subject-page/SubjectPage';
import content from './TattooRemoval.data';

const TattooRemoval: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <p>
        <b>Lasers</b>. However, these are not the type that you saw in those classic James Bond movies, slowly advancing
        to the hero&apos;s groin. These are known as <b>Q-switched lasers</b> and are the most common way to remove
        tattoos. Before getting to the removal stage however, it is important to understand how tattoo&apos;s themselves
        remain in the body.
      </p>
      <p>
        Tattooing involves inserting ink into the dermal tissue layer of the skin (found under the epidermis – the
        outermost layer of the skin). Once the ink has entered - normally using a tattoo needle - the pigment begins to
        disperse itself through the epidermis and the upper dermis. Once it has entered these layers of the skin, the
        body sends out some of its billions of personal protection operatives for foreign agents – <b>Phagocytes</b>.
      </p>
      <p>
        The main function of <b>Phagocytes</b> within the human body is to protect from harmful particles, and are
        essential for shielding the human body from infections and providing subsequent immunity. They are attracted to
        foreign particles by chemical signals released by bacteria or other <b>Phagocytes</b>, and when eventually
        coming into contact with their target, they bind, and then engulf them. Here-in lies the problem; the ink
        particles are too big to be ingested by the Phagocytes, so instead are held in stasis in the layers of skin by
        its <b>collagen</b> network (the skins main structural protein).
      </p>
      <p>
        So now you may be beginning to get an inkling as to how tattoos can be removed. The aforementioned{' '}
        <b>Q-switched lasers</b> emit a centralised burst of light, targeting a specific spectrum of colour represented
        in the tattoo. This means that for tattoos with differing colours, multiple lasers must be used. The laser is
        fired at these pigments, and as it hits, in nanoseconds they are heated up by thousands of degrees, eventually
        emitting the contained energy as a shockwave, in a process known as <b>Photothermolysis</b>. The shockwave
        ripples through the dermis of the skin, causing weaker structures to break apart – such as the ink particles -
        while larger, stronger ones, merely vibrate. Once the tattoo pigment has been broken up into smaller fragments,
        the Phagocytes can then fully engulf and dispose of them. The whole process can take 6-8 sessions of laser
        removal for a normal sized tattoo, and up to 10 sessions for larger tattoos.
      </p>
      <p>
        So, given the fact that over 1 in 4 individuals are reported as regretting ever getting a tattoo, there’s hope
        on the horizon with this amazing technology. So your mate Dave with his ‘<i>NO RAGRETS</i>’ motif across his
        chest can still have some optimism.
      </p>
    </SubjectPage>
  );
};

export default TattooRemoval;
