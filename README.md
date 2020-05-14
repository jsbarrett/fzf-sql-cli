# Fuzzy SQL CLI
(Most of what makes this interesting is the amazing work put into the fzf project)

This project is meant to serve as a simple way for me
to query out data from my local database.
Currently it basically acts as an export of entire tables,
but allows you to only select the columns you care about.

This project is not meant to do everything,
but merely cover my 90% use cases for opening up MySQL Workbench.

More than anything, I hope it can inspire others to come up with their own
scripts to improve their development workflow that utilize amazing tools like
fzf and NodeJS.

## Dependencies
- fzf
This uses the tool fzf in order to quickly select different options.
And this project mostly started as a proof of concept for how fzf could be used
to create elegant command line user interfaces
for my own personal scripts/environment.
To install fzf go here: https://github.com/junegunn/fzf

- NodeJS
This also uses NodeJS which can be found here:
https://nodejs.org/en/download/

## Installation
You download/clone this repository, install the node_modules,
and optionally add the shell-scripts to your shell's PATH.

Example:
```
git clone https://github.com/jsbarrett/fzf-sql-cli.git ~/.fzf-sql-cli
cd ~/.fzf-sql-cli
touch .env
npm install
```

Then add to PATH to your shell's rc file.
(If you do not know what shell you are using then
it is probably bash and you should use the first example below)
```
echo "export PATH=\"\$PATH:\$HOME/.fzf-sql-cli/shell-scripts\" >> ~/.bashrc"
```
Or
```
echo "export PATH=\"\$PATH:\$HOME/.fzf-sql-cli/shell-scripts\" >> ~/.zshrc"
```

Afterwards you will need to either restart your terminal emulator
or you can source your rc file. Example `source ~/.bashrc`.
This will get your PATH updated after you changed the rc file.

The only thing left to do is to add your database information
into the .env file we created earlier.
Or you can just add them to the settings.js file directly.
I use the .env file so I can add it to my .gitignore so my database credentials
are not being stored in the repo history.

Add something like the following in your .env file:
```
FZF_SQL_CLI_DB_HOST=127.0.0.1
FZF_SQL_CLI_DB_USER=root
FZF_SQL_CLI_DB_PASSWORD=root
FZF_SQL_CLI_DB_DATABASE=my_awesome_database
```
Obviously replacing the values with whatever applies to your environment.

## Using
- sql-select
- sql-procedure
- sql-results
- sql

### sql-select
This allows you to quickly select a table first,
then it will ask you for what columns you want.
You can select multiple (using tab in fzf),
or you can select none by hitting ctrl-c.
Selecting none will do a SELECT * from the table.

### sql-procedure
Because my work uses stored procedures a lot
I often need to look at the definition to remind myself what is going on.
This will list out the procedures and once you select one,
it will spit out the definition to stdout.

### sql-results
So after running either of the two commands above,
the results will be automatically saved in a file in this directory.
So if you run this command, you can print out the results that are already
saved/cached on your system, so you don't have to keep hitting your database.
This is helpful if you want to do some further processing on the results.

### sql
This is currently acting as a shortcut for the most recently used command.
It currently only listens for `sql-select` or `sql-procedure` and will re-run
whichever you last used. So if you mostly only ever use `sql-select`,
then you can get away with just typing `sql` most of the time.

## In progress
I have a few more ideas to implement in order to get this
to serve my most common use-cases.
One being a `sql-builder` which will help you quickly create more complex
select statements (doing joins), as well as creating insert and delete
statements.
Instead of running immediately, I intend to have it open your $EDITOR
(example: vim) like git does when you do a commit and let you
look over and make any changes necessary.
Once it is saved and quit then it will execute your SQL.
