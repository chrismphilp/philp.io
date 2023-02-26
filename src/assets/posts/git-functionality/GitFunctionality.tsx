import React, { FunctionComponent } from 'react';
import content from './GitFunctionality.data';
import SubjectPage from '../../../../components/subject-page/SubjectPage';
import 'prismjs/components/prism-git.min';

const GitFunctionality: FunctionComponent = () => {
  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <h2>Introduction</h2>
      <p>
        Git as a version control system has usage across the world. But many developers still limit themselves, staying
        within mainstay commands. This article will investigate these litany of commands, and hopefully increase your
        understanding and productivity.
      </p>
      <h3>Merge</h3>
      <p>
        For example, take a common development team example. A team member has created a branch from <i>master</i>, and
        added new functionality to print their name when the application runs. While the developer has been doing this,
        the master branch has been advanced with 5 more features, leaving the new feature branch out-of-sync. A common
        practice is to therefore run <b>git merge</b>, creating a new single commit in the feature branch, which
        collects all of the commits made since the feature branch was diverged from master.
      </p>
      <p>
        This does have its pitfalls though. Given a large team where changes are consistently being pushed to the{' '}
        <b>master</b> branch, the feature branch will have a high number of merge commits polluting its history. This
        can be filtered away with an advanced git log, but without it, it may be confusing for other developers looking
        at your code to quickly understand where changes were made.
      </p>
      <h3>Rebase</h3>
      <p>
        Rebasing is the process of moving or combining a sequence of commits to a new base commit. Similar to merge,{' '}
        <i>rebase</i> can used to integrate changes from one branch, into another. However, unlike merge (which is a
        non-destructive operation), rebase is used to move the entire feature branch, to the tip of the master branch,
        incorporating all of the previous commits from the master branch. This removes the need for the unnecessary
        commits from a merge, leaving a linear project history.
      </p>
      <h3>Squashing Commits</h3>
      <p>
        There are times when you realise after you&apos;ve committed a new feature, you still need to make some changes.
        Commonly, a developer will make the change, and commit it to the branch, like so:
      </p>
      <pre>
        <code className={'language-git'}>
          {`$ git log
commit d84b3e1f899d48c49e8f513302293ff36d1b0421 (HEAD -> master)
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:46:45 2020 +0000

    [master] | Removing unused line

commit 6a4e34b35dd3d5cd6e3fe34df9e04b3f80be0b85
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:46:06 2020 +0000

    [master] | Furthering altering Git instruction

commit bd0a16d1ffbaba26aa2a3e3715eba19503b4c190
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:45:46 2020 +0000

    [master] | Altering Git instruction

commit 0db3d898d87770b47a85c56c61a46bc46343e30a
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:38:59 2020 +0000

    [master] | Adding initial Git article
`}
        </code>
      </pre>
      <p>
        This has needlessly increased the size of the git history, with lots of commits that add nothing. In this case
        it is preferable to combine commits <code className="language-git">d84b3e</code>,
        <code className="language-git">6a4e34b</code>, and <code className="language-git">bd0a16d</code>. A commit
        squash or fix can therefore be performed. This involves moving the commit/s into their parent node in the commit
        tree. A <b>squash</b> will aggregate the commit messages of the combined commits, whilst a <b>fix</b> will
        ignore them completely.
      </p>
      <p>
        As a side-note, rebasing does not actually alter the already made commits (as this is not possible in git
        through common commands), it creates new ones whilst removing any references to the old ones.
      </p>
      <pre>
        <code className={'language-git'}>
          {`$ git rebase -i 0db3d898d87770b47a85c56c61a46bc46343e30a
pick bd0a16d [master] | Altering Git instruction
f 6a4e34b [master] | Furthering altering Git instruction
f d84b3e1 [master] | Removing unused line

$ git log
commit dc08bbe95d71a0079f080d326376e2029f11ce3f (HEAD -> master)
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:45:46 2020 +0000

    [master] | Altering Git instruction

commit 0db3d898d87770b47a85c56c61a46bc46343e30a
Author: Christopher Philp <email>
Date:   Wed Dec 16 14:38:59 2020 +0000

    [master] | Adding initial Git article
`}
        </code>
      </pre>
      <p>
        Here we can see from the <i>git log</i> that <code className="language-git">d84b3e</code> and
        <code className="language-git">6a4e34b</code> have been now moved inside{' '}
        <code className="language-git">d84b3e</code>, inheriting its commit message due to the use of the <b>fix</b>{' '}
        keyword.
      </p>
      <h3>Reset</h3>
      <h3>Revert</h3>
      https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting
    </SubjectPage>
  );
};

export default GitFunctionality;
