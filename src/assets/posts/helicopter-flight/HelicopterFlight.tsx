import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../../components/subject-page/SubjectPage';
import content from './HelicopterFlight.data';

const HelicopterFlight: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <p>
        So how do you effortlessly lift a 15 tonne object vertically? Unlike an aeroplane, a helicopter does not need to
        reach great speed to ascend (speed of the rotor actually provides no difference to the altitude of a
        helicopter), instead lifting through a process known as the <b>Bernoulli Principle</b>. This principle outlines
        how the speed and the pressure in air are inversely proportional; when pressure goes up, speed goes down, and
        vice versa. Helicopter wings are designed specifically to exploit this knowledge – curved on top, and flat on
        the bottom – allowing the helicopter to gain lift. As long as this lift force is greater than the weight of the
        helicopter, the helicopter will begin to rise.
      </p>

      <p>
        However, a helicopter cannot only have a single rotor, as <b>Newton’s third law of motion</b> comes into play,
        stating that any force on an object in a direction receives an equal acting force in the opposite direction.
        This means that as a rotor spins whilst a helicopter is in flight, the entire body of the craft below slowly
        spins in the opposite direction. This <b>torque</b> (turning force) would, understandably, make any helicopter
        incredibly difficult to control if left unmanaged, so as a counteraction, a counter-torque is introduced. This
        can take the shape of a second rotor spinning in the opposite direction as seen in a behemoth Chinook, or on
        more common helicopters, a <b>tail rotor</b>.
      </p>

      <p>
        We now have a stationary spinning container – not much use to anyone. So how do we begin to move in a specific
        direction? This is through the control of the <b>collective</b> and <b>cyclic</b> pitch. The{' '}
        <b>collective pitch</b> decreases or increases the angle at which all the rotor blades are travelling, whilst
        the <b>cyclic pitch</b> is used to change the pitch angle or tilt of the blades, ensuring the blades pass
        through the same point in the cycle. This is all controlled through a pivotal part of the helicopter controls –
        the <b>swash plate</b> - each blade connected through short vertical rods called <b>pitch links</b>.
      </p>

      <p>
        A phenomenon comes in to play when helicopters want to move in a direction – <b>gyroscopic procession</b>. This
        occurs when a spinning object or gyroscope has a force applied to it, the maximum force is manifested{' '}
        <b>90 degrees after</b>
        (not exactly 90 in rotor blades due to external aerodynamic forces). This is accomplished in helicopter controls
        by a component known as a <b>pitch horn</b>, which is offset by 90 degrees, ensuring that input to the cyclic
        and collective controls occur 90 degrees prior when they should take effect. For further learning, a great video
        on this topic can be viewed <a href={'https://www.youtube.com/watch?v=n5bKzBZ7XuM'}>here</a>.
      </p>

      <p>
        Amazingly, helicopters don’t even need power once up in the air to land safely, and instead can land use a
        technique known as <b>autorotation</b>. Whereas in normal helicopter motion, air is drawn in from above and
        exhausted downward, the mere action of air travelling through the rotor blades whilst a helicopter is falling,
        at the correct collective pitch allows the rotor blades to spin at sufficient speed. As there is also almost no
        torque produced during autorotation, the tail rotor isn’t necessary either. The longest autorotation in history
        was performed by Jean Boulet in 1972 after he reached an altitude of <b>12,440m</b>, where, due to a large
        temperature drop, the engine flamed out and could not be restarted.
      </p>
    </SubjectPage>
  );
};

export default HelicopterFlight;
