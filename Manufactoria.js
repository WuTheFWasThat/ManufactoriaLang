// based on Quincunx's Java implementation

const dirs = ['l', 'd', 'u', 'r'];
const mapbranch = [1, 3, 0, 2]; // d, r, l, u

function branch(branchdir, queueremove, matchl, matchr) {
  if (queueremove == matchr) {
    return mapbranch[branchdir];
  }
  if (queueremove == matchl) {
    return mapbranch[3 - branchdir];
  }
  return branchdir;
}

function manufactoria(program, input) {
  let x = -1, y = -1;
  for (let findy = 0; findy < program.length; findy++) {
    for (let findx = 0; findx < program[findy].length; findx++) {
      if (program[findy][findx] == '@') {
        if (x !== -1) { throw new Error('multiple @'); }
        x = findx + 1;
        y = findy;
      }
    }
  }
  if (x == -1 || y == -1) {
    throw new Error('Failed to find start @');
  }
  let queue = [];
  for (let c of input) {
    queue.push(c);
  }
  let lastdir = 0;

  while (true) {
    let p = ' ';
    let dir = 'n';
    let peek;
    let matchl = null, matchr = null, branchdir = null;
    p = program[y][x];
    if (x === 2 && y === 2) {
      console.log(queue.join(''))
    }
    // console.log('x', x, 'y', y, queue.join(''), p)
    if (p == null) {
      throw new Error('invalid');
    }
    switch (p) {
      case ' ':
      case '@':
        throw new Error('invalid');
      case ';':
        const answer = queue.join('');
        console.log('ANSWER: ', answer);
        return answer;
      case '>':
        dir = 'r';
        break;
      case '<':
        dir = 'l';
        break;
      case '^':
        dir = 'u';
        break;
      case 'v':
        dir = 'd';
        break;
      case '#':
        switch (lastdir) {
          case 0:
            x++;
            break;
          case 2:
            x--;
            break;
          case 1:
            y--;
            break;
          case 3:
            y++;
            break;
          default:
            throw new Error("Internal error: faulty bridge code");
        }
        break;
      case 'r':
        queue.push('r');
        dir = 'r';
        break;
      case 'c':
        queue.push('r');
        dir = 'u';
        break;
      case 'R':
        queue.push('r');
        dir = 'l';
        break;
      case 'C':
        queue.push('r');
        dir = 'd';
        break;
      case 'b':
        queue.push('b');
        dir = 'r';
        break;
      case 'd':
        queue.push('b');
        dir = 'u';
        break;
      case 'B':
        queue.push('b');
        dir = 'l';
        break;
      case 'D':
        queue.push('b');
        dir = 'd';
        break;
      case 'g':
        queue.push('g');
        dir = 'r';
        break;
      case 'q':
        queue.push('g');
        dir = 'u';
        break;
      case 'G':
        queue.push('g');
        dir = 'l';
        break;
      case 'Q':
        queue.push('g');
        dir = 'd';
        break;
      case 'y':
        queue.push('y');
        dir = 'r';
        break;
      case 't':
        queue.push('y');
        dir = 'u';
        break;
      case 'Y':
        queue.push('y');
        dir = 'l';
        break;
      case 'T':
        queue.push('y');
        dir = 'd';
        break;
      case 'U':
        matchl = 'y';
        matchr = 'g';
        branchdir = 0;
        break;
      case 'u':
        matchl = 'g';
        matchr = 'y';
        branchdir = 0;
        break;
      case 'H':
        matchl = 'r';
        matchr = 'b';
        branchdir = 0;
        break;
      case 'h':
        matchl = 'b';
        matchr = 'r';
        branchdir = 0;
        break;
      case 'I':
        matchl = 'y';
        matchr = 'g';
        branchdir = 1;
        break;
      case 'i':
        matchl = 'g';
        matchr = 'y';
        branchdir = 1;
        break;
      case 'J':
        matchl = 'r';
        matchr = 'b';
        branchdir = 1;
        break;
      case 'j':
        matchl = 'b';
        matchr = 'r';
        branchdir = 1;
        break;
      case 'O':
        matchl = 'y';
        matchr = 'g';
        branchdir = 2;
        break;
      case 'o':
        matchl = 'g';
        matchr = 'y';
        branchdir = 2;
        break;
      case 'K':
        matchl = 'r';
        matchr = 'b';
        branchdir = 2;
        break;
      case 'k':
        matchl = 'b';
        matchr = 'r';
        branchdir = 2;
        break;
      case 'P':
        matchl = 'y';
        matchr = 'g';
        branchdir = 3;
        break;
      case 'p':
        matchl = 'g';
        matchr = 'y';
        branchdir = 3;
        break;
      case 'L':
        matchl = 'r';
        matchr = 'b';
        branchdir = 3;
        break;
      case 'l':
        matchl = 'b';
        matchr = 'r';
        branchdir = 3;
        break;
      default:
        throw new Error("Invalid char in source code: " + p);
    }
    if (matchl !== null) {
      dir = dirs[branch(branchdir, queue[0], matchl, matchr)];
      peek = queue[0];
      if (peek == matchl || peek == matchr) {
        queue.shift();
      }
    }
    switch (dir) {
      case 'r':
        x++;
        lastdir = 0;
        break;
      case 'u':
        y--;
        lastdir = 1;
        break;
      case 'l':
        x--;
        lastdir = 2;
        break;
      case 'd':
        y++;
        lastdir = 3;
        break;
    }
  }
}

// Example:
// manufactoria(
//   [
//     '  @v   ',
//     ' v<jv  ',
//     'v#<I#v ',
//     'vv>>##;',
//     'vvdcvv ',
//     'v#o##v ',
//     'v##o#v ',
//     'v>KK<v ',
//     '>#II#< ',
//     ' ^#j^  ',
//     ' ^j#^  ',
//     '  TQ   ',
//     '  >;   ',
//   ],
//   'brb'
// );
