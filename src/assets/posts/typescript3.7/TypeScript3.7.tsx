import React, { FunctionComponent, useEffect } from 'react';
import content from './TypeScript3.7.data';
import SubjectPage from '../../../components/subject-page/SubjectPage';
import Prism from 'prismjs';

const TypeScript37: FunctionComponent = () => {
  useEffect(() => Prism.highlightAll(), []);

  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <h2>Optional Chaining</h2>
      <h4>
        <code className="language-js">?.</code> Operator
      </h4>

      <p>
        Optional Chaining is a great new feature which allows expressions to only run until the point one of the
        accessed fields is equal to <code className="language-js">null</code> or{' '}
        <code className="language-js">undefined</code>. This is through the use of the{' '}
        <code className="language-js">?.</code> operator - <b>optional property access</b> - allowing anything expressed
        on the right of the question mark to continue executing, otherwise{' '}
        <code className="language-js">undefined</code> is returned. See the example below:
      </p>

      <pre>
        <code className="language-js">
          {`let y = null;
          
// x === undefined
let x = y?.z.execute();

// Identical to the above
let x = (y === null || y === undefined) ? undefined : y.z.execute();

let y = { 
  z: {
    execute: () => 5;
  }
}
// x === 5
x = y?.z.execute();`}
        </code>
      </pre>

      <p>
        Clearly the new optional chaining operator is is less verbose and more readable. Optional Chaining can also be
        used in two further areas – <b>optional element access</b> and <b>optional calls</b>.
      </p>

      <h4>Optional Element Access</h4>

      <p>
        The optional chaining operator can be used when accessing to non-identifier properties. For instance if
        accessing an index of an <b>array</b>:
      </p>

      <pre>
        <code className="language-js">
          {`// New operator usage
return arr?.[0];
// Previous
return (arr === null || arr === undefined) ? // undefined : // arr[0];
`}
        </code>
      </pre>

      <h4>Optional Calls</h4>

      <p>
        These allow us to conditionally call expressions if they’re not <code className="language-js">null</code> or{' '}
        <code className="language-js">undefined</code>.
      </p>

      <pre>
        <code className="language-js">
          {`let y = {
  z: {
    execute: undefined;
  }
}

// x === undefined
let x = y.z?.execute?.();

y.z = execute: () => 5;

// x === 5
x = y.z?.execute?.();

y.z = 5;

// This will still result in a type error
x = y.z?.execute?.();
`}
        </code>
      </pre>

      <br />
      <h2>Nullish Coalescing</h2>

      <p>
        Nullish coalescing requires the use of the <code className="language-js">??</code> operator and is used to fall
        back to a default value when similarly dealing with <code className="language-js">null</code> or{' '}
        <code className="language-js">undefined</code>.
      </p>
    </SubjectPage>
  );
};

export default TypeScript37;
