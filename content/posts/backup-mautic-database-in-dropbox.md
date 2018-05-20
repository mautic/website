![backup](https://www.mautic.org/wp-content/uploads/2017/09/cloudBackupDropbox-1024x576.jpg)

*We're excited to continue sharing content developed by the Mautic community. This solution and post was developed and written by Joan Nin (Slack: @ninjoan).*

Are you looking for ways to make a backup of your Mautic instance fast, easy and automatic? This tutorial will give you the ability to backup your Mautic database to your Dropbox account.

You will need the following:


2. Dropbox account
4. Backup script
6. Cron job
8. Basic knowledge of the command line (PC) or terminal (Mac)




### Step 1: Dropbox Account


Sign-in or create a brand new account with Dropbox then go to [https://www.dropbox.com/developers/apps](https://www.dropbox.com/developers/apps) on your web browser, and create a new Dropbox app. Fill in the information of the new app as shown below, and enter the app name use a name that will be easy to you to remember in case you have more apps.

![](https://www.mautic.org/wp-content/uploads/2017/09/UGC-Post-Backups-2-1024x959.jpg)


After you have created a new app, you will redirect to new windows and you will see a button with the text Generated access token click and copy the access token.

![](https://www.mautic.org/wp-content/uploads/2017/09/UGC-Post-Backups-3-1003x1024.jpg)



### Step 2: Backup Script


The script we going to use is made by [Andrea Fabrizi](https://github.com/andreafabrizi/Dropbox-Uploader) kudos to this guy. To use Dropbox backup script, [download](https://github.com/andreafabrizi/Dropbox-Uploader) the script and make it executable.


```
wget https://raw.github.com/andreafabrizi/Dropbox-Uploader/master/dropbox_uploader.sh
chmod +x dropbox_uploader.sh
```


Then run the following command;

```
./dropbox_uploder.sh
```


Next it will ask you to insert the generated access token. Insert the provided token and confirm. To verify that you have established the connection with Dropbox, run the following command;


```
./dropbox_uploder.sh info
```


Doing so should display your Dropbox Information;


```
Dropbox Uploader v1.0
> Getting info... 
Name:		Joan Nin
UID:		dbid:XXXXXXXXXXXXXXXXXXXXXXX
Email:		your-email
Country:	DO
```


Now let's create a shell script that will make the import of our database.

Create a new directory db-backup and a .sh file.


```
cd
mkdir db-backup
nano  dbdump.sh
```


And copy and paste this info to the dbdump.sh file you create.


```
#!/bin/bash
sudo mysqldump -uMYSQLUSER -pMYSQLDATABASE-PASSWORD DATABASENAME > 
/root/db-backup/mautic.sql
## THIS LINE UPLOADS THE MAUTIC.SQL FILE TO THE DROPBOX DIRECTORY BACKUP-Mautic
./dropbox_uploader.sh upload /root/db-backup/mautic.sql /BACKUP-Mautic
## Removed THIS WILL REMOVE THE MAUTIC.SQL FROM YOUR SERVER
rm -r /root/db-backup/mautic.sql
#END
```


**NOTE:** Replace the italics text with your information.
*MYSQLUSER* = sql user
*MYSQLDATABASE-PASSWORD* = SQL Password
*DATABASENAME* = the name of the database you use in Mautic


### Step 3: Cron Job


Now create a cron job that will automate this task for you. Using the crontab from your server create the following line;


```
### MAUTIC BACKUP
27 3 */15 * * echo "`date -u` `/root/db-backup/dbdump.sh`" >> /root/db-backup/status.log 2>&1
```


This line will run the backup “At 03:27 on every 15th day-of-month.” you can replace the with the time you prefer. Also this will create a log file with the date that the cron job will run. I think this is a pretty neat option for backup/audit.

And that's it. A simple, yet effective way to backup your Mautic instance.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

We want to thank our community for offering insight into how they work with Mautic. Do you have a different process for backing up your Mautic instance? Comment below and let us know!

Also, if you're interested, here's a quick tutorial video on using CPanel to add a cron job.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jw8940xZxPM?rel=0" frameborder="0" allowfullscreen></iframe>