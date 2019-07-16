import React, { Component } from 'react';
import { GifWrapper } from '../../components/posts/gifs/GifWrapper';

export default class TattooRemoval extends Component {
  render() {
    return (
      <div>
        <h5>
          <b>Lasers</b>. However, these are not the type that you saw in those classic James Bond movies, slowly
          advancing to the hero's groin. These are known as Q-switched lasers and are the most common way to remove
          tattoos. Before getting to the removal stage however, it is important to understand how tattoo's themselves
          remain in the body.
        </h5>
        <h5>
          Tattooing involves inserting ink into the dermal tissue layer of the skin (found under the epidermis - the
          outermost layer of the skin). Once the ink has entered, normally using a tattoo needle, the pigment begins to
          disperse itself through the epidermis and the upper dermis. Once it has entered these layers of the skin, the
          body sends out one of it's billions of personal protection operatives for foreign agents - <b>Phagocytes</b>.
        </h5>
        <GifWrapper>
          <iframe src='https://www.gfycat.com/ifr/essentialminiaturecuckoo'
                  title="Phagocyte"
                  width='640'
                  height='346' allowFullScreen/>
        </GifWrapper>
        <h5>
          The main function of Phagocytes within the human body is to protect from harmful particles, and are essential
          for shielding the human body from infections and to provide subsequent immunity. They are attracted to foreign
          particles by chemical signals released by the body. As seen above, when eventually coming into contact with
          their target, they bind, and then engulf them. Here-in lies the problem; the ink particles are too big to be
          ingested by the Phagocytes, so instead are held in place in the layers of skin by its Collagen network (the
          skins main structural protein).
        </h5>
        <h5>
          So now you may be beginning to get an <i>inkling</i> as to how tattoos can be removed. The aforementioned
          Q-switched lasers emit a centralised burst of light, targeting a specific spectrum of color represented in
          the tattoo (e.g. black, red, etc.). This means that for tattoos with differing colours, multiple lasers
          must be used. The laser is fired at these pigments, and as it hits, in nanoseconds they are heated up by
          thousands of degrees, eventually emitting the contained energy as a shockwave, in a process known
          as <b>Photothermolysis</b>. The shockwave ripples through the dermis of the skin, causing weaker structures
          to break apart, while larger, stronger ones, merely vibrate. Once the tattoo pigment has been broken up into
          smaller fragments, the Phagocytes can then fully engulf and dispose of them.
        </h5>
        <h5>
          The whole process can take 6-8 sessions of laser removal for a normal sized tattoo, and up to 10 sessions for
          larger tattoos, with a total cost from anywhere between £270 to £600 <a
          href="https://graziadaily.co.uk/life/real-life/10-things-need-know-laser-tattoo-removal/">[2]</a>.
        </h5>
        <h5>
          So, given the fact that over 1 in 4 individuals are reported as regretting ever getting a tattoo <a
          href="https://www.advdermatology.com/blog/statistics-surrounding-tattoo-regret">[1]</a>, there's hope on
          the horizon with this amazing technology. So your mate Dave with his 'sick' <b>NO RAGRETS</b> graffiti across
          his chest can still have some optimism.
        </h5>
      </div>
    );
  }
};