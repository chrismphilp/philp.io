import 'prismjs/components/prism-cmake.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-cpp.min';

const CPPPointers = () => {
  return (
    <>
      <h2>Introduction</h2>

      <p>
        C and C++ unlike a lot of other languages provide the ability to directly interact with hardware memory -
        normally described as a middle-level or &apos;systems&apos; language - through the use of
        <b>pointers</b>. Every variable declared in any language has a memory location, and every memory location has an
        address used to locate it - C++ gives you the power to directly modify this memory.
      </p>

      <h3>Accessing Memory</h3>

      <p>
        In C++, the <b>memory address</b> (where a value lives) of a variable can be accessed through the{' '}
        <code className={'language-cpp'}>&</code> operator - see the example below.
      </p>

      <pre>
        <code className={'language-cpp'}>
          {`std::string food = "Pizza";
cout << food;  // Outputs the value of food (Pizza)
cout << &food; // Outputs the memory address of food (0x6dfed4)
`}
        </code>
      </pre>

      <h3>Pointers</h3>

      <p>
        A pointer on the other hand, is a variable that <b>stores the memory address of a variable as its value</b>, and
        is created using the <code className={'language-cpp'}>*</code> operator. A pointer can exist for{' '}
        <b>any data type</b>, as it merely points to a memory address of the variable.
      </p>

      <pre>
        <code className={'language-cpp'}>
          {`int x = 5;
int* y = &x; 
// Equivalent to
int *y = &x;

cout << x;  // Outputs the value of x (5)
cout << y; // Outputs the memory address of x (0x6dfed4)
cout << &y; // Outputs the memory address of y (0x6ffd4)
cout << *y; // Outputs the value of x (5)
`}
        </code>
      </pre>

      <h3>
        Arrow Operator <code className={'language-cpp'}>-&gt;</code>
      </h3>

      <p>
        The arrow operator is a <b>shorthand method for accessing the contents of a</b>{' '}
        <code className={'language-cpp'}>struct</code> <b>or</b> <code className={'language-cpp'}>class</code>{' '}
        <b>pointer</b> - normally the <code className={'language-cpp'}>.</code> operator would be used for non-pointer
        access. The example below shows the equivalences.
      </p>

      <pre>
        <code className={'language-cpp'}>
          {`class Rectangle {
int width, height;
public:
  void set_values (int,int);
  int area (void);
} rect;

Rectangle* p_rect = &rect; // Creates a pointer to the rect declared above
p_rect->area;
// This is equivalent to
(*p_rect).area;
`}
        </code>
      </pre>

      <h3>References and Pointers</h3>

      <p>
        By default, arguments to a function in C++ are passed by value, and the changes made to any arguments inside the
        function will not affect the original value, and instead are made to a copy. The 3 main ways - including pass by
        value - to pass arguments to a function are shown below.
        <h4>
          Call by <b>value</b>:
        </h4>
        <pre>
          <code className={'language-cpp'}>
            {`int square1(int n) 
{ 
  cout << &n; // Outputs the memory address of n (0x6dfed4)
  n *= n; 
  // Original n is unchanged - a copy of n has been created, 
  // only the n inside the function is altered
  return n; 
} 
`}
          </code>
        </pre>
        <h4>
          Call by <b>reference with a pointer argument</b>:
        </h4>
        <pre>
          <code className={'language-cpp'}>
            {`int x = 5;
int *p_x = &x;
square(p_x);
  
void square(int *n) 
{ 
  cout << n; // Outputs the memory address of n, which is the same as x (0x6dfed4) 
  *n *= *n; // Deferences to get the value at the memory address of p_x, 
            // updating the value stored there
  cout << *n; // Outputs the squared value of x (25) 
  cout << x; // Outputs the altered value of x (25) 
} 
`}
          </code>
        </pre>
        <h4>
          Call by <b>reference with reference argument</b>:
        </h4>
        <pre>
          <code className={'language-cpp'}>
            {`int x = 5;
square(x);
            
void square(int &n) 
{ 
  // Inside the function, the reference is used to access the 
  // actual argument used in the call
  cout << &n; // Outputs the memory address of x (0x6dfed4) 
  cout << n; // Outputs the value of x (5) 
    
  // Implicit de-referencing (without '*') 
  n *= n; 
  cout << n; // Outputs the altered value of n, which is equal to x (25) 
  cout << nx; // Outputs the altered value of x (25) 
} 
`}
          </code>
        </pre>
      </p>

      <h3>Benefits of Pointers</h3>

      <p>
        There are a number of benefits to using pointers:
        <ol>
          <li>
            Values that are passed in to a function <b>do not have to be copied</b>, especially useful with large
            objects.
          </li>
          <li>
            They allow <b>more than one value to be returned from a function</b>.
          </li>

          <pre>
            <code className={'language-cpp'}>
              {`int x = 5;
int y = 55;
int *p_x, *p_y = &x;
edit_two(*x, *y);
  
void edit_two(int *x, int *y) 
{ 
  *x += 5;
  *y += 5;
  
  cout << *x; // Edit's the value at the memory address of x (10) 
  cout << y*; // Edit's the value at the memory address of x (60) 
} 
`}
            </code>
          </pre>

          <li>
            Memory access through pointers is stated to be <b>more efficient than through an array</b>.
          </li>
        </ol>
      </p>

      <br />
      <p>
        Hopefully this has cleared up any confusion surrounding pointers and you can begin to understand those
        insufferable <code className={'language-cpp'}>nullptr</code> exceptions.
      </p>
    </>
  );
};

export default CPPPointers;
