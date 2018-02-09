const shell = require('shelljs');
const yargs = require('yargs').argv
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.exec('git status');
shell.exec('git add .');
shell.exec(`git commit -m '${yargs.m}'`);
shell.exec('git push');
