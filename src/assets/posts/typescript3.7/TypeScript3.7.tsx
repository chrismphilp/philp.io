import 'prismjs/components/prism-javascript.min';

const TypeScript37 = () => {
  return (
    <>
      <h2>Optional Chaining</h2>
      <h4>
        <code className="language-javascript">?.</code> Operator
      </h4>

      <p>
        Optional Chaining is a great new feature which allows expressions to only run until the point one of the
        accessed fields is equal to <code className="language-javascript">null</code> or{' '}
        <code className="language-javascript">undefined</code>. This is through the use of the{' '}
        <code className="language-javascript">?.</code> operator - <b>optional property access</b> - allowing anything
        expressed on the right of the question mark to continue executing, otherwise{' '}
        <code className="language-javascript">undefined</code> is returned. See the example below:
      </p>

      <pre>
        <code className="language-javascript">
          {`let y = null;
          
// x === undefined
let x = y?.z.execute();

// Identical to the above
x = (y === null || y === undefined) ? undefined : y.z.execute();

y = { 
  z: {
    execute: () => 5
  }
}
// x === 5
x = y?.z.execute();
`}
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
        <code className="language-javascript">
          {`// New operator usage
return arr?.[0];
// Previous approach
return (arr === null || arr === undefined) ? undefined : arr[0];
`}
        </code>
      </pre>

      <h4>Optional Calls</h4>

      <p>
        These allow us to conditionally call expressions if they’re not{' '}
        <code className="language-javascript">null</code> or <code className="language-javascript">undefined</code>.
      </p>

      <pre>
        <code className="language-javascript">
          {`let y = {
  z: {
    execute: undefined
  }
}

// x === undefined
let x = y.z?.execute?.();

y.z.execute = () => 5;

// x === 5
x = y.z?.execute?.();

y.z.execute = 5;

// This will still result in a type error
x = y.z?.execute?.();
`}
        </code>
      </pre>

      <br />
      <h2>Nullish Coalescing</h2>

      <p>
        Nullish coalescing requires the use of the <code className="language-javascript">??</code> operator and is used
        to fall back to a default value when similarly dealing with <code className="language-javascript">null</code> or{' '}
        <code className="language-javascript">undefined</code>. The operator states that the value on the left of{' '}
        <code className="language-javascript">??</code> will be used if not equal to{' '}
        <code className="language-javascript">null</code> or <code className="language-javascript">undefined</code>,
        else use the expression to the right. See the example below:
      </p>

      <pre>
        <code className="language-javascript">
          {`let y = null,
z = 5;
  
// x === z === 5
let x = y ?? z; 

y = 55;

// x === y === 55
x = y ?? z;
`}
        </code>
      </pre>

      <p>
        The <code className="language-javascript">??</code> operator can replace uses of{' '}
        <code className="language-javascript">||</code> when trying to use a default value, which gives better behaviour
        for falsy values.
      </p>

      <pre>
        <code className="language-javascript">
          {`// ?? is better than using || as it avoids falsy behaviours
let x = 0;

// total === x === 0.5 -> unlikely to be intended
let total = x || 0.5;

// total === x === 0 
total = x ?? 0.5;
`}
        </code>
      </pre>

      <br />
      <h2>Combining the two operators</h2>

      <p>
        Finally, the two operators can be combined to set a default value when{' '}
        <code className="language-javascript">null</code> or <code className="language-javascript">undefined</code> are
        encountered.
      </p>

      <pre>
        <code className="language-javascript">
          {`let person = {
  name: 'Chris',
  details: undefined
}, 
x = 5;

// personsAge === x === 5;
let personsAge = person.details?.age ?? x;
`}
        </code>
      </pre>

      <p>
        <i>Hopefully</i> you&apos;ve learnt something new, or if not confirmed your understanding of operators that you
        use in your daily development.
      </p>
    </>
  );
};

export default TypeScript37;
