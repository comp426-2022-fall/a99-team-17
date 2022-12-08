## Endpoint documentation
All endpoints log an interaction that goes into the logs database. Each interaction contains the username, the date and time, and the type of interaction.

### app.get('/')
<li> Directs user to main page

### app.get('/index')
<li> Directs user to main page
<li> Adds home accessed to logs

### app.get('/login')
<li> Directs user to login page

### app.post('/login')
<li> Adds login attempt to logs
<li> Checks to see whether username already exists in user database. If it does, then it redirects to app.get('/index'). If it does not, then it redirects to app.get('/bad_login')

### app.get('/acc_info')
<li> Adds viewed account info to logs
<li> Allows users to see which accounts they're logged into

### app.get('/delete_acc')
<li> Removes specified username from user database

### app.get('/users_db')
<li> Hidden endpoint
<li> Displays all users that have registered an account

### app.get('/logs_db')
<li> Hidden endpoint
<li> Displays all interactions user has had

### app.post('/newacc')
<li> Adds to user database the new username and password
<li> After completion, redirects to account made page

### app.post('/logout')
<li> Returns user to login page