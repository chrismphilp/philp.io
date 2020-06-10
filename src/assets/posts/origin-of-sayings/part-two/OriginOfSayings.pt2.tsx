import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../../components/subject-page/SubjectPage';
import content from './OriginOfSayings.pt2.data';

const OriginOfSayingsPt2: FunctionComponent = () => {
  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <p>The English language is full of nuanced sayings that are used everyday, whilst being rooted in history.</p>

      <h3>Nail Your Colours to the Mast</h3>

      <p>
        During nautical battles, the flag of a ship were struck (lowered) to surrender to the enemy – and was customary
        for the enemy to direct the cannon towards the ships mast during a battle to disable it. If all of the masts
        were hit, the captain usually had little choice but to <b>lay down arms</b>. However, if the captain decided to
        fight on, the crew were ordered to hoist the colours on remnants of the ships rigging, said to be ‘
        <b>nailing the colours to the mast</b>’.
      </p>

      <p>
        The expression is widely believed to have originated from the crew of the <b>Venerable</b>, the flagship of
        British Admiral Adam Duncan, at the <b>Battle of Camperdown</b>, in 1797. The mainmast of the ship was struck by
        the Dutch enemy and the ships flag was brought down by the blast of the cannon, which could be interpreted by
        the rest of the fleet as surrender. However, Jack Crawford, a sea-hand upon the ship, climbed the remains of the
        splintered mast and nailed the standard back in place. With its standard intact, the fleet continued and the
        British were eventually victorious, with the battle penned to be the ending of the Dutch dominance at sea and
        the beginning of ‘Britannia ruling the waves’.
      </p>

      <h3>Hair of the Dog</h3>

      <p>
        Anyone who’s woken up after a heavy night of drinking has probably heard this one. But its original etymology
        can be traced back as far as 2500BC in Northern Syria, from a book in which the God Ilu becomes hungover after a
        drinking binge, and the recipe in which he is prescribed consists or ‘<b>hairs of a dog</b>’ and an unknown
        plant mixed with olive oil. The belief seems to stem from a belief that being bitten by a rabid dog could be
        cured by ingesting a potion containing some of the dog’s fur. The phrase also exists in Hungarian, directly
        translated as ‘you may cure the dog’s bite with its fur’.
      </p>

      <h3>Steal Someone&apos;s Thunder</h3>

      <p>
        Surprisingly, this idiom comes from a real event in the early 18th century. The petulant playwright and critic
        John Dennis devised a thunder machine that could be used during one of his plays -consisting of a sheet of tin
        being rattled backstage. Unfortunately, the play was a disaster and flopped - yet a few days later he found it
        used at a performance of Macbeth upon which he had communicated his thunder machine to the managers. Upon the
        discovery he is quoted as saying ‘
        <b>that is my thunder by God; the villains will play my thunder, but not my plays</b>’.
      </p>

      <h3>Once in a Blue Moon</h3>

      <p>
        It is generally believe to mean something highly irregular or rare – originating from a clerical pamphlet
        printed in 1528, where one of the characters converses to another, ‘Yf they say the mone is blewe/We must
        believe that it is true’. It is likely in reference to the fact that priests at the time expected any statement
        they made to their parish to be believed, no matter how farcical.
      </p>

      <p>
        However, a blue moon is in fact possible. This occurred most notably after the eruption of Krakatoa in 1883,
        when the moon had a blue tinge for almost two years. This is due to the large ash particles in the atmosphere
        that were released after the eruption, diffract red light making the moon appear blue or slightly green.
        Particles of mixed sizes are far more common however, and these are more likely to diffract blue light, giving
        the moon a red tinge, especially when the moon is on the horizon and more particles are likely to interfere with
        the line of sight.
      </p>

      <h3>Give the Cold Shoulder</h3>

      <p>
        In everyday use, this often means to ignore or turn away from someone. Some etymologists believe it to have
        originated from medieval etiquette. After hosting a feast, to hint that the meal was over and it was time for
        the guests to leave, they would serve a cold slice of pork or beef shoulder. However, it is far more likely that
        it came from a Latin mistranslation of the word ‘umerus’ (meaning both back and shoulder) from the works of Sir
        Walter Scott – &ldquo;[her] dislike did na gang farther at first than just{' '}
        <b>shewing o&apos; the cauld shouther...</b>&rdquo;.
      </p>
    </SubjectPage>
  );
};

export default OriginOfSayingsPt2;
